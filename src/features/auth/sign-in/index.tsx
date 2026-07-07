import { useEffect, useState } from "react";
import { authActions, selectAuthLoggingIn, selectAuthOTPRequest } from "@/src/store/slices/auth.slice";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import useThemeColor from "@/src/common/hooks/useThemeColor";
import { MaterialIcon } from "@/src/common/components/Icon";
import { Image, Pressable, TextInput } from "react-native";
import BGSplash from "@/src/common/components/bg-splash";
import BGButton from "@/src/common/components/BGButton";
import { useAuthService } from "@/src/store/hooks";
import StyleSheet from "react-native-media-query";
import OTPVerification from "./otp-verification";
import View from "@/src/common/components/View";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";

const SignLandingPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { login } = useAuthService();
  const { images } = useAssetContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useAppSelector(selectAuthLoggingIn);
  const otpRequest = useAppSelector(selectAuthOTPRequest);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});

  const placeholderColor = useThemeColor("placeholder");
  const textColor = useThemeColor("textDark");

  const onLogin = () => {
    const Err: Record<string, string> = {};
    if (!email) Err.email = " ";
    else if (!password) Err.password = " ";
    setError(Err);
    if (_.isEmpty(Err)) {
      login({ username: email, password } as any);
    }
  };

  useEffect(() => {
    setError({});
  }, [email, password]);
  

  if (!otpRequest) {
    return (
      <BGSplash>
        <OTPVerification
          images={images}
          onSubmit={(code) => {
            // alert("code" + code)
            dispatch(authActions.otpVerify(code))
          }}
          onBack={() => dispatch(authActions.logout())}
        />
      </BGSplash>
    );
  }

  return (
    <BGSplash>
      <>
        <View style={styles.container} dataSet={{ media: ids.container }}>
          <Image
            source={{ uri: images?.["palmsplay-rewards"]?.uri }}
            style={styles.i_logo}
            dataSet={{ media: ids.i_logo }}
            resizeMode="stretch"
          />

          <View style={styles.v_inputs} dataSet={{ media: ids.v_inputs }}>
            {/* Username */}
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={t("login.username")}
              placeholderTextColor={placeholderColor}
              autoComplete="off"
              textContentType="none"
              importantForAutofill="no"
              style={[styles.text_input, { color: textColor }, error.email && { borderWidth: 1, borderColor: "red" }]}
              dataSet={{ media: ids.text_input }}
            />

            {/* Password */}
            <View
              style={[styles.input_wrap]}
              dataSet={{ media: ids.input_wrap }}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={t("login.password")}
                placeholderTextColor={placeholderColor}
                secureTextEntry={!showPassword}
                style={[styles.text_input, styles.text_input_password, { color: textColor }, error.password && { borderWidth: 1, borderColor: "red" }]}
                dataSet={{ media: ids.text_input }}
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                style={styles.eye_btn}
              >
                <MaterialIcon
                  disabled
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={18}
                  color="closeColor"
                />
              </Pressable>
            </View>
          </View>

          <BGButton
            label={t("login.submit")}
            onPress={onLogin}
            isLoading={isLoading}
            style={styles.btn_login}
            dataSet={{ media: ids.btn_login }}
            fontFamily="Montserrat-SemiBold"
            labelStyle={styles.label_login}
          />
        </View>
      </>
    </BGSplash>
  );
};

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    top: "-5%",
    "@media (max-width: 800px)": {
    },
  },

  // Logo
  i_logo: {
    width: 234,
    height: 120,
    "@media (max-width: 1600px) and (min-width: 801px)": {
      width: 200,
      height: 160,
    },
    "@media (max-width: 800px)": {
      position: "absolute",
      top: "10%",
      width: 190,
      height: 160,
    },
  },

  // Inputs container
  v_inputs: {
    gap: 12,
    width: "42%",
    marginTop: 16,
    "@media (max-width: 800px)": {
      width: "88%",
      marginTop: "40%",
    },
  },
  input_wrap: {
    flex: 1,
    borderRadius: 5,
    overflow: "visible",
  },
  input_wrap_password: {
    flexDirection: "row",
    alignItems: "center",
  },
  input_error_wrap: {
    borderWidth: 1,
    borderColor: "#FF4444",
    borderRadius: 8,
  },
  text_input: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    fontFamily: "Montserrat",
    fontSize: 15,
    "@media (max-width: 800px)": {
      height: 45,
      borderRadius: 5,
    },
  },
  text_input_password: {
    paddingRight: 44,
  },
  eye_btn: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  // Login button
  btn_login: {
    width: 157,
    height: 50,
    marginTop: 28,
    "@media (max-width: 800px)": {
      marginTop: 20,
      width: "88%",
      height: 50,
    },
  },
  label_login: {
    fontSize: 18,
    lineHeight: 20,
    "@media (max-width: 800px)": {
      fontSize: 18,
      lineHeight: 22,
    },
  },
});

export default SignLandingPage;
