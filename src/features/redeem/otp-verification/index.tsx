import React, { useCallback } from "react";
import SVGIcon from "@/src/constants/SVGIcon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import Button from "@/src/common/components/Button";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useRootContext } from "@/src/context/RootContext";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { ids, styles } from "./styles.css";
import { useRedeemContext } from "../provider";
import { useLobbyService } from "@/src/store/hooks";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import ScreenTitle from "@/src/common/components/header/screen-title";
import { RedeemService } from "@/src/api/services/redeem.service";

const CELL_COUNT = 6;

export default function OTPVerification() {
  const timerId = React.useRef<any>(null);
  const [error, setError] = React.useState("");
  const [value, setValue] = React.useState("");
  const [timer, setTimer] = React.useState(180);
  const { setErrorMessage } = useRootContext();
  const { onUpdateWallet } = useLobbyService();
  const { state, otp, instrument, setScreen, setOTP, setPayout } = useRedeemContext();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const size = useBreakpoint({
    default: {
      width: 149,
      height: 80.84,
    },
    mobile: {
      width: 108,
      height: 58.5,
    },
    tablet: {
      width: 108,
      height: 58.5,
    },
  });

  const resend = useMutationApi(RedeemService.resendVerificationCode, {
    onSuccess: (response) => {
      setTimer(180);
      setOTP(response);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const verify = useMutationApi(RedeemService.emailVerification, {
    onSuccess: (response) => {
      setPayout(response);
      setScreen("REQUEST-PENDING");
      onUpdateWallet({ SILVER: 0, GOLD: -Number(state.goldAmount), "GOLD BONUS": 0 });
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setError(error.message);
    },
  });

  const onResendCode = () => {
    // if (timer > 0) return;

    resend.mutate({ userId: instrument.user_id, requestId: instrument.id });
  };

  const onVerifyCode = () => {
    const params = {
      userId: instrument.user_id,
      requestId: otp.id,
      verificationCode: value,
    };

    verify.mutate(params);
  };

  const onChangeText = useCallback(
    (val: any) => {
      if (error) {
        setError("");
      }
      setValue(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, error],
  );

  React.useEffect(() => {
    if (!timer) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timerId.current && clearInterval(timerId.current);
      setTimer(0);
      return;
    }

    timerId.current = setInterval(() => {
      setTimer((lastTimerCount) => lastTimerCount - 1);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [timer]);

  return (
    <>
      <ScreenTitle
        onBack={() => setScreen("BANK-DETAILS")}
        options={{ title: "Account Verification" }}
      />
      <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
        <SVGIcon name="email-sent" {...size} />
        <Text fontFamily="PoppinsBold" style={styles.t_verify} dataSet={{ media: ids.t_verify }}>
          Verify your account to continue
        </Text>
        <Text
          fontFamily="PoppinsLight"
          color="closeColor"
          style={styles.t_description}
          dataSet={{ media: ids.t_description }}
        >
          We’ve sent a code to your email. Please enter it below to continue your redemption.
        </Text>
        <View style={{}}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            cellCount={CELL_COUNT}
            onChangeText={onChangeText}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell, error && styles.cell_error]}
                dataSet={{ media: ids.cell }}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <Button
          onPress={onVerifyCode}
          style={styles.button_style}
          backgroundColor="goldFlatBorder"
          dataSet={{ media: ids.button_style }}
        >
          {resend.isPending || verify.isPending ? (
            <ActivityIndicator animating size="small" color="textDark" />
          ) : (
            <Text
              color="textDark"
              fontFamily="PoppinsSemiBold"
              style={styles.button_label}
              dataSet={{ media: ids.button_label }}
            >
              Verify Code
            </Text>
          )}
        </Button>

        <Text
          color="closeColor"
          style={styles.t_didnt_received}
          dataSet={{ media: ids.t_didnt_received }}
        >
          Didn’t receive a code?{" "}
          <Text disabled={timer > 0} onPress={onResendCode} style={{ color: "#0494DA" }}>
            {timer > 0 ? "Resend in " + timer : "Send Code Again"}
          </Text>
        </Text>
      </View>
    </>
  );
}
