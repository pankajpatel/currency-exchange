import React from "react";
import { Separator, SeparatorButton, CurrencySwitch } from "./styled";

type Props = {
  values: Record<string, string>;
  onSwitchClick: Function;
};

export const ExchangeSeparator = ({ values, onSwitchClick }: Props) => {
  return (
    <Separator data-testid="separator">
      <CurrencySwitch
        onClick={onSwitchClick}
        data-testid="separator-switch-button"
      >
        ⇅
      </CurrencySwitch>
      <SeparatorButton>
        {values.from} → {values.to}
      </SeparatorButton>
    </Separator>
  );
};
