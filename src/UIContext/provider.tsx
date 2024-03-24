import React, { useReducer } from "react";
import { IUIContext } from "@/types";
import UIContext from "./index";

const initialState = {
  circle: null,
  index: null,
};

function reducer(
  state: IUIContext,
  action: { type: string; data: IUIContext }
): IUIContext {
  const { type, data } = action;
  switch (type) {
    case "set":
      return data;

    case "clear":
      return initialState;

    default:
      return state;
  }
}

export default function UIContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [selected, dispatch] = useReducer(reducer, initialState);

  return (
    <UIContext.Provider value={{ selected, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}
