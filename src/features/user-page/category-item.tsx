import Text from "@/src/common/components/Text";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { styles } from "./styles.css";

type Props = {
  svg: SVGName;
  name: string;
  style?: ViewStyle;
  onPress?: () => void;
  dataSet?: Record<string, string>;
};

function CategoryItem({ svg, name, onPress, style, dataSet }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.item_container, style]} dataSet={dataSet}>
      <SVGIcon name={svg} />
      <Text style={styles.name_style}>{name}</Text>
    </Pressable>
  );
}

export default CategoryItem;
