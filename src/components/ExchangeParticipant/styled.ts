import styled from "styled-components";

export const ExchangeCurrency = styled.div`
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
