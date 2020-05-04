import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Home } from "./Home";

const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{Component}</Router>);
};

describe("Home", () => {
  test("renders", () => {
    const { getByTestId } = renderWithRouter(<Home />);
    const app = getByTestId("home");
    expect(app).toBeInTheDocument();
  });
});
