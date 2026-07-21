import { AnyColor } from "@/src/constants/Colors";
import { FontFamily } from "@/src/constants/Fonts";
import { Text as DefaultText, TextProps } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

export type CustomTextProps = TextProps & {
  fontFamily?: FontFamily;
  color?: AnyColor;
  fontSize?: number;
  backgroundColor?: AnyColor;
};

export default function Text({
  style,
  fontFamily = "Montserrat",
  color = "text",
  backgroundColor = "transparent",
  fontSize,
  ...props
}: CustomTextProps) {
  const _color = useThemeColor(color);
  const _background = useThemeColor(backgroundColor);

  return (
    <DefaultText
      style={[{ color: _color, fontFamily, fontSize, backgroundColor: _background }, style]}
      {...props}
    />
  );
}
