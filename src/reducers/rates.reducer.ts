import { RatesState, Action, Reducer } from "../types";

export const initialState: RatesState = {
  currency: "EUR",
  loading: false,
  rates: {},
};

export const ratesReducer: Reducer<RatesState, Action> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "RATES_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "RATES_RECEIVED":
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case "BASE_CURRENCY_CHANGED":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
