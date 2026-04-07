import { createContext } from "react";
import { GetStockMutationsStore } from "./GetStockMutationsStore";

export const GetStockMutationsStoreContext =
  createContext<GetStockMutationsStore | null>(null);

GetStockMutationsStoreContext.displayName = "GetStockMutationsStoreContext";
