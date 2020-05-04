import React, { ReactElement, InputHTMLAttributes } from "react";
import styled from "styled-components";

export const Input = styled.input`
  text-align: right;
  position: relative;
  &:before {
    content: "-";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const AmountInput = (
  props: InputHTMLAttributes<HTMLInputElement>
): ReactElement => (
  <div>
    <Input type="tel" placeholder="0" {...props} data-testid="amount-input" />
  </div>
);
