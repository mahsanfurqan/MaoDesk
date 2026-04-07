import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { PostObatStore } from "./PostObatStore";
import { PostObatStoreContext } from "./PostObatStoreContext";

export const usePostObatStore = (): PostObatStore => {
  const store = useContextStore(PostObatStoreContext);

  return store;
};
