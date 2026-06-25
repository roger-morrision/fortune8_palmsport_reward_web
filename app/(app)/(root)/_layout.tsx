import HeaderAuthScreen from "@/src/common/components/header/header-auth";
import Colors from "@/src/constants/Colors";
import { NativeStackNavigationOptions, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.dark.background,
        },
        animation: "slide_from_left",
        headerShadowVisible: false,
        header: () => <HeaderAuthScreen />,
      }}
    >
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)/auth/login" options={getTransitionModalOptions()} />
      <Stack.Screen name="(modal)/inbox" options={getTransitionModalOptions()} />
      <Stack.Screen name="(modal)/how-it-works" options={getTransitionModalOptions()} />
      <Stack.Screen name="(modal)/kyc-verification-result" options={getTransitionModalOptions()} />
      <Stack.Screen
        name="(modal)/redeem-verification-required"
        options={getTransitionModalOptions()}
      />
    </Stack>
  );
}

export const getTransitionModalOptions = (): NativeStackNavigationOptions => ({
  presentation: "transparentModal",
  headerShown: false,
  contentStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)", // Translucent black background
  },
});
