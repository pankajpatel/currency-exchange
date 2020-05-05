import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SettingsContext from "../../Contexts/Settings";
import { SettingsContextType } from "../../types";
import {
  ScreenCentered,
  Container,
  ListContainer,
  List,
  ListItem,
} from "../../components/styled";

const TransactionContainer = styled(Container)`
  max-height: 400px;
  overflow-y: auto;
`;

export const Transactions = () => {
  const { settings } = useContext<SettingsContextType>(SettingsContext);
  const { transactions = [] } = settings;
  return (
    <ScreenCentered>
      <header>
        <h1 className="text-4xl pb-2">Transactions</h1>
      </header>
      <TransactionContainer width={"220px"}>
        {transactions.length
          ? transactions.map((transaction, index, coll) => (
              <div
                className={`p-2 justify-between items-end  ${
                  coll.length - 1 === index ? "border-b-0" : "border-b-2"
                }`}
                key={index}
              >
                <div>
                  <h3 className="text-2xl">
                    {transaction.from.currency} → {transaction.to.currency}
                  </h3>
                  <span className="text-xs text-green-900 font-bold">
                    {transaction.from.amount} x {transaction.rate} ={" "}
                    {transaction.to.amount}
                  </span>
                </div>
                <div className="text-xs text-gray-500 pt-1">
                  on {new Date(transaction.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          : "No Transactions yet!"}
      </TransactionContainer>

      <ListContainer>
        <List>
          <ListItem>
            <Link to="/settings">Settings</Link>
          </ListItem>
          <ListItem>
            <Link to="/exchange">Exchange</Link>
          </ListItem>
        </List>
      </ListContainer>
    </ScreenCentered>
  );
};

export default Transactions;
