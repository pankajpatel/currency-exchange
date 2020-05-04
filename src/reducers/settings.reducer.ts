import { Reducer, Settings, Action, ExchangeParams } from "../types";

export const initialState: Settings = {
  base: "EUR",
  poll: 10 * 1000,
  currencies: ["EUR", "GBP", "USD"],
  balances: {
    EUR: 100,
    GBP: 0,
    USD: 0,
  },
  transactions: [],
};

export const settingsReducer: Reducer<Settings, Action> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  const { balances, transactions = [] } = state;
  switch (type) {
    case "SETTINGS_UPDATED":
      return {
        ...state,
        ...payload,
      };
    case "EXCHANGE_INITIATED":
      if (!payload?.from.amount || payload?.from.amount <= 0) {
        return state;
      }
      if (!payload?.from.currency || !payload?.to.currency) {
        return state;
      }
      const fromBalance = balances[payload?.from.currency];
      if (fromBalance < payload?.from.amount) {
        return state;
      }
      const toBalance = balances[payload?.to.currency];
      const fromAmount = payload?.from.amount;
      const toAmount = payload?.to.amount;
      const updates = {
        balances: {
          [payload?.from.currency]: fromBalance - fromAmount,
          [payload?.to.currency]: toBalance + toAmount,
        },
        transactions: [
          {
            ...(payload as ExchangeParams),
            timestamp: Number(new Date()),
          },
          ...transactions,
        ],
      };
      return { ...state, ...updates };
    default:
      return state;
  }
};
