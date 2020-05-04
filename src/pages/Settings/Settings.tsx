import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ListContainer,
  List,
  ListItem,
  ScreenCentered,
  Container,
} from "../../components/styled";
import SettingsContext from "../../Contexts/Settings";
import { SettingsContextType } from "../../types";

export const Settings = () => {
  const { settings } = useContext<SettingsContextType>(SettingsContext);
  return (
    <ScreenCentered>
      <header>
        <h1 className="text-4xl pb-2">Settings</h1>
      </header>
      <Container width="300px">
        <div className="flex flex-row px-3 pb-2 justify-between items-end border-b-2">
          <div>Base Currency</div>
          <div className="text-sm text-gray-900 font-bold">{settings.base}</div>
        </div>
        <div className="flex flex-row px-3 py-2 justify-between items-end border-b-2">
          <div>Rate Refresh Interval</div>
          <div className="text-sm text-gray-900 font-bold">
            {settings.poll / 1000}s
          </div>
        </div>
        <div className="flex flex-row px-3 pt-2 justify-between items-end">
          <div>Currencies</div>
          <div className="text-sm text-gray-900 font-bold">
            {settings.currencies.join(", ")}
          </div>
        </div>
      </Container>
      <ListContainer>
        <List>
          <ListItem>
            <Link to="/exchange">Exchange</Link>
          </ListItem>
          <ListItem>
            <Link to="/balance">Balances</Link>
          </ListItem>
          <ListItem>
            <Link to="/transactions">Transactions</Link>
          </ListItem>
        </List>
      </ListContainer>
    </ScreenCentered>
  );
};
