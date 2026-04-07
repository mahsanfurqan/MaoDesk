import AdjustStockPayload from "src/obat/application/types/AdjustStockPayload";
import StockMutationEntity from "src/obat/domain/entities/StockMutationEntity";
import SubmitStoreState from "./SubmitStoreState";

export default interface AdjustStockStoreState extends SubmitStoreState {
  adjustStock: (payload: AdjustStockPayload) => Promise<StockMutationEntity>;
}
