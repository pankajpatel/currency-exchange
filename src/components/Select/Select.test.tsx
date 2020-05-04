import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { Select } from "./Select";
const currencies = ["ABC", "DEF"];
describe("Select", () => {
  test("renders", () => {
    const { getByTestId } = render(<Select currencies={currencies} />);
    const input = getByTestId("currency-select");
    expect(input).toBeInTheDocument();
  });

  test("calls the onChange handler on changing the value", () => {
    const changeHandler = jest.fn();
    const { getByTestId } = render(
      <Select currencies={currencies} onChange={changeHandler} />
    );
    const input = getByTestId("currency-select");
    expect(input).toBeInTheDocument();
    const value = "DEF";
    act(() => {
      fireEvent.change(input, { target: { value } });
    });
    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(getByTestId("currency-select").value).toBe(value);
  });
});
