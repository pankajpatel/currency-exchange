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

const getClassNames = (index: number, length: number) => {
  let position = "middle";
  if (index === 0) {
    position = "start";
  }
  if (index === length - 1) {
    position = "last";
  }
  switch (position) {
    case "start":
      return "flex flex-row px-3 pb-2 justify-between items-end border-b-2";
    case "last":
      return "flex flex-row px-3 pt-2 justify-between items-end";
    default:
      return "flex flex-row px-3 py-2 justify-between items-end border-b-2";
  }
};

export const Balance = () => {
  const { settings } = useContext<SettingsContextType>(SettingsContext);
  return (
    <ScreenCentered>
      <header>
        <h1 className="text-4xl pb-2">Balance</h1>
        <p>
          We have set it ourselves to EUR and credited your account some initial
          fund to play with the app
        </p>
      </header>
      <Container width="400px">
        {settings.currencies.map((currency, index, col) => {
          const classNames = getClassNames(index, col.length);
          return (
            <div className={classNames} key={currency}>
              <div>{currency}</div>
              <div className="text-sm text-gray-900 font-bold">
                {settings.balances[currency] || 0}
              </div>
            </div>
          );
        })}
      </Container>
      <ListContainer>
        <List>
          <ListItem>
            <Link to="/exchange">Exchange</Link>
          </ListItem>
          <ListItem>
            <Link to="/settings">Settings</Link>
          </ListItem>
          <ListItem>
            <Link to="/transactions">Transactions</Link>
          </ListItem>
        </List>
      </ListContainer>
    </ScreenCentered>
  );
};
