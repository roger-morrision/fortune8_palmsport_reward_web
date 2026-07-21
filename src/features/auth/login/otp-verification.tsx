import { useEffect, useRef, useState } from "react";
import BGButton from "@/src/common/components/BGButton";
import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import {
  authActions,
  selectAuthLoggingIn,
  selectAuthLoginInput,
} from "@/src/store/slices/auth.slice";
import * as Types from "@/src/store/types";
import { AuthService } from "@/src/api/services/auth.service";
import { useRouter } from "expo-router";
import _ from "lodash";
import StyleSheet from "react-native-media-query";
import { useRootContext } from "@/src/context/RootContext";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import useThemeColor from "@/src/common/hooks/useThemeColor";
import { Pressable, TextInput } from "react-native";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";

const OTP_LENGTH = 6;

function OTPVerification() {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const timerId = useRef<any>(null);
  const [timer, setTimer] = useState(180);
  const textDark = useThemeColor("textDark");
  const { setErrorMessage } = useRootContext();
  const refs = useRef<(TextInput | null)[]>([]);
  const [error, setError] = useState<string>("");
  const isLoading = useAppSelector(selectAuthLoggingIn);
  const loginInput = useAppSelector(selectAuthLoginInput);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  const { mutate, isPending } = useMutationApi(AuthService.login, {
    onSuccess: () => {
      // setSuccessMessage("Message successfully sent.");
      setTimer(180);
    },
    onError: (error) => {
      setErrorMessage(error?.message ?? "Something went wrong.");
    },
  });

  // When the user manually taps a box that already has a value, clear that box
  // and everything after it so typing flows forward from the tapped position.
  const onFocusDigit = (index: number) => {
    if (digits[index]) {
      setDigits((prev) => {
        const next = [...prev];
        for (let i = index; i < OTP_LENGTH; i++) next[i] = "";
        return next;
      });
    }
  };

  const onChangeDigit = (value: string, index: number) => {
    const cleaned = value.replace(/[^0-9]/g, "");

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, OTP_LENGTH);
      const next = Array(OTP_LENGTH).fill("");
      for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
      setDigits(next);
      refs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
      return;
    }

    const isComplete = digits.every((d) => d !== "");
    if (isComplete) return;

    const digit = cleaned.slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (digit) {
      const nextIndex = Math.min(index + 1, OTP_LENGTH - 1);
      refs.current[nextIndex]?.focus();
    }
  };

  const onKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      if (digits[index]) {
        // Clear the current box in place
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        // Current is empty — move back and clear previous
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        refs.current[index - 1]?.focus();
      }
    }
  };

  const onEnter = () => {
    const code = digits.join("");
    if(code.length < 6) setError("error");
    if (code.length === OTP_LENGTH){
      dispatch(authActions.otpVerify(code))
    }
  };

  const onResendCode = () => {
    mutate({
      username: loginInput.email,
      password: loginInput.password
    } as Types.Login);
  }

  useEffect(() => {
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
     <View backgroundColor="red" style={styles.overlay}>
      <LinearGradient colors={["#152546", "#070E1C"]}  style={styles.card} dataSet={{ media: ids.card }}>
        {/* Back */}
        <Button style={styles.btn_back} onPress={() => dispatch(authActions.resetOTPRequest())}>
          <MaterialIcon
            disabled
            name="arrow-back-ios"
            size={22}
            color="text"
            backgroundColor="transparent"
          />
          <Text style={styles.t_back}>Back</Text>
        </Button>

        {/* Close */}
        <MaterialIcon
          asButton
          name="close"
          size={26}
          color="text"
          backgroundColor="transparent"
          style={styles.btn_close}
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        />
        <View style={styles.card_inner} dataSet={{ media: ids.card_inner }}>
          <Text
            color="#F5C842"
            style={styles.t_title}
            dataSet={{ media: ids.t_title }}
            fontFamily="Montserrat-Bold"
          >
            {t("otp.title")}
          </Text>
          <Text
            style={styles.t_subtitle}
            dataSet={{ media: ids.t_subtitle }}
            fontFamily="Montserrat"
          >
            {t("otp.subtitle")}
          </Text>

          <View style={styles.v_digits} dataSet={{ media: ids.v_digits }}>
            {digits.map((digit, i) => (
              <TextInput
                key={i}
                ref={(r) => { refs.current[i] = r; }}
                value={digit}
                onFocus={() => onFocusDigit(i)}
                onChangeText={(v) => onChangeDigit(v, i)}
                onKeyPress={({ nativeEvent }) => onKeyPress(nativeEvent.key, i)}
                keyboardType="number-pad"
                maxLength={OTP_LENGTH}
                style={[styles.digit_input, { color: textDark }, error && { borderColor: "red"}]}
                dataSet={{ media: ids.digit_input }}
              />
            ))}
          </View>

          <BGButton
            label={t("otp.submit")}
            onPress={onEnter}
            isLoading={isLoading || isPending}
            style={styles.btn_submit}
            dataSet={{ media: ids.btn_submit }}
            fontFamily="Montserrat-SemiBold"
            labelStyle={styles.btn_label}
          />

          <View style={styles.v_resend} dataSet={{ media: ids.v_resend }}>
            <Text fontFamily="Montserrat" style={styles.t_resend} dataSet={{ media: ids.t_resend }}>
              {t("otp.resend-prefix")}{" "}
            </Text>
            {timer > 0 ? 
            <Text disabled={timer > 0}
              fontFamily="Montserrat-SemiBold"
              color="blue"
              style={styles.t_resend}
              dataSet={{ media: ids.t_resend }}>
              {"Resend in " + timer}
            </Text> : 
            <Pressable onPress={onResendCode} disabled={isPending}>
              <Text fontFamily="Montserrat-SemiBold" color="blue" style={styles.t_resend}>
                {t("otp.resend-link")}
              </Text>
            </Pressable>}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  card: {
    width: 464,
    height: 540,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "row",
    "@media (max-width: 800px)": {
      flexDirection: "column",
      width: "90%",
      height: 490,
    },
  },
  btn_back: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  t_back: {
    fontSize: 12,
    lineHeight: 15,
  },
  btn_close: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  
  // Inner card body
  card_inner: {
    borderRadius: 14,
    paddingVertical: 56,
    paddingHorizontal: 32,
    alignItems: "center",
    "@media (max-width: 800px)": {
      borderRadius: 12,
      paddingBottom: 28,
      paddingTop: 28,
      paddingLeft: 30,
      paddingRight: 30,
    },
  },

  // Title
  t_title: {
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 20,
      lineHeight: 22,
    },
  },

  // Subtitle
  t_subtitle: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 20,
    textAlign: "center",
    "@media (max-width: 1600px) and (min-width: 801px)": {
      fontSize: 13,
      lineHeight: 18,
    },
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
      marginTop: 8,
    },
  },

  // Digit row
  v_digits: {
    gap: 14,
    marginTop: 35,
    flexDirection: "row",
    "@media (max-width: 800px)": {
      gap: 8,
      marginTop: 30,
      width: "100%",
      justifyContent: "center",
    },
  },

  // Individual digit box
  digit_input: {
    width: 50,
    height: 56,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Montserrat-Bold",
    "@media (max-width: 1600px) and (min-width: 801px)": {
      width: 48,
      height: 54,
    },
    "@media (max-width: 800px)": {
      width: 46,
      height: 54,
      fontSize: 20,
      borderRadius: 8,
    },
  },

  // Submit button
  btn_submit: {
    marginTop: 34,
    width: 307,
    height: 50,
    "@media (max-width: 800px)": {
      width: "100%",
      height: 54,
      marginTop: 30,
    },
  },
  btn_label: {
    fontSize: 16,
    lineHeight: 18,
    "@media (max-width: 800px)": {
      fontSize: 16,
      lineHeight: 18,
    },
  },

  // Resend row
  v_resend: {
    flexDirection: "row",
    marginTop: 54,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  t_resend: {
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
  },
});

export default OTPVerification;
