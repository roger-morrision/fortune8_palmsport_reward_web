import { AnyColor } from "@/src/constants/Colors";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  Platform,
  Pressable,
  PressableProps,
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import useThemeColor from "../hooks/useThemeColor";

export type IconProps = {
  color?: AnyColor;
  backgroundColor?: AnyColor;
  size?: number;
  asButton?: boolean;
  borderRadius?: number;
  activeOpacity?: number;
} & TouchableHighlightProps &
  PressableProps;

// Factory function to create custom icon components.
function createIcon<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
  FontFamily: any,
) {
  return ({
    name,
    size = 24,
    color = "text",
    backgroundColor = "background",
    borderRadius,
    asButton,
    style,
    ...props
  }: IconProps & { name: ComponentProps<T>["name"] }) => {
    // Calculate colors for the icon and its container.
    const iconColor = useThemeColor(color);
    const containerColor = useThemeColor(backgroundColor);

    // Determine the underlay color for touchable components.
    const underlayColor = iconColor + "20";

    // Calculate container size and style.
    const containerSize = size + 6;
    const containerStyle: ViewStyle = {
      height: containerSize,
      width: containerSize,
      borderRadius,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: asButton ? containerColor : "transparent",
    };

    // Define the IconComponent.
    const IconComponent = () => <FontFamily color={iconColor} name={name} size={size} />;

    // Return the icon component as a TouchableOpacity or TouchableHighlight.
    return (
      <Animated.View style={style}>
        {asButton ? (
          <Pressable {...props} style={containerStyle}>
            <IconComponent />
          </Pressable>
        ) : (
          <TouchableHighlight {...props} underlayColor={underlayColor} style={containerStyle}>
            <IconComponent />
          </TouchableHighlight>
        )}
      </Animated.View>
    );
  };
}

// Material Symbols (Google CSS font — web only, loaded via <link> in +html.tsx)
type MaterialSymbolProps = {
  name: string;
  size?: number;
  color?: AnyColor;
  style?: React.CSSProperties;
};

export function MaterialSymbol({ name, size = 24, color = "text", style }: MaterialSymbolProps) {
  const iconColor = useThemeColor(color);
  if (Platform.OS !== "web") return null;
  return React.createElement("span", {
    className: "material-symbols-outlined",
    style: {
      fontSize: size,
      color: iconColor,
      userSelect: "none",
      lineHeight: 1,
      ...style,
    },
    children: name,
  });
}

// Export various custom icon components with corresponding font families.
export const Ionicon = createIcon<typeof Ionicons>(Ionicons);
export const MaterialIcon = createIcon<typeof MaterialIcons>(MaterialIcons);
export const FeatherIcon = createIcon<typeof Feather>(Feather);
export const FontAwesomeIcon = createIcon<typeof FontAwesome>(FontAwesome);
export const MaterialCommunityIcon =
  createIcon<typeof MaterialCommunityIcons>(MaterialCommunityIcons);
