import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { AmountInput } from "./AmountInput";

describe("AmountInput", () => {
  test("renders", () => {
    const { getByTestId } = render(<AmountInput />);
    const input = getByTestId("amount-input");
    expect(input).toBeInTheDocument();
  });

  test("calls the onChange handler on changing the value", () => {
    const changeHandler = jest.fn();
    const { getByTestId } = render(<AmountInput onChange={changeHandler} />);
    const input = getByTestId("amount-input");
    expect(input).toBeInTheDocument();
    const value = "12345";
    act(() => {
      fireEvent.change(input, { target: { value } });
    });
    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(input.value).toBe(value);
  });
});
