import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Exchange } from "./Exchange";

const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{Component}</Router>);
};

describe("Exchange", () => {
  test("renders", () => {
    const { getByText } = renderWithRouter(<Exchange />);
    const app = getByText(/Exchange/i);
    expect(app).toBeInTheDocument();
  });
});
