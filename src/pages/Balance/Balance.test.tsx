import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Balance } from "./Balance";

const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{Component}</Router>);
};

describe("Balance", () => {
  test("renders", () => {
    const { getByText } = renderWithRouter(<Balance />);
    const app = getByText(/Balance/i);
    expect(app).toBeInTheDocument();
  });
});
