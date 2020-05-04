import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Balance } from "./Balance";
import SettingsContext from "../../Contexts/Settings";

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
    transactions: [
      {
        from: {
          amount: 10,
          currency: "ABC",
        },
        to: {
          amount: 25,
          currency: "XYZ",
        },
        rate: 2.5,
        timestamp: Number(new Date()),
      },
    ],
  },
  updateSettings: jest.fn(),
  exchangeAmount: jest.fn(),
};

const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <SettingsContext.Provider value={mockSettingsContext}>
        {Component}
      </SettingsContext.Provider>
    </Router>
  );
};

describe("Balance", () => {
  test("renders", () => {
    const { getByText } = renderWithRouter(<Balance />);
    const app = getByText(/Balance/i);
    expect(app).toBeInTheDocument();

    expect(getByText(/ABC/i)).toBeInTheDocument();
    expect(getByText(/5/i)).toBeInTheDocument();

    expect(getByText(/BCD/i)).toBeInTheDocument();
    expect(getByText(/10/i)).toBeInTheDocument();

    expect(getByText(/GBP/i)).toBeInTheDocument();
    expect(getByText(/20/i)).toBeInTheDocument();
  });
});
