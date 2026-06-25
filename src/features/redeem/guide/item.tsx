import SVGText from "@/src/common/components/SVGText";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { ImageKey } from "@/src/constants/Images";
import { useAssetContext } from "@/src/context/AssetContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  step: string;
  description: string;
  source: ImageKey;
  fullWidth: number;
  iconSize: any;
};

function Item(props: Props) {
  const { images } = useAssetContext();
  const { ITEM_WIDTH, ITEM_HEIGHT, FONT_SIZE, LINE_HEIGHT } = useMemo(() => {
    const dividerWidth = (props.iconSize.width + 8) * 2;
    const ITEM_WIDTH = (props.fullWidth - dividerWidth) / 3;

    return {
      ITEM_WIDTH,
      ITEM_HEIGHT: ITEM_WIDTH * 0.57,
      FONT_SIZE: ITEM_WIDTH * 0.08,
      LINE_HEIGHT: ITEM_WIDTH * 0.1,
    };
  }, [props.fullWidth, props.iconSize]);

  const config = useBreakpoint({
    default: { fontSize: ITEM_WIDTH * 0.3, stroke: ITEM_WIDTH * 0.04 },
    mobile: { fontSize: ITEM_WIDTH * 0.45, stroke: ITEM_WIDTH * 0.08 },
    tablet: { fontSize: ITEM_WIDTH * 0.45, stroke: ITEM_WIDTH * 0.08 },
  });

  return (
    <View
      style={[styles.container, { width: ITEM_WIDTH, height: ITEM_HEIGHT }]}
      dataSet={{ media: ids.container }}
    >
      <SVGText
        text={props.step}
        style={styles.steps_style}
        dataSet={{ media: ids.steps_style }}
        strokeWidth={config.stroke}
        fontSize={config.fontSize}
        fontFamily="Montserrat-Bold"
        strokeColors={["#102268", "#102268"]}
        fillColors={["#FFEEB8", "#CCA016"]}
        offsetFillColors={[0, 1]}
      />
      <View style={styles.body_container} dataSet={{ media: ids.body_container }}>
        <LinearGradient
          colors={["#2B4EFF7B", "#2B4EFF0A", "#2B4EFF0A"]}
          style={[styles.linear_container]}
        />
        <Text
          fontFamily="Montserrat-Bold"
          style={[
            styles.tier_style,
            { fontSize: FONT_SIZE, lineHeight: LINE_HEIGHT, bottom: ITEM_HEIGHT * 0.1 },
          ]}
          dataSet={{ media: ids.tier_style }}
          color="text"
        >
          {props.description}
        </Text>
        <Image
          style={styles.i_coin_style}
          dataSet={{ media: ids.i_coin_style }}
          source={{ uri: images?.[props.source].uri }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    "@media (min-width: 800px)": {
      maxHeight: 74,
    },
  },
  linear_container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 4.7,
  },
  body_container: {
    borderRadius: 4.7,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    "@media (min-width: 800px)": {
      width: "80%",
      left: "20%",
      paddingLeft: 0,
      paddingRight: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      // alignItems: "flex-start",
      // backgroundColor: "red"
    },
  },
  steps_style: {
    marginTop: "-25%",
    position: "absolute",
    zIndex: 3,
    "@media (min-width: 800px)": {
      // position: "relative",
      marginTop: "-10%",
      left: "-17%",
    },
  },
  i_coin_style: {
    width: 85,
    height: 57,
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  tier_style: {
    fontSize: 9,
    width: "90%",
    textAlign: "center",
    position: "absolute",
    bottom: 12,
    "@media (min-width: 800px)": {
      position: "relative",
      fontSize: 11,
      lineHeight: 14,
      bottom: 0,
      width: "50%",
      left: "10%",
      textAlign: "left",
    },
  },
});

export default Item;
