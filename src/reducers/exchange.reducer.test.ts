import { initialState, exchangeReducer } from "./exchange.reducer";

const state = {
  ...initialState,
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
    expect(reducedState).toBeTruthy();
  });

  test("BASE_CURRENCY_UPDATED", () => {
    const action = {
      type: "BASE_CURRENCY_UPDATED",
      payload: { value: "DEF" },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState).toBeTruthy();
  });

  test("SECONDARY_CURRENCY_UPDATED", () => {
    const action = {
      type: "SECONDARY_CURRENCY_UPDATED",
      payload: { value: "DEF" },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState).toBeTruthy();
  });

  test("BASE_AMOUNT_UPDATED", () => {
    const action = {
      type: "BASE_AMOUNT_UPDATED",
      payload: { value: 123 },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState).toBeTruthy();
  });

  test("SECONDARY_AMOUNT_UPDATED", () => {
    const action = {
      type: "SECONDARY_AMOUNT_UPDATED",
      payload: { value: 456 },
    };
    const reducedState = exchangeReducer(state, action);
    expect(reducedState).toBeTruthy();
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
