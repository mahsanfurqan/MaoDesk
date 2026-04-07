import { PropsWithChildren } from "react";
import { obatModuleContainer } from "src/obat/ObatModule";
import { DeleteObatStore } from "./DeleteObatStore";
import { DeleteObatStoreContext } from "./DeleteObatStoreContext";

export const DeleteObatStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <DeleteObatStoreContext.Provider
      value={obatModuleContainer.get(DeleteObatStore)}
    >
      {children}
    </DeleteObatStoreContext.Provider>
  );
};
