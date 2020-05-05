import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ExchangeForm } from "./ExchangeForm";
import RatesContext from "../../Contexts/Rates";
import SettingsContext from "../../Contexts/Settings";

const CURRENCY_MAP = {
  ABC: "α",
  BCD: "β",
  GBP: "£",
};

const mockRatesContext = {
  rates: {
    ABC: 1,
    BCD: 2,
    GBP: 4,
  },
  loading: false,
  currency: "ABC",
  updateBaseCurrency: jest.fn(),
};
const mockSettingsContext = {
  settings: {
    base: "ABC",
    poll: 10 * 1000,
    currencies: ["ABC", "BCD", "GBP"],
    balances: {
      ABC: 5,
      BCD: 10,
      GBP: 20,
    },
    transactions: [],
  },
  updateSettings: jest.fn(),
  exchangeAmount: jest.fn(),
};
const mockHistoryPush = jest.fn();
const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  history.push = mockHistoryPush;
  return render(
    <Router history={history}>
      <RatesContext.Provider value={mockRatesContext}>
        <SettingsContext.Provider value={mockSettingsContext}>
          {Component}
        </SettingsContext.Provider>
      </RatesContext.Provider>
    </Router>
  );
};

describe("ExchangeForm", () => {
  test("renders", () => {
    const { getByTestId } = renderWithRouter(
      <ExchangeForm currencies={CURRENCY_MAP} />
    );
    expect(getByTestId("exchange-form")).toBeInTheDocument();
  });

  test("form validation works", () => {
    const { getByTestId, queryAllByTestId, queryByText } = renderWithRouter(
      <ExchangeForm currencies={CURRENCY_MAP} />
    );
    expect(getByTestId("separator")).toBeInTheDocument();
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();

    let value = 10;
    act(() => {
      fireEvent.change(queryAllByTestId("amount-input")[0], {
        target: { value },
      });
    });

    expect(queryAllByTestId("amount-input")[0].value).toBe(value.toString());
    expect(queryAllByTestId("amount-input")[1].value).toBe("40");
    expect(queryByText(/Insufficient/i)).toBeInTheDocument();

    value = 2;
    act(() => {
      fireEvent.change(queryAllByTestId("amount-input")[0], {
        target: { value },
      });
    });

    expect(queryAllByTestId("amount-input")[0].value).toBe(value.toString());
    expect(queryAllByTestId("amount-input")[1].value).toBe("8");
    expect(queryByText(/Insufficient/i)).not.toBeInTheDocument();
  });

  test("switch currency", () => {
    const { getByTestId, queryAllByTestId, queryByText } = renderWithRouter(
      <ExchangeForm currencies={CURRENCY_MAP} />
    );
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();

    const value = 2;
    act(() => {
      fireEvent.change(queryAllByTestId("amount-input")[0], {
        target: { value },
      });
    });

    expect(queryAllByTestId("amount-input")[0].value).toBe(value.toString());
    expect(queryAllByTestId("amount-input")[1].value).toBe("8");

    expect(queryAllByTestId("currency-select")[0].value).toBe("ABC");
    expect(queryAllByTestId("currency-select")[1].value).toBe("GBP");

    expect(queryByText(/Insufficient/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(getByTestId("separator-switch-button"));
    });

    expect(queryAllByTestId("currency-select")[0].value).toBe("GBP");
    expect(queryAllByTestId("currency-select")[1].value).toBe("ABC");

    expect(queryAllByTestId("amount-input")[0].value).toBe("8");
    expect(queryAllByTestId("amount-input")[1].value).toBe(value.toString());
  });

  test("switch currency for same currency selection on both Exchange Pockets", () => {
    const { getByTestId, queryAllByTestId, queryByText } = renderWithRouter(
      <ExchangeForm currencies={CURRENCY_MAP} />
    );
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();

    const value = 2;
    act(() => {
      fireEvent.change(queryAllByTestId("amount-input")[0], {
        target: { value },
      });
    });

    expect(queryAllByTestId("amount-input")[0].value).toBe(value.toString());
    expect(queryAllByTestId("amount-input")[1].value).toBe("8");

    expect(queryAllByTestId("currency-select")[0].value).toBe("ABC");
    expect(queryAllByTestId("currency-select")[1].value).toBe("GBP");

    expect(queryByText(/Insufficient/i)).not.toBeInTheDocument();

    act(() => {
      fireEvent.change(queryAllByTestId("currency-select")[0], {
        target: { value: "GBP" },
      });
    });

    expect(queryAllByTestId("currency-select")[0].value).toBe("GBP");
    expect(queryAllByTestId("currency-select")[1].value).toBe("ABC");

    expect(queryAllByTestId("amount-input")[0].value).toBe(value.toString());
    expect(queryAllByTestId("amount-input")[1].value).toBe("8");

    act(() => {
      fireEvent.change(queryAllByTestId("currency-select")[1], {
        target: { value: "GBP" },
      });
    });

    expect(queryAllByTestId("currency-select")[0].value).toBe("ABC");
    expect(queryAllByTestId("currency-select")[1].value).toBe("GBP");

    expect(queryAllByTestId("amount-input")[0].value).toBe(value.toString());
    expect(queryAllByTestId("amount-input")[1].value).toBe("8");
  });

  test("onClicking the exchangeButton, it should redirect the user to transactions", () => {
    const { getByTestId, queryAllByTestId, queryByText } = renderWithRouter(
      <ExchangeForm currencies={CURRENCY_MAP} />
    );
    mockHistoryPush.mockClear();
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();

    const value = 2;
    act(() => {
      fireEvent.change(queryAllByTestId("amount-input")[0], {
        target: { value },
      });
    });

    expect(queryByText(/Insufficient/i)).not.toBeInTheDocument();
    expect(mockHistoryPush).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(getByTestId("button-do-exchange"));
    });

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith("/transactions");
  });
});
