import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { AdjustStockStore } from "./AdjustStockStore";
import { AdjustStockStoreContext } from "./AdjustStockStoreContext";

export const useAdjustStockStore = (): AdjustStockStore => {
  const store = useContextStore(AdjustStockStoreContext);

  return store;
};
