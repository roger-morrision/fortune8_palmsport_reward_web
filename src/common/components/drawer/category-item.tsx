import Text from "@/src/common/components/Text";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import React from "react";
import StyleSheet from "react-native-media-query";
import Button from "../Button";

type Props = {
  svg: SVGName;
  name: string;
  style?: any;
  dataSet?: any;
  onPress?: () => void;
};

function CategoryItem({ svg, name, onPress, style, dataSet }: Props) {
  const iconSize = useBreakpoint({
    default: { width: 23, height: 23 },
    large: { width: 27, height: 27 },
    xlarge: { width: 27, height: 27 },
  });

  return (
    <Button
      onPress={onPress}
      style={[styles.item_container, style]}
      dataSet={dataSet || { media: ids.item_container }}
    >
      <SVGIcon name={svg} {...iconSize} />
      <Text style={styles.name_style} dataSet={{ media: ids.name_style }}>
        {name}
      </Text>
    </Button>
  );
}

const { ids, styles } = StyleSheet.create({
  item_container: {
    paddingHorizontal: 13,
    gap: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 56,
  },
  name_style: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    lineHeight: 16,
    "@media (min-width: 800px)": {
      fontSize: 16.3,
      lineHeight: 18,
    },
  },
});

export default CategoryItem;
