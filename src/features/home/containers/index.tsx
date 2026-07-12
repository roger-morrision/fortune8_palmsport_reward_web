import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import React, { useRef, useState } from "react";
import { Image } from "react-native";
import { ids, styles } from "./styles.css";

type Props = {
  mainBlock: {
    description: string;
    image: string;
  },
  subBlock1: {
    description: string;
    image: string;
  },
  subBlock2: {
    description: string;
    image: string;
  },
  subBlock3: {
    description: string;
    image: string;
  },
}

function FeatureGames(props: Props) {
  return (
    <View style={styles.categories_container} dataSet={{ media: ids.categories_container }}>
      <View style={styles.category_row} dataSet={{ media: ids.category_row }}>
        <RenderItem item={props.subBlock1} />
        <RenderItem item={props.subBlock2} />
        <RenderItem item={props.subBlock3} />
      </View>
      <View style={{ height: 50 }} />
    </View>
  );
}

function RenderItem({ item }: any) {

  return (
    <View
      backgroundColor="secondary"
      style={styles.category_item_container}
      dataSet={{ media: ids.category_item_container }}
    >
      <Image
        style={styles.image_banner}
        dataSet={{ media: ids.image_banner }}
        source={{ uri: item?.image }}
        resizeMode="contain"
      />
      <View style={{ gap: 10 }}>
        <Text style={styles.title_style} dataSet={{ media: ids.title_style }}>
          {item?.description}
        </Text>
      </View>
    </View>
  );
}

export default FeatureGames;
