import { Expose } from "class-transformer";
import ResponseDto from "src/core/infrastructure/models/ResponseDto";
import ObatEntity from "src/obat/domain/entities/ObatEntity";

class ObatDto extends ResponseDto<ObatEntity> {
  @Expose()
  kode!: string;

  @Expose()
  nama!: string;

  @Expose()
  kategori!: string | null;

  @Expose()
  stok!: number | string | null;

  @Expose()
  satuan_beli!: string | null;

  @Expose()
  harga_beli!: number | string | null;

  @Expose()
  stok_min!: number | string | null;

  @Expose()
  satuan_1!: string | null;

  @Expose()
  satuan_2!: string | null;

  @Expose()
  satuan_3!: string | null;

  @Expose()
  satuan_4!: string | null;

  @Expose()
  isi_1!: number | string | null;

  @Expose()
  isi_2!: number | string | null;

  @Expose()
  isi_3!: number | string | null;

  @Expose()
  isi_4!: number | string | null;

  @Expose()
  harga_jual_1!: number | string | null;

  @Expose()
  harga_jual_2!: number | string | null;

  @Expose()
  harga_jual_3!: number | string | null;

  @Expose()
  harga_jual_4!: number | string | null;

  @Expose()
  harga_resep_1!: number | string | null;

  @Expose()
  harga_resep_2!: number | string | null;

  @Expose()
  harga_resep_3!: number | string | null;

  @Expose()
  harga_resep_4!: number | string | null;

  @Expose()
  laba_otomatis!: number | string | null;

  @Expose()
  suplier!: string | null;

  @Expose()
  pabrik!: string | null;

  @Expose()
  expired!: string | null;

  @Expose()
  indikasi!: string | null;

  @Expose()
  komposisi!: string | null;

  @Expose()
  lokasi!: string | null;

  @Expose()
  no_batch!: string | null;

  private parseNumber(
    value: number | string | null | undefined,
    fallback: number | null = null
  ) {
    if (value === null || value === undefined || value === "") {
      return fallback;
    }

    const parsed = Number(value);

    return Number.isNaN(parsed) ? fallback : parsed;
  }

  toDomain() {
    return {
      kode: this.kode,
      nama: this.nama,
      kategori: this.kategori,
      stok: this.parseNumber(this.stok, 0) ?? 0,
      satuanBeli: this.satuan_beli,
      hargaBeli: this.parseNumber(this.harga_beli),
      stokMin: this.parseNumber(this.stok_min),
      satuan1: this.satuan_1,
      satuan2: this.satuan_2,
      satuan3: this.satuan_3,
      satuan4: this.satuan_4,
      isi1: this.parseNumber(this.isi_1),
      isi2: this.parseNumber(this.isi_2),
      isi3: this.parseNumber(this.isi_3),
      isi4: this.parseNumber(this.isi_4),
      hargaJual1: this.parseNumber(this.harga_jual_1),
      hargaJual2: this.parseNumber(this.harga_jual_2),
      hargaJual3: this.parseNumber(this.harga_jual_3),
      hargaJual4: this.parseNumber(this.harga_jual_4),
      hargaResep1: this.parseNumber(this.harga_resep_1),
      hargaResep2: this.parseNumber(this.harga_resep_2),
      hargaResep3: this.parseNumber(this.harga_resep_3),
      hargaResep4: this.parseNumber(this.harga_resep_4),
      labaOtomatis: this.parseNumber(this.laba_otomatis),
      suplier: this.suplier,
      pabrik: this.pabrik,
      expired: this.expired,
      indikasi: this.indikasi,
      komposisi: this.komposisi,
      lokasi: this.lokasi,
      noBatch: this.no_batch,
    };
  }
}

export default ObatDto;