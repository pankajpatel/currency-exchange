import React from "react";
import { Link } from "react-router-dom";
import { RatesProvider } from "../../Contexts/Rates";
import { ExchangeUI } from "./ExchangeUI";

const CURRENCY_MAP = {
  EUR: "€",
  GBP: "£",
  USD: "$",
};

export const Exchange = () => (
  <RatesProvider>
    <ExchangeUI currencies={CURRENCY_MAP} />
    <Link to="/settings">Settings</Link>
  </RatesProvider>
);
