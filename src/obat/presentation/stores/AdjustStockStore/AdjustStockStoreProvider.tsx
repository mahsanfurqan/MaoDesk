import { PropsWithChildren } from "react";
import { obatModuleContainer } from "src/obat/ObatModule";
import { AdjustStockStore } from "./AdjustStockStore";
import { AdjustStockStoreContext } from "./AdjustStockStoreContext";

export const AdjustStockStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <AdjustStockStoreContext.Provider
      value={obatModuleContainer.get(AdjustStockStore)}
    >
      {children}
    </AdjustStockStoreContext.Provider>
  );
};
