import { createContext } from "react";
import { GetObatStore } from "./GetObatStore";

export const GetObatStoreContext = createContext<GetObatStore | null>(null);

GetObatStoreContext.displayName = "GetObatStoreContext";
