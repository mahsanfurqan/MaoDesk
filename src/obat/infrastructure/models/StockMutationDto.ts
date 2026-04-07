import { Expose } from "class-transformer";
import ResponseDto from "src/core/infrastructure/models/ResponseDto";
import StockMutationEntity, {
  StockMutationType,
} from "src/obat/domain/entities/StockMutationEntity";

class StockMutationDto extends ResponseDto<StockMutationEntity> {
  @Expose()
  id!: number | string;

  @Expose()
  obat_kode!: string;

  @Expose()
  tipe!: string;

  @Expose()
  jumlah!: number | string;

  @Expose()
  stok_sebelum!: number | string;

  @Expose()
  stok_sesudah!: number | string;

  @Expose()
  catatan!: string | null;

  @Expose()
  created_at!: string;

  private parseNumber(value: number | string, fallback = 0) {
    const parsed = Number(value);

    return Number.isNaN(parsed) ? fallback : parsed;
  }

  private parseType(value: string): StockMutationType {
    const normalized = value.toLowerCase();

    if (normalized === "masuk" || normalized === "keluar" || normalized === "koreksi") {
      return normalized;
    }

    return "masuk";
  }

  toDomain() {
    return {
      id: this.parseNumber(this.id),
      obatKode: this.obat_kode,
      tipe: this.parseType(this.tipe),
      jumlah: this.parseNumber(this.jumlah),
      stokSebelum: this.parseNumber(this.stok_sebelum),
      stokSesudah: this.parseNumber(this.stok_sesudah),
      catatan: this.catatan,
      createdAt: this.created_at,
    };
  }
}

export default StockMutationDto;
