import { ExchangeState, Action, Reducer } from "../types";

export const initialState: Record<string, ExchangeState | null | number> = {
  from: {
    amount: null,
    currency: "EUR",
  },
  to: {
    amount: null,
    currency: "GBP",
  },
  rate: null,
};

export const exchangeReducer: Reducer<Record<string, any>, Action> = (
  state = initialState,
  action
) => {
  const { type, payload = {} } = action;
  const value = payload.value;
  const rate = state.rate || 0;
  switch (type) {
    case "EXCHANGE_SWITCHED":
      return {
        ...state,
        from: state.to,
        to: state.from,
      };
    case "BASE_CURRENCY_UPDATED":
      return {
        ...state,
        to:
          state.to.currency === value
            ? {
                amount: state.to.amount,
                currency: state.from.currency,
              }
            : state.to,
        from: {
          ...state.from,
          currency: value,
        },
      };
    case "SECONDARY_CURRENCY_UPDATED":
      return {
        ...state,
        from:
          state.from.currency === value
            ? {
                amount: state.from.amount,
                currency: state.to.currency,
              }
            : state.from,
        to: {
          ...state.to,
          currency: value,
        },
      };
    case "BASE_AMOUNT_UPDATED":
      return {
        ...state,
        from: {
          ...state.from,
          amount: isNaN(value) ? 0 : value,
        },
        to: {
          ...state.to,
          amount: rate ? value * rate : state.to.amount,
        },
      };
    case "SECONDARY_AMOUNT_UPDATED":
      return {
        ...state,
        to: {
          ...state.to,
          amount: isNaN(value) ? 0 : value,
        },
        from: {
          ...state.from,
          amount: rate ? value / rate : state.from.amount,
        },
      };
    case "RATES_UPDATED":
      return {
        ...state,
        rate: payload.rates[state.to.currency] || rate,
      };
    default:
      return state;
  }
};
