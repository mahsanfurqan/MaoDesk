import { StockMutationType } from "src/obat/domain/entities/StockMutationEntity";

export default interface AdjustStockPayload {
  kode: string;
  tipe: StockMutationType;
  jumlah: number;
  catatan?: string | null;
}
