import { useEffect, useRef, useState } from "react";
import { Image, ImageURISource, Pressable, TextInput } from "react-native";
import useThemeColor from "@/src/common/hooks/useThemeColor";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import BGButton from "@/src/common/components/BGButton";
import { LinearGradient } from "expo-linear-gradient";
import SVGText from "@/src/common/components/SVGText";
import { NamedAssets } from "@/src/constants/Images";
import StyleSheet from "react-native-media-query";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useTranslation } from "react-i18next";
import { selectAuthLoggingIn, selectAuthLoginInput } from "@/src/store/slices/auth.slice";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { AuthService } from "@/src/api/services/auth.service";
import { useRootContext } from "@/src/context/RootContext";
import { Login } from "@/src/store/types";

const OTP_LENGTH = 6;

type Props = {
  images?: NamedAssets | null;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
  onBack?: () => void;
};

const OTPVerification = ({ images, onSubmit, onResend }: Props) => {
  const { t } = useTranslation();
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
  

  const fontSize = useBreakpoint({
    default: 22,
    xlarge: 30,
    mobile: 18,
    tablet: 18
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
    if (code.length === OTP_LENGTH) onSubmit?.(code);
  };

  const onResendCode = () => {
    mutate({
      username: loginInput.email,
      password: loginInput.password
    } as  Login);
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
    <View style={styles.screen} dataSet={{ media: ids.screen }}>
      {/* Logo */}
      <Image
        source={{ uri: images?.["palmsplay-rewards"]?.uri } as ImageURISource}
        style={styles.i_logo}
        dataSet={{ media: ids.i_logo }}
        resizeMode="stretch"
      />

      {/* Card with gold border */}
      <LinearGradient
        colors={["rgba(26, 70, 179, 0.4)", "rgba(11, 30, 77, 1)"]}
        locations={[0,1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card_border}
        dataSet={{ media: ids.card_border }}
      >
        <View style={styles.card_inner} dataSet={{ media: ids.card_inner }}>
          <SVGText 
            text={t("otp.title")}
            style={{ }}
            strokeWidth={3}
            fontSize={fontSize} 
            strokeColors={["#9E0974", "#9E0974"]}
            fillColors={["#F69166", "#F6DF66", "#F9EC97", "#E8DA54", "#E89254"]}
            offsetFillColors={[0.04, 0.25, 0.57, 0.77, 0.98]}
          />

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

          <View style={styles.v_resend}>
            <Text fontFamily="Montserrat" style={styles.t_resend}>
              {t("otp.resend-prefix")}{" "}
            </Text>
            {timer > 0 ? 
            <Text disabled={timer > 0}
              fontFamily="Montserrat-SemiBold"
              color="blue"
              style={styles.t_resend}>
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
};

const { ids, styles } = StyleSheet.create({
  screen: {
    flex: 1,
    top: "-8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      top: 0,
      paddingTop: "20%",
      justifyContent: "flex-start",
    },
  },

  // Logo — desktop: smaller, above card; mobile: larger at top
  i_logo: {
    width: 200,
    height: 160,
    marginBottom: 20,
    "@media (max-width: 800px)": {
      width: 200,
      height: 160,
      top: "-3%",
      marginBottom: 20,
    },
  },

  // Gold border wrapper
  card_border: {
    padding: 2,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "rgba(247, 212, 120, 1)",
    width: "55%",
    "@media (max-width: 1600px) and (min-width: 801px)": {
      width: "55%",
    },
    "@media (max-width: 800px)": {
      width: "90%",
      borderRadius: 14,
    },
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
    marginTop: 24,
    flexDirection: "row",
    "@media (max-width: 800px)": {
      gap: 8,
      marginTop: 20,
      width: "100%",
      justifyContent: "center",
    },
  },

  // Individual digit box
  digit_input: {
    width: 60,
    height: 68,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Montserrat-Bold",
    "@media (max-width: 1600px) and (min-width: 801px)": {
      width: 52,
      height: 60,
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
    marginTop: 27,
    width: 200,
    height: 50,
    "@media (max-width: 1600px) and (min-width: 800px)": {
      marginTop: 25,
      width: 166,
      height: 48,
    },
    "@media (max-width: 800px)": {
      width: "100%",
      height: 54,
      marginTop: 20,
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
    marginTop: 16,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  t_resend: {
    fontSize: 17,
    lineHeight: 20,
    textAlign: "center",
    "@media (max-width: 1600px) and (min-width: 801px)": {
      fontSize: 13,
      lineHeight: 18,
    },
  },
});

export default OTPVerification;
