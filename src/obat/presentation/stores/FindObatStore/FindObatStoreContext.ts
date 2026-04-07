import { createContext } from "react";
import { FindObatStore } from "./FindObatStore";

export const FindObatStoreContext = createContext<FindObatStore | null>(null);

FindObatStoreContext.displayName = "FindObatStoreContext";
