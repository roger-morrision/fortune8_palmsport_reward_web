// Import necessary modules and hook
import { ColorName } from "@/src/constants/Colors";
import { ActivityIndicator as DefaultActivityIndicator } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

export type ViewProps = DefaultActivityIndicator["props"] & {
  color?: ColorName;
};

// Define the ThemedView component, a view with a background color based on the theme
export default function ActivityIndicator(props: ViewProps) {
  const { style, color, ...otherProps } = props;

  // Retrieve the background color based on the theme
  const _color = color ? useThemeColor(color) : "transparent";

  return (
    <DefaultActivityIndicator
      animating
      color={_color}
      style={[style]}
      size={"small"}
      {...otherProps}
    />
  );
}
