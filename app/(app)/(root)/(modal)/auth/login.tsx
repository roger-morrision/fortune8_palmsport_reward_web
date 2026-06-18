import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Row from "@/src/common/components/Row";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import AuthProvider from "@/src/context/AuthContext";
import { useRootContext } from "@/src/context/RootContext";
import Login from "@/src/features/login";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import StyleSheet from "react-native-media-query";

function AuthScreen() {
  const router = useRouter();
  const { initiateLobby } = useRootContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }

    if (!initiateLobby) {
      router.replace("/");
      const timeout = setTimeout(() => {
        timeout && clearTimeout(timeout);
        router.navigate("/auth/login");
      }, 1000);
    }
  }, [isLoggedIn, initiateLobby]);

  return (
    <AuthProvider>
      <View
        style={styles.container}
        backgroundColor="background"
        dataSet={{ media: ids.container }}
      >
        <Row>
          <Button
            style={styles.button_style}
            backgroundColor={"button"}
            dataSet={{ media: ids.button_style }}
          >
            <Text color={"primary"} fontFamily="PoppinsMedium">
              Login
            </Text>
          </Button>

          <MaterialIcon
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
            asButton
            name="close"
            size={32}
            color="closeColor"
            style={styles.button_close_style}
          />
        </Row>
        <Login />
      </View>
    </AuthProvider>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "90%",
    paddingHorizontal: 28,
    paddingTop: 31,
    paddingBottom: 40,
    minHeight: 350,
    borderRadius: 10,
    maxHeight: "90%",
    alignSelf: "center",
    "@media (min-width: 800px)": {
      width: 530,
    },
    "@media (max-width: 400px)": {
      width: "94%",
      paddingLeft: 16,
      paddingRight: 16,
    },
  },

  button_style: {
    width: 92,
    height: 35,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 16,
    "@media (min-width: 800px)": {
      width: 95,
      height: 40,
      borderRadius: 7,
      fontSize: 16,
      lineHeight: 20,
    },
  },

  button_close_style: {
    position: "absolute",
    right: 0,
  },
});

export default AuthScreen;
