import { createContext } from "react";
import { PutObatStore } from "./PutObatStore";

export const PutObatStoreContext = createContext<PutObatStore | null>(null);

PutObatStoreContext.displayName = "PutObatStoreContext";
