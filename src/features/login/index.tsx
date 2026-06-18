import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Row from "@/src/common/components/Row";
import Text from "@/src/common/components/Text";
import TextInput from "@/src/common/components/TextInput";
import View from "@/src/common/components/View";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { LOGIN_STATES } from "@/src/common/utils/states-holder";
import { useInputHelper } from "@/src/common/utils/useInputHelper";
import { GAMBLY_URL } from "@/src/constants/Config";
import { useAuthService } from "@/src/store/hooks";
import {
  authActions,
  selectAuthLoggingIn,
  selectAuthLogInFailed,
  selectedEmailVerificationUserId,
  selectedErrorCode,
} from "@/src/store/slices/auth.slice";
import * as Types from "@/src/store/types";
import { useRouter } from "expo-router";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import "./global.css";
import GoogleButton from "./Google";
import { ids, styles } from "./styles.css";
import { useApi } from "@/src/common/hooks/useApi";
import { AuthService } from "@/src/api/services/auth.service";

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { login } = useAuthService();
  const errorCode = useAppSelector(selectedErrorCode);
  const [hidePassword, setHidePassword] = useState(true);
  const isLoggingIn = useAppSelector(selectAuthLoggingIn);
  const { state, onDispatch } = useInputHelper(LOGIN_STATES);
  const errorMessage = useAppSelector(selectAuthLogInFailed);
  const [error, setError] = useState<Types.Login>({} as Types.Login);
  const EmailUserId = useAppSelector(selectedEmailVerificationUserId);

  const { loading, execute } = useApi(AuthService.resendEmail, {
    onSuccess: () => {
      router.replace("/resend-verification");
    },
    onError: (error) => {
      dispatch(authActions.setErrorMessage(error?.message ?? error));
    },
  });

  const onLogin = () => {
    const Err: Types.Login = {} as Types.Login;
    if (!state.username) {
      Err.username = "Required";
    } else if (!state.password) {
      Err.password = "Required";
    }

    setError(Err);

    if (_.isEmpty(Err)) {
      login(state as Types.Login);
    }
  };

  const onResendEmailVerification = async () => {
    execute(EmailUserId);
  };

  const onForgot = () => {
    window.location.href = `${GAMBLY_URL}/forgot-password`;
  };

  useEffect(() => {
    if (!_.isEmpty(error)) {
      setError({} as Types.Login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (!_.isEmpty(errorMessage)) {
      setError({ errorMessage } as Types.Login);
    }
  }, [errorMessage]);

  return (
    <View>
      <Row style={styles.action_container}>
        <GoogleButton />
      </Row>
      <View
        backgroundColor="borderColor"
        style={styles.divider_style}
        dataSet={{ media: ids.divider_style }}
      >
        <Text
          color={"text"}
          backgroundColor="background"
          style={styles.continue_style}
          dataSet={{ media: ids.continue_style }}
          fontFamily="PoppinsMedium"
        >
          Or continue with
        </Text>
      </View>
      <View style={styles.input_container} dataSet={{ media: ids.input_container }}>
        <TextInput
          placeholder="Email"
          style={[
            styles.input_style,
            (error.username || !_.isEmpty(errorMessage)) && styles.input_error_style,
          ]}
          value={state.username}
          onChangeText={onDispatch("username")}
          dataSet={{ media: ids.input_style }}
          backgroundColor="secondary"
          textContentType="emailAddress"
          autoComplete="email"
          importantForAutofill="yes"
        />
        <View style={{ justifyContent: "center" }}>
          <TextInput
            placeholder="Password"
            style={[
              styles.input_style,
              (error.password || !_.isEmpty(errorMessage)) && styles.input_error_style,
            ]}
            secureTextEntry={hidePassword}
            value={state.password}
            onChangeText={onDispatch("password")}
            dataSet={{ media: ids.input_style }}
            backgroundColor="secondary"
          />
          <MaterialIcon
            name={hidePassword ? "visibility-off" : "visibility"}
            onPress={() => setHidePassword(!hidePassword)}
            asButton
            backgroundColor="secondary"
            color="placeholder"
            style={{ position: "absolute", right: 19 }}
          />
        </View>
        {!_.isEmpty(error.errorMessage) && (
          <Text numberOfLines={2} style={styles.error_style} dataSet={{ media: ids.error_style }}>
            {error.errorMessage}
          </Text>
        )}
      </View>
      <Button
        onPress={onLogin}
        backgroundColor={"button"}
        style={styles.login_button_style}
        dataSet={{ media: ids.login_button_style }}
      >
        {isLoggingIn ? (
          <ActivityIndicator animating color="textDark" />
        ) : (
          <Text
            color={"primary"}
            style={styles.login_label_style}
            dataSet={{ media: ids.login_label_style }}
            fontFamily="PoppinsMedium"
          >
            Login
          </Text>
        )}
      </Button>
      {errorCode === "ACCOUNT_UNVERIFIED" && (
        <Button
          disabled={loading}
          onPress={onResendEmailVerification}
          backgroundColor={"transparent"}
          borderColor="borderColor"
          style={styles.resend_link_button_style}
          dataSet={{ media: ids.resend_link_button_style }}
        >
          {loading ? (
            <ActivityIndicator animating size={"small"} color="text" />
          ) : (
            <Text
              color={"placeholder"}
              style={styles.login_label_style}
              dataSet={{ media: ids.login_label_style }}
              fontFamily="PoppinsMedium"
            >
              Resend Verification Link
            </Text>
          )}
        </Button>
      )}
      <Button style={{ alignSelf: "center" }}>
        <Text
          color={"placeholder"}
          suppressHighlighting
          onPress={onForgot}
          style={styles.forgot_password_style}
          dataSet={{ media: ids.forgot_password_style }}
          fontFamily="PoppinsMedium"
        >
          Forgot Password
        </Text>
      </Button>
    </View>
  );
}

export default Login;
