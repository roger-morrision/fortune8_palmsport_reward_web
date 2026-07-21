import { useEffect, useState } from "react";
import BGButton from "@/src/common/components/BGButton";
import { MaterialIcon } from "@/src/common/components/Icon";
import TextInput from "@/src/common/components/TextInput";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";
import {
  authActions,
  selectAuthLoggingIn,
  selectAuthLogInFailed,
  selectAuthLoginInput,
} from "@/src/store/slices/auth.slice";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthService } from "@/src/store/hooks";
import StyleSheet from "react-native-media-query";
import { useTranslation } from "react-i18next";
import * as Types from "@/src/store/types";
import _ from "lodash";

function RightContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { login } = useAuthService();
  const loginInput = useAppSelector(selectAuthLoginInput);
  const isLoggingIn = useAppSelector(selectAuthLoggingIn);
  const errorMessage = useAppSelector(selectAuthLogInFailed);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState<Types.Login>({} as Types.Login);

  const updateField = (type: 'email' | 'password') => (value: string) => {
    dispatch(authActions.setLoginInput({ type, value }));
  };

  useEffect(() => {
    if (!_.isEmpty(error)) setError({} as Types.Login);
  }, [loginInput]);

  useEffect(() => {
    if (!_.isEmpty(errorMessage)) setError({ errorMessage } as Types.Login);
  }, [errorMessage]);

  const onLogin = () => {
    const Err: Types.Login = {} as Types.Login;
    if (!loginInput.email) Err.username = "Required";
    else if (!loginInput.password) Err.password = "Required";
    setError(Err);
    if (_.isEmpty(Err)) login();
  };

  const hasError = !_.isEmpty(error.errorMessage);

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <LinearGradient colors={["#152546", "#070E1C"]} style={styles.v_right} dataSet={{ media: ids.v_right }} >
        <Text fontFamily="Montserrat-Bold" color="#F5C842" style={styles.t_hello} dataSet={{ media: ids.t_hello }}>
          Hello Again!
        </Text>
        <Text fontFamily="Montserrat" color="text" style={styles.t_welcome}>
          Welcome Back
        </Text>

        {/* Email */}
        <View style={styles.v_input_wrap}>
          <MaterialIcon name="email" size={18} color="placeholder" backgroundColor="transparent" style={styles.input_icon} />
          <TextInput
            nativeID="login-email"
            placeholder={t("login.username")}
            style={[styles.input, (error.username || hasError) && styles.input_error]}
            value={loginInput?.email}
            onChangeText={updateField("email")}
            backgroundColor="secondary"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            importantForAutofill="yes"
          />
        </View>

        {/* Password */}
        <View style={styles.v_input_wrap}>
          <MaterialIcon name="lock" size={18} color="placeholder" backgroundColor="transparent" style={styles.input_icon} />
          <TextInput
            nativeID="login-password"
            placeholder={t("login.password")}
            value={loginInput?.password}
            onChangeText={updateField("password")}
            style={[styles.input, (error.password || hasError) && styles.input_error]}
            secureTextEntry={hidePassword}
            backgroundColor="secondary"
            textContentType="password"
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect={false}
            importantForAutofill="yes"
          />
          <MaterialIcon
            asButton
            name={hidePassword ? "visibility-off" : "visibility"}
            size={18}
            color="placeholder"
            backgroundColor="transparent"
            style={styles.eye_icon}
            onPress={() => setHidePassword((v) => !v)}
          />
        </View>

        {/* Error message */}
        {hasError && (
          <Text style={styles.t_error} numberOfLines={2}>
            {error.errorMessage}
          </Text>
        )}

        {/* Login button */}
        <BGButton
          isLoading={isLoggingIn}
          label={isLoggingIn ? "" : "Login"}
          onPress={onLogin}
          textColor="textDark"
          disabled={isLoggingIn}
          style={styles.btn_login}
          dataSet={{ media: ids.btn_login }}
          fontFamily="Montserrat-Bold"
          labelStyle={styles.btn_login_label}
          bgColors={["#DF7B0B", "#E5D33D"]}
          strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
          borderWidth={1}
        />
      </LinearGradient>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  // ── Right panel ──────────────────────────────────────
  container: {
    flex: 1,
  },
  linear_container: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  v_right: {
    flex: 1,
    gap: 14,
    paddingHorizontal: 40,
    justifyContent: "center",
    "@media (max-width: 600px)": {
      padding: 24,
    },
  },
  t_hello: {
    fontSize: 26,
    lineHeight: 30,
    "@media (max-width: 600px)": {
      fontSize: 22,
      lineHeight: 26,
    },
  },
  t_welcome: {
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 20,
    // marginTop: -8,
  },
  v_sso: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  v_divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
    "@media (max-width: 600px)": {
      marginVertical: 2,
    },
  },
  divider_line: {
    flex: 1,
    height: 1,
    backgroundColor: "#21366E",
  },
  t_or: {
    fontSize: 12,
    lineHeight: 16,
  },

  // Inputs
  v_input_wrap: {
    position: "relative",
    justifyContent: "center",
  },
  input_icon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  eye_icon: {
    position: "absolute",
    right: 14,
    zIndex: 1,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingLeft: 42,
    paddingRight: 42,
    borderWidth: 1,
    borderColor: "#21366E",
  },
  input_error: {
    borderColor: "#FF4444",
  },
  t_error: {
    fontSize: 12,
    lineHeight: 16,
    color: "#FF4444",
    marginTop: -6,
  },

  // Buttons
  btn_login: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  btn_login_label: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  btn_resend: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_forgot: {
    alignSelf: "center",
    marginTop: -4,
  },
  t_link: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});

export default RightContent;
