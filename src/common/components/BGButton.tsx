import { ReactNode, useState } from "react";
import { ColorName } from "@/src/constants/Colors";
import { FontFamily } from "@/src/constants/Fonts";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import {
  ColorValue,
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import ActivityIndicator from "./ActivityIndicator";
import Button from "./Button";
import Text from "./Text";

type Props = {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  outerLinearStyle?: StyleProp<ViewStyle>;
  innerLinearStyle?: StyleProp<ViewStyle>;
  textColor?: ColorName;
  fontFamily?: FontFamily;
  isLoading?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  disabled?: boolean;
  strokeColors?: [ColorValue, ColorValue, ...ColorValue[]];
  strokeLocations?: [number, number, ...number[]] | null;
  bgColors?: [ColorValue, ColorValue, ...ColorValue[]];
  bgLocations?: [number, number, ...number[]] | null;
  innerStart?: LinearGradientPoint | null;
  innerEnd?: LinearGradientPoint | null;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: ReactNode;
  dataSet?: Record<string, string>;
};

function BGButton(props: Props) {
  const [borderRadius, setBorderRadius] = useState(15);
  const { strokeLocations = [0, 0.5, 1], bgLocations = [0, 1] } = props;
  const {
    borderWidth = 2,
    textColor = "textDark",
    fontFamily = "Montserrat-SemiBold",
    strokeColors = ["#E4C234", "#FFFFAAE3", "#E08A14"],
    bgColors = ["#DF7B0B", "#E5D33D"],
    ...rest
  } = props;

  return (
    <Button
      {...rest}
      style={[props.style]}
      onPress={props.onPress}
      onLayout={(e: LayoutChangeEvent) => setBorderRadius(e.nativeEvent.layout.height * 0.15)}
    >
      <LinearGradient
        colors={strokeColors}
        locations={strokeLocations}
        style={[
          styles.linear_container,
          { padding: borderWidth, borderRadius: props.borderRadius || borderRadius },
          props.outerLinearStyle,
        ]}
      >
        <LinearGradient
          colors={bgColors}
          locations={bgLocations}
          start={props.innerStart}
          end={props.innerEnd}
          style={[
            styles.body_container,
            { padding: borderWidth, borderRadius: props.borderRadius || borderRadius },
            props.innerLinearStyle,
          ]}
        >
          {props.isLoading ? (
            <ActivityIndicator color={textColor} size="small" animating />
          ) : (
            (props.children ?? (
              <Text
                selectable={false}
                color={textColor}
                fontFamily={fontFamily}
                style={props.labelStyle}
              >
                {props.label}
              </Text>
            ))
          )}
        </LinearGradient>
      </LinearGradient>
    </Button>
  );
}

const styles = StyleSheet.create({
  linear_container: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    padding: "1%",
    alignItems: "center",
    justifyContent: "center",
  },
  body_container: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BGButton;
