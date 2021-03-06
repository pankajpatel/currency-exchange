import React, {
  useContext,
  useReducer,
  useEffect,
  FormEventHandler,
  useRef,
} from "react";
import { RouteProps, useHistory } from "react-router-dom";
import RatesContext from "../../Contexts/Rates";
import SettingsContext from "../../Contexts/Settings";
import { Button, Container } from "@components/styled";
import { InfoContainer, Message, Balance } from "./styled";
import { RatesContextType, SettingsContextType } from "../../types";
import { ExchangeSeparator } from "@components/ExchangeSeparator/ExchangeSeparator";
import { ExchangeParticipant } from "@components/ExchangeParticipant/ExchangeParticipant";
import { exchangeReducer, initialState } from "../../reducers/exchange.reducer";
import formatNumber from "../../helpers/formatNumber";

type Props = {
  currencies: Record<string, string>;
} & RouteProps;

export const ExchangeForm = ({ currencies }: Props) => {
  const history = useHistory();
  const form = useRef<HTMLFormElement | null>(null);
  const ratesData = useContext<RatesContextType>(RatesContext);
  const { settings, exchangeAmount } = useContext<SettingsContextType>(
    SettingsContext
  );
  let message: string | null = null;
  const [exchangeData, dispatch] = useReducer(exchangeReducer, {
    ...initialState,
    from: {
      currency: settings.base,
      amount: null,
    },
  });

  useEffect(() => {
    dispatch({
      type: "RATES_UPDATED",
      payload: { rates: ratesData.rates },
    });
  }, [ratesData]);

  useEffect(() => {
    dispatch({ type: "RESET_EXCHANGE" });
  }, [settings.balances]);

  const CURRENCIES = Object.keys(currencies);
  const balance = settings.balances[exchangeData.from.currency];

  if (exchangeData.from.amount > balance) {
    message = "Insufficient Balance";
  }

  const switchCurrencies = () => {
    ratesData.updateBaseCurrency(exchangeData.to.currency);
    form.current?.reset();
    dispatch({ type: "EXCHANGE_SWITCHED" });
  };

  const updateBaseCurrency = (value: string) => {
    ratesData.updateBaseCurrency(value);
    dispatch({
      type: "BASE_CURRENCY_UPDATED",
      payload: { value },
    });
  };
  const updateSecondaryCurrency = (value: string) => {
    dispatch({
      type: "SECONDARY_CURRENCY_UPDATED",
      payload: { value },
    });
  };
  const updateBaseAmount = (value: number) => {
    dispatch({
      type: "BASE_AMOUNT_UPDATED",
      payload: { value },
    });
  };
  const updateSecondaryAmount = (value: number) => {
    dispatch({
      type: "SECONDARY_AMOUNT_UPDATED",
      payload: { value },
    });
  };

  const makeExchange: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    exchangeAmount(exchangeData);
    form.current?.reset();
    history.push("/transactions");
  };

  const exchangeInfo =
    ratesData.loading && !exchangeData.rate
      ? {
          from: "⋅⋅⋅",
          to: "⋅⋅⋅",
        }
      : {
          from: `${currencies[exchangeData.from.currency]} 1`,
          to: `${currencies[exchangeData.to.currency]} ${formatNumber(
            exchangeData.rate
          )}`,
        };

  return (
    <form onSubmit={makeExchange} data-testid="exchange-form" ref={form}>
      <Container>
        <ExchangeParticipant
          state={exchangeData.from}
          currencies={CURRENCIES}
          onCurrencyChange={updateBaseCurrency}
          onAmountChange={updateBaseAmount}
        >
          <InfoContainer>
            <Balance>Balance: {formatNumber(balance)}</Balance>
            <Message>{message || ""}</Message>
          </InfoContainer>
        </ExchangeParticipant>
        <ExchangeSeparator
          values={exchangeInfo}
          onSwitchClick={switchCurrencies}
        />
        <ExchangeParticipant
          state={exchangeData.to}
          currencies={CURRENCIES}
          onCurrencyChange={updateSecondaryCurrency}
          onAmountChange={updateSecondaryAmount}
        >
          <InfoContainer>
            <Balance>
              Balance:{" "}
              {formatNumber(settings.balances[exchangeData.to.currency])}
            </Balance>
          </InfoContainer>
        </ExchangeParticipant>
        <Button
          className="m-2 inline-block"
          type="submit"
          data-testid="button-do-exchange"
        >
          Exchange
        </Button>
      </Container>
    </form>
  );
};
