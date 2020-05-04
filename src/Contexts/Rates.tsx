import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useContext,
  PropsWithChildren,
} from "react";
import { ratesReducer, initialState } from "../reducers/rates.reducer";
import { getRates } from "../data/rates";
import { RatesContextType } from "../types";
import SettingContext from "./Settings";

const RatesContext = React.createContext<RatesContextType>({
  ...initialState,
  updateBaseCurrency: () => {},
});

const { Provider, Consumer } = RatesContext;

export const RatesProvider = ({ children }: PropsWithChildren<{}>) => {
  const { settings } = useContext(SettingContext);
  const [baseCurrency, setBaseCurrency] = useState<string>(settings.base);
  const [ratesData, dispatch] = useReducer(ratesReducer, initialState);
  const timeout = useRef<number>(0);

  useEffect(() => {
    const stopRunningPoll = () => {
      timeout.current && clearTimeout(timeout.current);
    };
    const newPoll = () => {
      timeout.current = setTimeout(poll, settings.poll);
    };

    const poll = () => {
      dispatch({
        type: "RATES_LOADING",
      });
      (async () => {
        const { rates = {} } = await getRates(baseCurrency);
        newPoll();
        dispatch({
          type: "RATES_RECEIVED",
          payload: { rates, currency: baseCurrency },
        });
      })();
    };

    poll();

    return stopRunningPoll;
  }, [settings.poll, baseCurrency]);

  return (
    <Provider
      value={{
        ...ratesData,
        updateBaseCurrency: setBaseCurrency,
      }}
    >
      {children}
    </Provider>
  );
};

export const RatesConsumer = Consumer;
export default RatesContext;
