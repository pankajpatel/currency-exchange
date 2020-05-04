import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Select } from "../Select/Select";
import { AmountInput } from "../AmountInput/AmountInput";
import { ExchangeState } from "../../types";

const ExchangeCurrency = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  & > * {
    flex: 1 auto;
    width: 50%;

    & > * {
      font-size: 2rem;
      max-width: 100%;
      display: block;
      background: transparent;
      outline: none;
    }
  }
`;

export const ExchangeParticipant = ({
  state,
  currencies,
  onCurrencyChange = () => {},
  onAmountChange = () => {},
}: {
  state: ExchangeState;
  currencies: string[];
  onCurrencyChange?: Function;
  onAmountChange?: Function;
}) => {
  const value = state.amount ? Number(state.amount.toFixed(2)) : "";
  return (
    <ExchangeCurrency data-testid="exchange-participant">
      <Select
        key={state.currency}
        value={state.currency}
        currencies={currencies}
        onChange={onCurrencyChange}
      />
      <AmountInput
        key={state.amount || 0}
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
  );
};
