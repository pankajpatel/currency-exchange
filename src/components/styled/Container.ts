import styled from "styled-components";

export const Container = styled.div<{ width?: string }>`
  max-width: ${(props) => props.width || "320px"};
  width: ${(props) => props.width || "auto"};
  padding: 1rem 0;
  border: 1px solid #efefef;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.3);
  margin: 0.5rem;
`;
