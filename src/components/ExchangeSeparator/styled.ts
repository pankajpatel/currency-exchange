import styled from "styled-components";

export const Separator = styled.div`
  position: relative;
  height: 1px;
  margin: 2rem 0;
  padding-left: 1rem;
  padding-right: 1rem;
  background: #dfdfdf;
`;

export const SeparatorButton = styled.button`
  border: 1px solid #dfdfdf;
  outline: none;
  border-radius: 1rem;
  padding: 0 0.5rem;
  background: white;
  transform: translateY(-50%);
  margin-left: 15%;
  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 0 5px 0 rgba(100, 100, 100, 0.2);
  }
`;

export const CurrencySwitch = styled(SeparatorButton)`
  --size: 1.8rem;
  width: var(--size);
  height: var(--size);
  line-height: var(--size);
  border-radius: 50%;
  position: absolute;
  padding: 0;
  left: 0;
`;
