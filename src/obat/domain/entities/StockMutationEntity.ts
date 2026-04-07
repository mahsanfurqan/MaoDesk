export type StockMutationType = "masuk" | "keluar" | "koreksi";

export default interface StockMutationEntity {
  id: number;
  obatKode: string;
  tipe: StockMutationType;
  jumlah: number;
  stokSebelum: number;
  stokSesudah: number;
  catatan: string | null;
  createdAt: string;
}
