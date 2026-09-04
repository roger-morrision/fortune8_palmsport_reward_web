import React, { memo } from "react";
import { Image, ImageSourcePropType, ImageStyle, Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { ids, styles } from "./styles.css";

type CustomCellProps = {
  value: string;
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  disabled?: boolean;
  onPress?: () => void;
};

const CustomCell = (props: CustomCellProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      disabled={!props.disabled}
      style={[styles.v_center, props.style]}
      dataSet={{ media: ids.v_center }}
    >
      <Image source={props.source} style={props.iconStyle} resizeMode="contain" />
      <Text numberOfLines={2} style={props.textStyle}>
        {props.value}
      </Text>
    </Pressable>
  );
};

export default memo(CustomCell);
