import LS from "./localStorage";
import { Settings } from "../types";

export const getSettings = (): Settings => LS.get();
