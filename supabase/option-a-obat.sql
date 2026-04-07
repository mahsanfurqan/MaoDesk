-- Option A (MVP): single flat table for obat
-- Run this in Supabase SQL Editor.

create table if not exists public.obat (
  kode text primary key,
  nama text not null,
  kategori text,
  stok numeric,
  satuan_beli text,
  harga_beli numeric,
  stok_min numeric,
  satuan_1 text,
  satuan_2 text,
  satuan_3 text,
  satuan_4 text,
  isi_1 numeric,
  isi_2 numeric,
  isi_3 numeric,
  isi_4 numeric,
  harga_jual_1 numeric,
  harga_jual_2 numeric,
  harga_jual_3 numeric,
  harga_jual_4 numeric,
  harga_resep_1 numeric,
  harga_resep_2 numeric,
  harga_resep_3 numeric,
  harga_resep_4 numeric,
  laba_otomatis numeric,
  suplier text,
  pabrik text,
  expired date,
  indikasi text,
  komposisi text,
  lokasi text,
  no_batch text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_obat_nama on public.obat (nama);
create index if not exists idx_obat_kategori on public.obat (kategori);
create index if not exists idx_obat_expired on public.obat (expired);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_obat_updated_at on public.obat;
create trigger trg_obat_updated_at
before update on public.obat
for each row execute procedure public.set_updated_at();

-- RLS (minimum for MVP). Tighten later if needed.
alter table public.obat enable row level security;

drop policy if exists "obat_select_anon" on public.obat;
create policy "obat_select_anon"
on public.obat
for select
to anon
using (true);
