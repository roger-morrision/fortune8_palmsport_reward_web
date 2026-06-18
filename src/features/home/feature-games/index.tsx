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
import { useQueryApi } from "@/src/common/hooks/useQueryApi";
import { PurchaseService } from "@/src/api/services/purchase.service";
import { Product } from "@/src/store/types";
import { getAvailableHotDealsProducts } from "@/src/common/utils/transform-helper";

function FeatureGames() {
  const flatlist = useRef<any>(null);
  const contentOffset = useRef<any>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [isStartReached, setIsStartReached] = useState(true);

  const { data } = useQueryApi(["products"], PurchaseService.products, null, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const products: Product[] = React.useMemo(() => {
    return getAvailableHotDealsProducts(data);
  }, [data]);

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
      <View style={styles.v_controller} dataSet={{ media: ids.v_controller }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <SVGIcon name="gift" />
          <Text style={styles.header_title_style}>Hot Deals</Text>
        </View>
        <View style={styles.v_row}>
          <MaterialIcon
            onPress={() => onPageClick(-1)}
            asButton
            size={30}
            borderRadius={6}
            style={styles.btn_arrow_style}
            backgroundColor={isStartReached ? "backgroundDark" : "secondary"}
            name="chevron-left"
          />
          <MaterialIcon
            onPress={() => onPageClick(1)}
            asButton
            size={30}
            borderRadius={6}
            backgroundColor={isEndReached ? "backgroundDark" : "secondary"}
            style={styles.btn_arrow_style}
            name="chevron-right"
          />
        </View>
      </View>
      <FlatList
        horizontal
        data={products}
        ref={flatlist}
        onScroll={onScroll}
        style={styles.flatlist}
        dataSet={{ media: ids.flatlist }}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.9}
        onContentSizeChange={setContentWidth}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item, index }) => <RenderItem key={index.toString()} item={item} />}
      />
      <View style={{ height: 50 }} />
    </View>
  );
}

function RenderItem({ item }: any) {
  const { images } = useAssetContext();

  const handleClickItem = () => {
    Linking.openURL(GAMBLY_URL + "/hot-deals-page");
  };

  const URI = useMemo(() => {
    switch (item.name) {
      case "gwz_3.00_3m_silv":
        return "product-starter-pack";
      case "gwz_4.00_4m_silv":
        return "product-cheap-tuesday";
      case "gwz_7.00_8m_silv":
        return "product-weekly-booster";
      case "gwz_11.00_13m_silv":
        return "product-high-roller";
      case "gwz_7.00_7m_silv":
        return "product-tgif";
      case "gwz_20.00_25m_silv":
        return "product-dragon-roller";
      default:
        return "product-dragon-roller";
    }
  }, [item.name]);

  return (
    <Button
      onPress={handleClickItem}
      backgroundColor="secondary"
      style={styles.category_item_container}
      dataSet={{ media: ids.category_item_container }}
    >
      <Image
        style={styles.image_banner}
        dataSet={{ media: ids.image_banner }}
        source={{ uri: images?.[URI]?.uri }}
        resizeMode="stretch"
      />
      <View style={{ gap: 10 }}>
        <Text style={styles.title_style} dataSet={{ media: ids.title_style }}>
          {item.description}
        </Text>
        <Text style={styles.description_style} dataSet={{ media: ids.description_style }}>
          {numeral(item.value).format("0,000")} Sil Coins with free {item.goldBonus} Bonus Gold
        </Text>
      </View>
    </Button>
  );
}

export default FeatureGames;
