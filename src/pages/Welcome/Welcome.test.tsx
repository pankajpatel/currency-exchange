import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Welcome } from "./Welcome";

const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{Component}</Router>);
};

describe("Welcome", () => {
  test("renders", () => {
    const { getByText } = renderWithRouter(<Welcome />);
    const app = getByText(/Welcome/i);
    expect(app).toBeInTheDocument();
  });
});
