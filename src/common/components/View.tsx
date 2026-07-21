/* eslint-disable react-hooks/rules-of-hooks */
// Import necessary modules and hook
import { AnyColor } from "@/src/constants/Colors";
import { View as DefaultView } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

export type ViewProps = DefaultView["props"] & {
  backgroundColor?: AnyColor;
  borderColor?: AnyColor;
};

// Define the ThemedView component, a view with a background color based on the theme
export default function View(props: ViewProps) {
  const { style, backgroundColor, borderColor, ...otherProps } = props;

  // Retrieve the background color based on the theme
  const color = backgroundColor ? useThemeColor(backgroundColor) : "transparent";
  const _borderColor = borderColor ? useThemeColor(borderColor) : "transparent";

  return (
    <DefaultView
      style={[{ backgroundColor: color, borderColor: _borderColor }, style]}
      {...otherProps}
    />
  );
}
