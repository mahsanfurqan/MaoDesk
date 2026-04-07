import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";

export default interface GetStockMutationsResponse {
  results: StockMutationEntity[];
  count: number;
}
