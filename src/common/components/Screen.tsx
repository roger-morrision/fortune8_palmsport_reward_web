// Import necessary modules and type for ViewProps.
import { ViewProps } from "react-native";
import View from "./View";
import { AnyColor } from "../hooks/useThemeColor";

type Props = {
  backgroundColor?: AnyColor;
} & ViewProps;

// Create a Screen component that fills available space.
export default function Screen({ style, backgroundColor = "background", ...props }: Props) {
  return (
    <View
      backgroundColor={backgroundColor} // Set the background color.
      style={[{ flex: 1 }, style]} // Apply flex styling.
      {...props}
    />
  );
}
