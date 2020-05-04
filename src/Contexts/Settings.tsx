import React, { useReducer, PropsWithChildren } from "react";
import { settingsReducer, initialState } from "../reducers/settings.reducer";
import { SettingsContextType } from "../types";

const SettingsContext = React.createContext<SettingsContextType>({
  settings: initialState,
  updateSettings: () => {},
});

const { Provider, Consumer } = SettingsContext;

export const SettingsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialState);

  const updateSettings = (payload: object) => {
    dispatch({
      type: "SETTINGS_UPDATED",
      payload,
    });
  };
  const value = { settings, updateSettings };
  return <Provider value={value}>{children}</Provider>;
};

export const SettingsConsumer = Consumer;

export default SettingsContext;
