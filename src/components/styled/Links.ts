import styled from "styled-components";

export const ListContainer = styled.div`
  display: table;
  width: auto;
  margin: 0.5rem auto;
  border-collapse: collapse;
`;
export const List = styled.ul`
  border-radius: 5px;
  border: 1px solid #dedede;
  list-style: none;
  padding: 0;
  display: table-row;
`;
export const ListItem = styled.li`
  display: inline-block;
  border: 1px solid #dedede;
  padding: 0.3rem 0.8rem;
  display: table-cell;
`;
