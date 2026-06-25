// Import necessary modules and constants
import { ColorName } from "@/src/constants/Colors";
import { FontFamily } from "@/src/constants/Fonts";
import { Text as DefaultText, TextProps } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

// Define props for the custom Text component
export type CustomTextProps = TextProps & {
  fontFamily?: FontFamily;
  color?: ColorName;
  fontSize?: number;
  backgroundColor?: ColorName;
};

// Define the custom Text component
export default function Text({
  style,
  fontFamily = "Montserrat",
  color = "text",
  backgroundColor = "transparent",
  fontSize,
  ...props
}: CustomTextProps) {
  // Apply themed color based on the specified color name
  const _color = useThemeColor(color);
  const _background = useThemeColor(backgroundColor);

  // Render the custom Text component with customizable styles
  return (
    <DefaultText
      style={[{ color: _color, fontFamily, fontSize, backgroundColor: _background }, style]}
      {...props}
    />
  );
}
