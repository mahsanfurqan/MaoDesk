import { PropsWithChildren } from "react";
import { FindObatStoreContext } from "./FindObatStoreContext";
import { FindObatStore } from "./FindObatStore";
import { obatModuleContainer } from "src/obat/ObatModule";

export const FindObatStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <FindObatStoreContext.Provider
      value={obatModuleContainer.get(FindObatStore)}
    >
      {children}
    </FindObatStoreContext.Provider>
  );
};
