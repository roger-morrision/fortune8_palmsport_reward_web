import Colors, { AnyColor } from "@/src/constants/Colors";
import useColorScheme from "./useColorScheme";

export type { AnyColor };

export default function useThemeColor(colorName: AnyColor): string {
  const theme = useColorScheme();
  const safeTheme: "dark" | "light" = theme === "dark" || theme === "light" ? theme : "dark";
  const palette = Colors[safeTheme] as Record<string, string>;
  return palette[colorName] ?? colorName;
}
