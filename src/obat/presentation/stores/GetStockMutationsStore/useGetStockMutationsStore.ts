import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { GetStockMutationsStore } from "./GetStockMutationsStore";
import { GetStockMutationsStoreContext } from "./GetStockMutationsStoreContext";

export const useGetStockMutationsStore = (): GetStockMutationsStore => {
  const store = useContextStore(GetStockMutationsStoreContext);

  return store;
};
