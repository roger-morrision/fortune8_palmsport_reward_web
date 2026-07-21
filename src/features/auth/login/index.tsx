import useAppSelector from "@/src/common/hooks/useAppSelector";
import { MaterialIcon } from "@/src/common/components/Icon";
import { useRootContext } from "@/src/context/RootContext";
import AuthProvider from "@/src/context/AuthContext";
import View from "@/src/common/components/View";
import {
  selectAuthLoggedIn,
  selectAuthOTPRequest,
} from "@/src/store/slices/auth.slice";
import _ from "lodash";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import LeftContent from "./left-content";
import RightContent from "./right-content";
import { StyleSheet as SS } from "react-native";
import OTPVerification from "./otp-verification";
import StyleSheet from "react-native-media-query";

function LoginScreen() {
  const router = useRouter();
  const { initiateLobby } = useRootContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const otpRequest = useAppSelector(selectAuthOTPRequest);

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
    if (!initiateLobby) {
      router.replace("/");
      const t = setTimeout(() => {
        clearTimeout(t);
        router.push("/(modal)/auth/login");
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, initiateLobby]);

  if(otpRequest){
    return <OTPVerification />
  }

  return (
    <AuthProvider>
      <View style={ss.overlay}>
        {/* ── Modal card ───────────────────────────────── */}
        <View style={styles.card} dataSet={{ media: ids.card }}>
          {/* Close */}
          <MaterialIcon
            asButton
            name="close"
            size={28}
            color="closeColor"
            style={styles.btn_close}
            backgroundColor="transparent"
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          />

          {/* ── Left branding panel ── */}
          <LeftContent />

          {/* ── Right form panel ── */}
          <RightContent />
        </View>
      </View>
    </AuthProvider>
  );
}

// Plain StyleSheet for the overlay (no media query needed)
const ss = SS.create({
  overlay: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

const { ids, styles } = StyleSheet.create({
  card: {
    width: "92%",
    maxWidth: 860,
    height: 540,
    overflow: "hidden",
    flexDirection: "row",
    "@media (max-width: 800px)": {
      flexDirection: "column",
      width: "90%",
      height: 490,
    },
  },
  btn_close: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
});

export default LoginScreen;
