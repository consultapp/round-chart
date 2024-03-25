import { ISelected } from "@/types";
import { initialUIContextState } from "./provider";

export function UIContextReducer(
  state: ISelected,
  action: { type: string; data?: ISelected }
): ISelected {
  const { type, data = initialUIContextState } = action;
  switch (type) {
    case "set":
      return data;

    case "clear":
      return initialUIContextState;

    default:
      return state;
  }
}
