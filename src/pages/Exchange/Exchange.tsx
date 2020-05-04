import React from "react";
import { Link } from "react-router-dom";
import { RatesProvider } from "../../Contexts/Rates";
import { ExchangeForm } from "../../components/ExchangeForm/ExchangeForm";
import { ListContainer, List, ListItem } from "../../components/styled";

const CURRENCY_MAP = {
  EUR: "€",
  GBP: "£",
  USD: "$",
};

export const Exchange = () => (
  <RatesProvider>
    <ExchangeForm currencies={CURRENCY_MAP} />
    <ListContainer>
      <List>
        <ListItem>
          <Link to="/settings">Settings</Link>
        </ListItem>
        <ListItem>
          <Link to="/transactions">Transactions</Link>
        </ListItem>
      </List>
    </ListContainer>
  </RatesProvider>
);
