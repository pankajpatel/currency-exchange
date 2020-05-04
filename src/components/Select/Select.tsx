import React, { ReactElement, ChangeEvent } from "react";
import styled from "styled-components";

const HTMLSelect = styled.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: transparent;
`;

type Props = {
  currencies: string[];
  value?: string;
  onChange?: Function;
};

export const Select = ({
  currencies,
  value = "",
  onChange = () => {},
}: Props): ReactElement => (
  <div>
    <HTMLSelect
      data-testid="currency-select"
      defaultValue={value}
      onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) =>
        onChange(value)
      }
    >
      {currencies.map((currency) => (
        <option key={currency}>{currency}</option>
      ))}
    </HTMLSelect>
  </div>
);
