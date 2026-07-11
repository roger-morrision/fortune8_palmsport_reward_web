import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { GAMBLY_URL } from "@/src/constants/Config";
import SVGIcon from "@/src/constants/SVGIcon";
import { useAssetContext } from "@/src/context/AssetContext";
import numeral from "numeral";
import React, { useMemo, useRef, useState } from "react";
import { FlatList, Image, Linking } from "react-native";
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
  const flatlist = useRef<any>(null);
  const contentOffset = useRef<any>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [isStartReached, setIsStartReached] = useState(true);

  const onPageClick = React.useCallback(
    (value: number) => {
      if (value === 1) {
        contentOffset.current += 300;
        setIsStartReached(false);
      } else if (value === -1) {
        contentOffset.current -= 300;
        setIsEndReached(false);
      }

      if (contentOffset.current >= contentWidth - 150) {
        contentOffset.current = contentWidth - 150;
        setIsEndReached(true);
      }
      if (contentOffset.current < 0) {
        contentOffset.current = 0;
        setIsStartReached(true);
      }

      flatlist.current?.scrollToOffset({
        offset: contentOffset.current,
        animated: true,
      });
    },
    [flatlist, contentWidth, contentOffset],
  );

  const onScroll = React.useCallback(
    (event: any) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      contentOffset.current = contentOffsetX;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contentOffset.current],
  );

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
        resizeMode="stretch"
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
