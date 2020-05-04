import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { ExchangeSeparator } from "./ExchangeSeparator";

const values = {
  from: "ABC",
  to: "DEF",
};

describe("ExchangeSeparator", () => {
  test("renders", () => {
    const { getByTestId } = render(
      <ExchangeSeparator values={values} onSwitchClick={() => {}} />
    );

    expect(getByTestId("separator")).toBeInTheDocument();
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();
  });

  test("calls the onSwitchClick handler on click of switch", () => {
    const changeHandler = jest.fn();
    const { getByTestId } = render(
      <ExchangeSeparator values={values} onSwitchClick={changeHandler} />
    );

    expect(getByTestId("separator")).toBeInTheDocument();
    expect(getByTestId("separator-switch-button")).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByTestId("separator-switch-button"));
    });
    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler).toHaveBeenCalledTimes(1);
  });
});
