import React, { useContext } from "react";
import SettingsContext from "../../Contexts/Settings";
import { SettingsContextType } from "../../types";

export const Transactions = () => {
  const { settings } = useContext<SettingsContextType>(SettingsContext);
  return (
    <div>
      <h1>Transactions</h1>
      {(settings?.transactions || []).map((transaction) => (
        <>{transaction.rate}</>
      ))}
    </div>
  );
};
