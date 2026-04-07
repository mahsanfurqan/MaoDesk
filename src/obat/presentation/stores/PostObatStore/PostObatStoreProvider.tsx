import { PropsWithChildren } from "react";
import { obatModuleContainer } from "src/obat/ObatModule";
import { PostObatStore } from "./PostObatStore";
import { PostObatStoreContext } from "./PostObatStoreContext";

export const PostObatStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <PostObatStoreContext.Provider value={obatModuleContainer.get(PostObatStore)}>
      {children}
    </PostObatStoreContext.Provider>
  );
};
