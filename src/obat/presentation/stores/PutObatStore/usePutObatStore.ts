import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { PutObatStore } from "./PutObatStore";
import { PutObatStoreContext } from "./PutObatStoreContext";

export const usePutObatStore = (): PutObatStore => {
  const store = useContextStore(PutObatStoreContext);

  return store;
};
