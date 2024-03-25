import { TUIContext } from "@/types";
import { createContext } from "react";

const UIContext = createContext<TUIContext | null>(null);

export default UIContext;
