import React from "react";
import { render } from "@testing-library/react";
import { ExchangeForm } from "./ExchangeForm";

const CURRENCY_MAP = {
  ABC: "α",
  BCD: "β",
  XYZ: "χ",
};

describe("ExchangeForm", () => {
  test("renders", () => {
    const { getByTestId } = render(<ExchangeForm currencies={CURRENCY_MAP} />);

    expect(getByTestId("separator")).toBeInTheDocument();
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();
  });
});
