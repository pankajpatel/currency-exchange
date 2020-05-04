import { ratesReducer } from "./rates.reducer";

const state = {
  currency: "ABC",
  loading: false,
  rates: {},
};

describe("Rates Reducer", () => {
  test("default", () => {
    const value = ratesReducer(state, {
      type: "UNKNOWN",
    });
    expect(JSON.stringify(value)).toMatch(JSON.stringify(state));
  });

  test("RATES_LOADING", () => {
    const value = ratesReducer(state, { type: "RATES_LOADING" });
    expect(value.loading).toBe(true);
  });

  test("RATES_RECEIVED", () => {
    const rates = { GHI: 2, DEF: 3, XYZ: 4 };
    const value = ratesReducer(state, {
      type: "RATES_RECEIVED",
      payload: { rates },
    });
    expect(value.loading).toBe(false);
    expect(JSON.stringify(value.rates)).toBe(JSON.stringify(rates));
  });

  test("BASE_CURRENCY_CHANGED", () => {
    const currency = "GHI";
    const value = ratesReducer(state, {
      type: "BASE_CURRENCY_CHANGED",
      payload: { currency },
    });
    expect(value.currency).toBe(currency);
  });
});
