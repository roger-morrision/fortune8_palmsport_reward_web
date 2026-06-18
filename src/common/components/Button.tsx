import useThemeColor from "../hooks/useThemeColor";
import { ViewProps } from "./View";
import { Pressable, TouchableWithoutFeedbackProps } from "react-native";

export default function Button({
  style,
  backgroundColor,
  borderColor,
  ...props
}: TouchableWithoutFeedbackProps & ViewProps) {
  // Retrieve the background color based on the theme
  const color = backgroundColor ? useThemeColor(backgroundColor) : "transparent";

  const _borderColor = borderColor ? useThemeColor(borderColor) : "transparent";

  return (
    <Pressable
      {...props}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: color,
          borderColor: _borderColor,
        },
        style,
      ]}
    />
  );
}
