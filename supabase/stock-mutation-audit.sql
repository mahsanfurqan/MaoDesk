-- Option A extension: stock mutation + audit trail
-- Run this after `option-a-obat.sql` in Supabase SQL Editor.

-- Ensure `public.obat.kode` is safe to be referenced by a foreign key.
do $$
begin
  if exists (
    select 1
    from public.obat
    where kode is null or btrim(kode) = ''
  ) then
    raise exception 'Kolom public.obat.kode masih ada NULL/kosong. Rapikan dulu data kode sebelum menjalankan migration mutasi stok.';
  end if;

  if exists (
    select 1
    from public.obat
    group by kode
    having count(*) > 1
  ) then
    raise exception 'Terdapat duplikat nilai public.obat.kode. Hapus/rapikan duplikat dulu, lalu jalankan ulang migration mutasi stok.';
  end if;

  if not exists (
    select 1
    from pg_constraint c
      join pg_class t
        on t.oid = c.conrelid
      join pg_attribute a
        on a.attrelid = t.oid and a.attnum = any(c.conkey)
    where t.relnamespace = 'public'::regnamespace
      and t.relname = 'obat'
      and c.contype in ('p', 'u')
      and a.attname = 'kode'
  ) then
    alter table public.obat
      alter column kode set not null;

    alter table public.obat
      add constraint obat_kode_unique unique (kode);
  end if;
end;
$$;

create table if not exists public.mutasi_stok (
  id bigint generated always as identity primary key,
  obat_kode text not null references public.obat (kode) on delete cascade,
  tipe text not null check (tipe in ('masuk', 'keluar', 'koreksi')),
  jumlah numeric not null,
  stok_sebelum numeric not null,
  stok_sesudah numeric not null,
  catatan text,
  created_at timestamptz not null default now()
);

create index if not exists idx_mutasi_stok_obat_kode_created_at
  on public.mutasi_stok (obat_kode, created_at desc);

alter table public.mutasi_stok enable row level security;

drop policy if exists "mutasi_stok_select_anon" on public.mutasi_stok;
create policy "mutasi_stok_select_anon"
on public.mutasi_stok
for select
to anon
using (true);

create or replace function public.adjust_obat_stock(
  p_kode text,
  p_tipe text,
  p_jumlah numeric,
  p_catatan text default null
)
returns setof public.mutasi_stok
language plpgsql
security definer
set search_path = public
as $$
declare
  v_obat public.obat%rowtype;
  v_stok_sebelum numeric;
  v_stok_sesudah numeric;
  v_jumlah_mutasi numeric;
  v_inserted public.mutasi_stok%rowtype;
begin
  if p_kode is null or btrim(p_kode) = '' then
    raise exception 'Kode obat wajib diisi';
  end if;

  if p_tipe is null or btrim(p_tipe) = '' then
    raise exception 'Tipe mutasi wajib diisi';
  end if;

  if p_jumlah is null then
    raise exception 'Jumlah mutasi wajib diisi';
  end if;

  p_tipe := lower(btrim(p_tipe));

  if p_tipe not in ('masuk', 'keluar', 'koreksi') then
    raise exception 'Tipe mutasi tidak valid: %', p_tipe;
  end if;

  if p_tipe in ('masuk', 'keluar') and p_jumlah <= 0 then
    raise exception 'Jumlah untuk mutasi masuk/keluar harus lebih dari 0';
  end if;

  if p_tipe = 'koreksi' and p_jumlah < 0 then
    raise exception 'Stok akhir untuk koreksi tidak boleh negatif';
  end if;

  select *
  into v_obat
  from public.obat
  where kode = p_kode
  for update;

  if not found then
    raise exception 'Obat dengan kode % tidak ditemukan', p_kode;
  end if;

  v_stok_sebelum := coalesce(v_obat.stok, 0);

  if p_tipe = 'masuk' then
    v_jumlah_mutasi := p_jumlah;
    v_stok_sesudah := v_stok_sebelum + p_jumlah;
  elsif p_tipe = 'keluar' then
    if p_jumlah > v_stok_sebelum then
      raise exception 'Stok tidak mencukupi. Stok saat ini: %', v_stok_sebelum;
    end if;

    v_jumlah_mutasi := p_jumlah * -1;
    v_stok_sesudah := v_stok_sebelum - p_jumlah;
  else
    v_stok_sesudah := p_jumlah;
    v_jumlah_mutasi := p_jumlah - v_stok_sebelum;
  end if;

  update public.obat
  set stok = v_stok_sesudah
  where kode = p_kode;

  insert into public.mutasi_stok (
    obat_kode,
    tipe,
    jumlah,
    stok_sebelum,
    stok_sesudah,
    catatan
  )
  values (
    p_kode,
    p_tipe,
    v_jumlah_mutasi,
    v_stok_sebelum,
    v_stok_sesudah,
    nullif(btrim(coalesce(p_catatan, '')), '')
  )
  returning * into v_inserted;

  return next v_inserted;
end;
$$;

grant execute on function public.adjust_obat_stock(text, text, numeric, text)
to anon, authenticated;

-- Refresh PostgREST schema cache so new table/function are immediately visible.
notify pgrst, 'reload schema';
