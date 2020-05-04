import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    flex: 1 auto;
    width: 50%;
  }
`;
