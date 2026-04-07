import { createContext } from "react";
import { PostObatStore } from "./PostObatStore";

export const PostObatStoreContext = createContext<PostObatStore | null>(null);

PostObatStoreContext.displayName = "PostObatStoreContext";
