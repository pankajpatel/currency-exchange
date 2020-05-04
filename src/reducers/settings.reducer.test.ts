import { settingsReducer } from "./settings.reducer";

const state = {
  base: "ABC",
  poll: 10 * 1000,
  currencies: ["ABC", "DEF", "GHI", "XYZ"],
  balances: {
    ABC: 5,
    DEF: 10,
    GHI: 15,
    XYZ: 20,
  } as Record<string, number>,
  transactions: [],
};

describe("Settings Reducer", () => {
  test("default", () => {
    const value = settingsReducer(state, {
      type: "UNKNOWN",
    });
    expect(JSON.stringify(value)).toMatch(JSON.stringify(state));
  });

  test("SETTINGS_UPDATED", () => {
    const value = settingsReducer(state, {
      type: "SETTINGS_UPDATED",
      payload: {
        base: "GHI",
        poll: 5 * 1000,
      },
    });
    expect(value.base).toBe("GHI");
    expect(value.poll).toBe(5000);
  });

  test("EXCHANGE_INITIATED - within allowed Balances", () => {
    const value = settingsReducer(state, {
      type: "EXCHANGE_INITIATED",
      payload: {
        from: { currency: "ABC", amount: 1 },
        to: { currency: "DEF", amount: 1 },
        rate: 1,
      },
    });
    expect(value?.transactions?.length).toBe(1);
    expect(value.balances["ABC"]).toBe(4);
    expect(value.balances["DEF"]).toBe(11);

    const newValue = settingsReducer(value, {
      type: "EXCHANGE_INITIATED",
      payload: {
        from: { currency: "ABC", amount: 4 },
        to: { currency: "DEF", amount: 4 },
        rate: 1,
      },
    });
    expect(newValue?.transactions?.length).toBe(2);
    expect(newValue.balances["ABC"]).toBe(0);
    expect(newValue.balances["DEF"]).toBe(15);
  });

  test("EXCHANGE_INITIATED - outside allowed Balances", () => {
    const value = settingsReducer(state, {
      type: "EXCHANGE_INITIATED",
      payload: {
        from: { currency: "ABC", amount: 10 },
        to: { currency: "DEF", amount: 10 },
        rate: 1,
      },
    });
    expect(value?.transactions?.length).toBe(state.transactions.length);
    expect(value.balances["ABC"]).toBe(state.balances["ABC"]);
    expect(value.balances["DEF"]).toBe(state.balances["DEF"]);
  });

  test("EXCHANGE_INITIATED - invalid or 0 amount", () => {
    [
      {
        from: { currency: "ABC", amount: 0 },
        to: { currency: "DEF", amount: 0 },
        rate: 1,
      },
      {
        from: { currency: "ABC" },
        to: { currency: "DEF", amount: 0 },
        rate: 1,
      },
    ].forEach((payload) => {
      const newValue = settingsReducer(state, {
        type: "EXCHANGE_INITIATED",
        payload,
      });
      expect(newValue?.transactions?.length).toBe(state.transactions.length);
      expect(newValue.balances[payload.from.currency]).toBe(
        state.balances[payload.from.currency]
      );
      expect(newValue.balances[payload.to.currency]).toBe(
        state.balances[payload.to.currency]
      );
    });
  });
});
