import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { FindObatStore } from "./FindObatStore";
import { FindObatStoreContext } from "./FindObatStoreContext";

export const useFindObatStore = (): FindObatStore => {
  const store = useContextStore(FindObatStoreContext);

  return store;
};
