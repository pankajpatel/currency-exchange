type Config = Record<string, string>;

export const NAMESPACE: string = "currency-exchange";

export const ENDPOINTS: Config = {
  RATES: "/latest",
  CURRENCIES: "/currencies",
};

export const API: Record<string, string | Config> = {
  REMOTE: "//api.frankfurter.app",
  ENDPOINTS,
  NAMESPACE,
};
