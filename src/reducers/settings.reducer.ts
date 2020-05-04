import { Reducer, Settings, Action } from "../types";

export const initialState: Settings = {
  base: "EUR",
  poll: 10 * 1000,
};

export const settingsReducer: Reducer<Settings, Action> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "SETTINGS_UPDATED":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
