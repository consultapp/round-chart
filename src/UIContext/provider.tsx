import React, { useCallback, useReducer } from "react";
import UIContext, { initialUIContextState } from "./index";
import { UIContextReducer } from "./reducer";

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
