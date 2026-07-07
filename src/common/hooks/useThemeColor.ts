import Colors from "@/src/constants/Colors";
import useColorScheme from "./useColorScheme";

// Define a custom hook for accessing theme colors
export default function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  // Retrieve the current color scheme from the app
  const theme = useColorScheme();

  const safeTheme: "dark" | "light" = theme === "dark" || theme === "light" ? theme : "dark";
  return Colors[safeTheme][colorName];
}
