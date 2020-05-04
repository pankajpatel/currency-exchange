export type Currency = string;
export type Amount = number;
export type Currencies = Currency[];
export type Rates = Record<string, string | number>;
export type Transaction = {
  timestamp: number;
} & ExchangeParams;

export type Action = {
  type: string;
  payload?: Record<string, any>;
  rates?: Rates;
  currency?: Currency;
  loading?: boolean;
};

export interface Reducer<State, Action> {
  (state: State, action: Action): State;
}

export type RatesState = {
  loading: boolean;
  currency: Currency;
  rates: Record<Currency, Amount>;
};

export type RatesContextType = {
  updateBaseCurrency: Function;
} & RatesState;

export type RatesResponse = {
  rates?: Rates;
};

export type Settings = {
  base: string;
  poll: number;
  currencies: Currencies;
  transactions?: Transaction[];
  balances: Record<string, number>;
};

export type ExchangeState = {
  currency: Currency;
  amount: Amount | null;
};

export type SettingsContextType = {
  lastUpdated?: number;
  settings: Settings;
  updateSettings: Function;
  exchangeAmount: Function;
};

export type ExchangeParams = {
  from: ExchangeState;
  to: ExchangeState;
  rate: number;
};
