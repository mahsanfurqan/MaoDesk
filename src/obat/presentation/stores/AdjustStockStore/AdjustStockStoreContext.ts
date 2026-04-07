import { createContext } from "react";
import { AdjustStockStore } from "./AdjustStockStore";

export const AdjustStockStoreContext = createContext<AdjustStockStore | null>(null);

AdjustStockStoreContext.displayName = "AdjustStockStoreContext";
