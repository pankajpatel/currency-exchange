import api from "./fetch";
import { ENDPOINTS } from "../config";
import { RatesResponse } from "../types";

export const getRates = (currency: string = ""): Promise<RatesResponse> => {
  const params: Record<string, string> = {};
  if (currency) {
    params.from = currency;
  }
  const search = new URLSearchParams(params);

  return api.get(`${ENDPOINTS.RATES}?${search.toString()}`);
};
