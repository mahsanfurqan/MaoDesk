import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { GetObatStore } from "./GetObatStore";
import { GetObatStoreContext } from "./GetObatStoreContext";

export const useGetObatStore = (): GetObatStore => {
  const store = useContextStore(GetObatStoreContext);

  return store;
};
