import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { DeleteObatStore } from "./DeleteObatStore";
import { DeleteObatStoreContext } from "./DeleteObatStoreContext";

export const useDeleteObatStore = (): DeleteObatStore => {
  const store = useContextStore(DeleteObatStoreContext);

  return store;
};
