import React from "react";
import { render } from "@testing-library/react";
import App from "./App";


describe("App", () => {
  test("renders", () => {
    const { getByTestId } = render(<App />);
    const app = getByTestId("app");
    expect(app).toBeInTheDocument();
  });
});