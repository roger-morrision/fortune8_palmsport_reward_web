import { Platform } from "react-native";

// On web, Montserrat is loaded via Google Fonts in +html.tsx — no local files needed.
// On native, we still require the local TTF files (Google Fonts CSS doesn't apply to native).
const NativeFonts = {
  "Montserrat": require("@/assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Light": require("@/assets/fonts/Montserrat-Light.ttf"),
  "Montserrat-Medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
  "Montserrat-Black": require("@/assets/fonts/Montserrat-Black.ttf"),
  "Montserrat-SemiBold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
  "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
};

// On web, fonts are loaded via Google Fonts CSS in +html.tsx — useFonts receives nothing.
const Fonts: typeof NativeFonts = Platform.OS === "web" ? ({} as typeof NativeFonts) : NativeFonts;

export type FontFamily =
  | "Montserrat"
  | "Montserrat-Light"
  | "Montserrat-Medium"
  | "Montserrat-Bold"
  | "Montserrat-Black"
  | "Montserrat-SemiBold"
  | "Montserrat-ExtraBold";

export default Fonts;
