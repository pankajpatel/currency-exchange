import LS from "./localStorage";
import { Settings } from "../types";

export const getSettings = (key: string | null = null): Settings => LS.get(key);
export const saveSettings = (key: string, value: any): void => {
  LS.set(key, value);
};
