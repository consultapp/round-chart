import { TUIContext } from "@/types";
import { createContext } from "react";

export const initialUIContextState = {
  circleIndex: null,
  dotIndex: null,
};

const UIContext = createContext<TUIContext>({
  selected: initialUIContextState,
});

export default UIContext;
