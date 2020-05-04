import { exchangeReducer } from "./exchange.reducer";

const state = {
  from: {
    currency: "ABC",
    amount: 3,
  },
  to: {
    currency: "XYZ",
    amount: 5,
  },
  rate: 1.5,
};

describe("ExchangeReduce", () => {
  test("default", () => {
    const value = exchangeReducer(state, {
      type: "UNKNOWN",
    });
    expect(JSON.stringify(value)).toMatch(JSON.stringify(state));
  });

  test("EXCHANGE_SWITCHED", () => {
    const action = {
      type: "EXCHANGE_SWITCHED",
      payload: {},
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState.from.currency).toBe(state.to.currency);
    expect(reducedState.to.currency).toBe(state.from.currency);

    expect(reducedState.from.amount).toBe(state.to.amount);
    expect(reducedState.to.amount).toBe(state.from.amount);
  });

  test("BASE_CURRENCY_UPDATED", () => {
    const action = {
      type: "BASE_CURRENCY_UPDATED",
      payload: { value: "GHI" },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState.from.currency).toBe("GHI");
  });

  test("SECONDARY_CURRENCY_UPDATED", () => {
    const action = {
      type: "SECONDARY_CURRENCY_UPDATED",
      payload: { value: "DEF" },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState.to.currency).toBe("DEF");
  });

  test("BASE_AMOUNT_UPDATED", () => {
    const action = {
      type: "BASE_AMOUNT_UPDATED",
      payload: { value: 123 },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState.from.amount).toBe(123);
  });

  test("SECONDARY_AMOUNT_UPDATED", () => {
    const action = {
      type: "SECONDARY_AMOUNT_UPDATED",
      payload: { value: 456 },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState.to.amount).toBe(456);
  });

  test("RATES_UPDATED", () => {
    const action = {
      type: "RATES_UPDATED",
      payload: { rates: { ABC: 1 } },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState).toBeTruthy();
  });
});
