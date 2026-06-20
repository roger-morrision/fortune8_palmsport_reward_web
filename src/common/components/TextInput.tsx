/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { TextInput as Input, StyleSheet } from "react-native";
import { CustomTextProps } from "./Text";
import { ColorName } from "@/src/constants/Colors";
import useThemeColor from "../hooks/useThemeColor";

export type TextInputProps = Input["props"] &
  CustomTextProps & {
    backgroundColor?: ColorName;
    borderColor?: ColorName;
    placeholderTextColor?: ColorName;
  };

export default function TextInput({
  backgroundColor,
  color = "text",
  borderColor = "borderColor",
  placeholderTextColor = "placeholder",
  fontFamily,
  fontSize,
  style,
  onFocus,
  onBlur,
  value,
  ...props
}: TextInputProps) {
  const [key, setKey] = useState<ColorName>(borderColor);
  const _borderColor = useThemeColor(key);

  // Retrieve themed colors
  const _color = useThemeColor(color);
  const _backgroundColor = backgroundColor ? useThemeColor(backgroundColor) : "transparent";
  const placeholderColor = useThemeColor(placeholderTextColor);

  return (
    <Input
      {...props}
      value={value ?? ""}
      onFocus={(e) => {
        setKey("primary");
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        setKey("borderColor");
        onBlur && onBlur(e);
      }}
      placeholderTextColor={placeholderColor}
      style={[
        {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: _borderColor,
          fontFamily,
          fontSize,
          color: _color,
          padding: 8,
          backgroundColor: _backgroundColor,
        },
        style,
      ]}
    />
  );
}
