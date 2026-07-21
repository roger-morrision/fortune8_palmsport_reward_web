/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { TextInput as Input, NativeSyntheticEvent, Platform, StyleSheet, TextInputChangeEventData } from "react-native";
import { CustomTextProps } from "./Text";
import { AnyColor } from "@/src/constants/Colors";
import useThemeColor from "../hooks/useThemeColor";

export type TextInputProps = Input["props"] &
  CustomTextProps & {
    backgroundColor?: AnyColor;
    borderColor?: AnyColor;
    placeholderTextColor?: AnyColor;
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
  onChange,
  onChangeText,
  value,
  ...props
}: TextInputProps) {
  const [key, setKey] = useState<AnyColor>(borderColor);
  const _borderColor = useThemeColor(key);

  const _color = useThemeColor(color);
  const _backgroundColor = backgroundColor ? useThemeColor(backgroundColor) : "transparent";
  const placeholderColor = useThemeColor(placeholderTextColor);

  // On web, browsers autofill by writing directly to the DOM .value — React's
  // controlled `value` prop overrides it back to "" on the next render, so the
  // filled text disappears. We intercept the native `onChange` event and forward
  // the real DOM value through onChangeText so Redux state stays in sync.
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (Platform.OS === "web") {
      const nativeValue = (e.nativeEvent as any).target?.value ?? e.nativeEvent.text;
      if (nativeValue !== value) onChangeText?.(nativeValue);
    }
    onChange?.(e);
  };

  return (
    <Input
      {...props}
      value={value ?? ""}
      onChange={handleChange}
      onChangeText={onChangeText}
      onFocus={(e) => {
        setKey("primary");
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        // Capture autofilled value on blur in case onChange never fired
        if (Platform.OS === "web") {
          const nativeValue = (e.nativeEvent as any).target?.value;
          if (nativeValue && nativeValue !== value) onChangeText?.(nativeValue);
        }
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
          ...(Platform.OS === "web" ? {
            // Override browser autofill background with an inset shadow in the
            // actual background color — the only reliable way to beat :-webkit-autofill.
            WebkitBoxShadow: `0 0 0px 1000px ${_backgroundColor} inset`,
            WebkitTextFillColor: _color,
          } as any : {}),
        },
        style,
      ]}
    />
  );
}
