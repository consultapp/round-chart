import React, { useCallback, useReducer } from "react";
import UIContext from "./index";
import { UIContextReducer } from "./reducer";

export const initialUIContextState = {
  circleIndex: null,
  dotIndex: null,
};

export default function UIContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [selected, dispatch] = useReducer(
    UIContextReducer,
    initialUIContextState
  );

  const setSelected = useCallback(
    (circleIndex: number, dotIndex: number) =>
      dispatch({ type: "set", data: { circleIndex, dotIndex } }),
    [dispatch]
  );

  const clearSelected = useCallback(
    () => dispatch({ type: "clear" }),
    [dispatch]
  );

  return (
    <UIContext.Provider value={{ selected, setSelected, clearSelected }}>
      {children}
    </UIContext.Provider>
  );
}
