import { createContext } from "react";
import { DeleteObatStore } from "./DeleteObatStore";

export const DeleteObatStoreContext = createContext<DeleteObatStore | null>(null);

DeleteObatStoreContext.displayName = "DeleteObatStoreContext";
