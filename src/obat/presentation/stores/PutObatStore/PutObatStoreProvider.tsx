import { PropsWithChildren } from "react";
import { obatModuleContainer } from "src/obat/ObatModule";
import { PutObatStore } from "./PutObatStore";
import { PutObatStoreContext } from "./PutObatStoreContext";

export const PutObatStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <PutObatStoreContext.Provider value={obatModuleContainer.get(PutObatStore)}>
      {children}
    </PutObatStoreContext.Provider>
  );
};
