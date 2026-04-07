import { PropsWithChildren } from "react";
import { GetObatStore } from "./GetObatStore";
import { GetObatStoreContext } from "./GetObatStoreContext";
import { obatModuleContainer } from "src/obat/ObatModule";

export const GetObatStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <GetObatStoreContext.Provider value={obatModuleContainer.get(GetObatStore)}>
      {children}
    </GetObatStoreContext.Provider>
  );
};
