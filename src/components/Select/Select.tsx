import React, { ReactElement, ChangeEvent } from "react";
import styled from "styled-components";

const HTMLSelect = styled.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg version=1.1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=292.362px height=292.362px viewBox=0 0 292.362 292.362 style=enable-background:new 0 0 292.362 292.362; xml:space=preserve%3E%3Cg%3E%3Cpath d=M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998077.279082.228c04.9481.8079.2295.42412.847l127.907127.907c3.6213.6177.9025.42812.855.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279290.54872.998286.93569.377z/%3E%3C/g%3E%3C/svg%3E%0A");
  background-position: 100% center;
  background-size: 10px;
  background-repeat: no-repeat;
  width: 80px;
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
