import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { ExchangeParticipant } from "./ExchangeParticipant";

const state = {
  amount: null,
  currency: "DEF",
};

const currencies = ["ABC", "DEF", "GHI"];

describe("ExchangeParticipant", () => {
  test("renders", () => {
    const { getByTestId } = render(
      <ExchangeParticipant
        state={state}
        currencies={currencies}
        onAmountChange={() => {}}
        onCurrencyChange={() => {}}
      />
    );

    expect(getByTestId("exchange-participant")).toBeInTheDocument();
    expect(getByTestId("amount-input")).toBeInTheDocument();
    expect(getByTestId("currency-select")).toBeInTheDocument();
  });

  test("calls the currencyChange handler on changing the currency select", () => {
    const currencyChangeHandler = jest.fn();
    const { getByTestId } = render(
      <ExchangeParticipant
        state={state}
        currencies={currencies}
        onAmountChange={() => {}}
        onCurrencyChange={currencyChangeHandler}
      />
    );

    expect(getByTestId("exchange-participant")).toBeInTheDocument();
    expect(getByTestId("currency-select")).toBeInTheDocument();

    const value = "GHI";
    act(() => {
      fireEvent.change(getByTestId("currency-select"), { target: { value } });
    });
    expect(currencyChangeHandler).toHaveBeenCalled();
    expect(currencyChangeHandler).toHaveBeenCalledTimes(1);
    expect(getByTestId("currency-select").value).toBe(value);
  });

  test("calls the amountChange handler on changing the amount input", () => {
    const amountChangeHandler = jest.fn();
    const { getByTestId } = render(
      <ExchangeParticipant
        state={state}
        currencies={currencies}
        onAmountChange={amountChangeHandler}
        onCurrencyChange={() => {}}
      />
    );

    expect(getByTestId("exchange-participant")).toBeInTheDocument();
    expect(getByTestId("amount-input")).toBeInTheDocument();

    const value = "12345";
    act(() => {
      fireEvent.change(getByTestId("amount-input"), { target: { value } });
    });
    expect(amountChangeHandler).toHaveBeenCalled();
    expect(amountChangeHandler).toHaveBeenCalledTimes(1);
    expect(getByTestId("amount-input").value).toBe(value);
  });

  test("calls the amountChange and currencyChange handlers", () => {
    const currencyChangeHandler = jest.fn();
    const amountChangeHandler = jest.fn();

    const { getByTestId } = render(
      <ExchangeParticipant
        state={state}
        currencies={currencies}
        onAmountChange={amountChangeHandler}
        onCurrencyChange={currencyChangeHandler}
      />
    );

    expect(getByTestId("exchange-participant")).toBeInTheDocument();
    expect(getByTestId("amount-input")).toBeInTheDocument();
    expect(getByTestId("currency-select")).toBeInTheDocument();

    const value = "12345";
    act(() => {
      fireEvent.change(getByTestId("amount-input"), { target: { value } });
    });
    expect(amountChangeHandler).toHaveBeenCalled();
    expect(amountChangeHandler).toHaveBeenCalledTimes(1);
    expect(getByTestId("amount-input").value).toBe(value);

    const currencyValue = "GHI";
    act(() => {
      fireEvent.change(getByTestId("currency-select"), {
        target: { value: currencyValue },
      });
    });
    expect(currencyChangeHandler).toHaveBeenCalled();
    expect(currencyChangeHandler).toHaveBeenCalledTimes(1);
    expect(getByTestId("currency-select").value).toBe(currencyValue);
  });
});
