import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Settings } from "./Settings";

const renderWithRouter = (Component: React.ReactNode) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{Component}</Router>);
};

describe("Settings", () => {
  test("renders", () => {
    const { getByText } = renderWithRouter(<Settings />);
    const app = getByText(/Settings/i);
    expect(app).toBeInTheDocument();
  });
});
