import { PropsWithChildren } from "react";
import { obatModuleContainer } from "src/obat/ObatModule";
import { GetStockMutationsStore } from "./GetStockMutationsStore";
import { GetStockMutationsStoreContext } from "./GetStockMutationsStoreContext";

export const GetStockMutationsStoreProvider = ({
  children,
}: PropsWithChildren) => {
  return (
    <GetStockMutationsStoreContext.Provider
      value={obatModuleContainer.get(GetStockMutationsStore)}
    >
      {children}
    </GetStockMutationsStoreContext.Provider>
  );
};
