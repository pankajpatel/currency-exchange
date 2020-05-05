import React, { ChangeEvent, PropsWithChildren } from "react";
import styled from "styled-components";
import { Select } from "../Select/Select";
import { AmountInput } from "../AmountInput/AmountInput";
import { ExchangeState } from "../../types";
import { FlexContainer } from "../styled";

const ExchangeCurrency = styled(FlexContainer)`
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 2rem;
  & input,
  & select {
    max-width: 100%;
    display: block;
    outline: none;
  }
`;

export const ExchangeParticipant = ({
  state,
  currencies,
  children = null,
  onCurrencyChange = () => {},
  onAmountChange = () => {},
}: PropsWithChildren<{
  state: ExchangeState;
  currencies: string[];
  onCurrencyChange?: Function;
  onAmountChange?: Function;
}>) => {
  const value = state.amount ? Number(state.amount.toFixed(2)) : "";
  return (
    <>
      <ExchangeCurrency data-testid="exchange-participant">
        <Select
          key={state.currency}
          value={state.currency}
          currencies={currencies}
          onChange={onCurrencyChange}
        />
        <AmountInput
          defaultValue={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);
            if (isNaN(value)) {
              return;
            }
            onAmountChange(value);
          }}
        />
      </ExchangeCurrency>
      {children}
    </>
  );
};
