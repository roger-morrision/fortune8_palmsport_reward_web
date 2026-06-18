import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { useInputHelper } from "@/src/common/utils/useInputHelper";
import { REDEEM_STATES } from "@/src/common/utils/states-holder";
import { Redeem } from "@/src/store/types";

export type ScreenType =
  | "MAIN"
  | "BANK-INPUT"
  | "BANK-DETAILS"
  | "PAYPAL-INPUT"
  | "PAYPAL-DETAILS"
  | "OTP-VERIFICATION"
  | "REQUEST-PENDING"
  | "REQUEST-FAILED"
  | "REQUEST-SUCCESS";

export type OTPResponse = {
  id: number;
  otp_id: number;
  email_address: string;
  expires_at: string;
  otp_code: string;
};

export type PayoutResponse = {
  id: number;
  payout_transaction_id: number;
  pickupCode: string;
  expiration: string;
  estimatedPayoutTime: string;
  initiate_payout: {
    fee: number;
    expiration: string;
    status: string;
    client_transfer_id: string;
    source_currency_code: string;
    destination_currency_code: string;
    destination_amount: number;
    source_amount: number;
    exchange_rate: number;
    payer_name: string;
    pickup_code: string;
    delivery_type: string;
    country_code: string;
    estimated_availability: string;
  };
};

export type IntrumentResponse = {
  id: number;
  user_id: number;
  delivery_type: string;
  payer_name: string;
  bank_account_number: string;
  bank_routing_number: string;
  bank_account_type: "Checking" | "Savings";
};

interface ContextValue {
  error: Partial<Redeem>;
  state: Partial<Redeem>;
  otp: OTPResponse;
  screen: ScreenType;
  payout: PayoutResponse;
  instrument: IntrumentResponse;
  setOTP: Dispatch<SetStateAction<OTPResponse>>;
  setScreen: Dispatch<SetStateAction<ScreenType>>;
  setError: Dispatch<SetStateAction<Partial<Redeem>>>;
  setPayout: Dispatch<SetStateAction<PayoutResponse>>;
  setInstrument: Dispatch<SetStateAction<IntrumentResponse>>;
  onDispatch: (value: any) => (value: any) => void;
  handleFormReset: () => void;
}

export const RedeemContext = React.createContext<ContextValue>({} as ContextValue);

interface ProviderProps {
  children: React.ReactElement;
}

const RedeemProvider = ({ children }: ProviderProps) => {
  const [screen, setScreen] = useState<ScreenType>("MAIN");
  const [otp, setOTP] = useState<OTPResponse>({} as OTPResponse);
  const [payout, setPayout] = useState<PayoutResponse>({} as PayoutResponse);
  const [instrument, setInstrument] = useState<IntrumentResponse>({} as IntrumentResponse);
  const [error, setError] = useState<Partial<Redeem>>({} as Partial<Redeem>);
  const { state, onDispatch, handleFormReset } = useInputHelper<Partial<Redeem>>({
    ...REDEEM_STATES,
  });

  return (
    <RedeemContext.Provider
      value={{
        error,
        state,
        setError,
        onDispatch,
        screen,
        setScreen,
        otp,
        setOTP,
        payout,
        setPayout,
        instrument,
        setInstrument,
        handleFormReset,
      }}
    >
      {children}
    </RedeemContext.Provider>
  );
};

export const useRedeemContext = () => {
  return useContext(RedeemContext);
};

export default RedeemProvider;
