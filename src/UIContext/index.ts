import { IUIContext } from "@/types";
import { Dispatch, createContext } from "react";

const UIContext = createContext<{
  selected: IUIContext;
  dispatch: Dispatch<{ type: string; data: IUIContext }>;
} | null>(null);

export default UIContext;
