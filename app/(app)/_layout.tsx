/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { apiClient } from "@/src/api/client";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import ScreenTitle from "@/src/common/components/header/screen-title";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import useColorScheme from "@/src/common/hooks/useColorScheme";
import useThemeColor from "@/src/common/hooks/useThemeColor";
import Fonts from "@/src/constants/Fonts";
import ImageAssets, { ImageKey, Images, NamedAssets } from "@/src/constants/Images";
import Styles from "@/src/constants/Styles";
import { AssetContext } from "@/src/context/AssetContext";
import HomeProvider from "@/src/context/HomeContext";
import RootProvider from "@/src/context/RootContext";
import { useLobbyService } from "@/src/store/hooks";
import {
  selectAuthLoggedIn,
  selectedAuthRefreshToken,
  selectedAuthToken,
} from "@/src/store/slices/auth.slice";
import store, { persistor } from "@/src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, SplashScreen, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

export default function () {
  const [stateLoaded, setStateLoaded] = useState(false);
  const [fontsLoaded] = useFonts(Fonts);
  const [assets] = useAssets(ImageAssets);

  // Callback function to hide the splash screen when layout is triggered
  const onLayout = useCallback(() => {
    SplashScreen.hideAsync();
    document.title = "Gambly";
  }, []);

  // Callback function executed before the persist gate is lifted
  const onBeforeLimit = useCallback(() => setStateLoaded(true), []);

  const namedAssets = useMemo<NamedAssets | null>(() => {
    if (!assets) return null;

    const map = {} as NamedAssets;
    const keys = Object.keys(Images) as ImageKey[];

    keys.forEach((img: ImageKey, index: number) => {
      map[img] = assets[index];
    });

    return map;
  }, [assets]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor} onBeforeLift={onBeforeLimit}>
          {fontsLoaded && namedAssets && stateLoaded ? (
            <AssetContext.Provider value={{ images: namedAssets }}>
              <GestureHandlerRootView onLayout={onLayout} style={Styles.flex}>
                <RootProvider>
                  <HomeProvider>
                    <RootLayout />
                  </HomeProvider>
                </RootProvider>
              </GestureHandlerRootView>
            </AssetContext.Provider>
          ) : (
            <View backgroundColor="background" style={{ flex: 1 }}>
              <ActivityIndicator animating size={"large"} color="text" style={{ marginTop: 20 }} />
            </View>
          )}
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

function RootLayout() {
  const colorScheme = useColorScheme();
  const { onLobbyRequest } = useLobbyService();
  const token = useAppSelector(selectedAuthToken);
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const navigationBarColor = useThemeColor("background");
  const refreshToken = useAppSelector(selectedAuthRefreshToken);

  // 1. Sync token
  useEffect(() => {
    apiClient.setTokens(token, refreshToken);
  }, [token, refreshToken]);

  // 3. Initial lobby (guest)
  useEffect(() => {
    onLobbyRequest();
  }, [isLoggedIn]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Set the status bar style based on the color scheme */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarColor,
          animation: "slide_from_left",
          header: (props) => <ScreenTitle {...props} />,
        }}
      />
    </ThemeProvider>
  );
}
