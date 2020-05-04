import styled from "styled-components";
import { FlexContainer } from "../../components/styled";

export const Container = styled.div`
  max-width: 320px;
  padding: 1rem 0;
  border: 1px solid #efefef;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.3);
`;
export const InfoContainer = styled(FlexContainer)`
  font-size: 0.8rem;
  opacity: 0.8;
  padding: 0 1rem;
`;
export const Balance = styled.div`
  text-align: left;
  padding-left: 0.4rem;
`;

export const Message = styled.div`
  text-align: right;
  padding-right: 0.4rem;
`;
