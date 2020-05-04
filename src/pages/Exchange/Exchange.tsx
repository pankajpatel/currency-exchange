import React from "react";
import { Link } from "react-router-dom";
import { RatesProvider } from "../../Contexts/Rates";
import { ExchangeForm } from "../../components/ExchangeForm/ExchangeForm";

const CURRENCY_MAP = {
  EUR: "€",
  GBP: "£",
  USD: "$",
};

export const Exchange = () => (
  <RatesProvider>
    <ExchangeForm currencies={CURRENCY_MAP} />
    <Link to="/settings">Settings</Link>
  </RatesProvider>
);
