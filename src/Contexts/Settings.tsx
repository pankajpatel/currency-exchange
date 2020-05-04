import React, { useReducer, useEffect, PropsWithChildren } from "react";
import { settingsReducer, initialState } from "../reducers/settings.reducer";
import { SettingsContextType, ExchangeParams, Settings } from "../types";
import { getSettings, saveSettings } from "../data/settings";

const SettingsContext = React.createContext<SettingsContextType>({
  settings: initialState,
  updateSettings: () => {},
  exchangeAmount: () => {},
});

const { Provider, Consumer } = SettingsContext;

export const SettingsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialState);
  const saveAppState = (data: Settings) => {
    const timestamp = Number(new Date());
    saveSettings("app", data);
    saveSettings("timestamp", timestamp);
  };

  useEffect(() => {
    updateSettings(getSettings("app"));
  }, []);

  useEffect(() => {
    saveAppState(settings);
  }, [settings]);

  const updateSettings = (payload: object) => {
    dispatch({
      type: "SETTINGS_UPDATED",
      payload,
    });
  };
  const exchangeAmount = (params: ExchangeParams) => {
    dispatch({
      type: "EXCHANGE_INITIATED",
      payload: params,
    });
  };
  const value = { settings, updateSettings, exchangeAmount };

  return <Provider value={value}>{children}</Provider>;
};

export const SettingsConsumer = Consumer;

export default SettingsContext;
