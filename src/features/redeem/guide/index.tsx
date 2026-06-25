import Screen from "@/src/common/components/Screen";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { REDEEM_GUIDELINES } from "@/src/constants/Objects";
import SVGIcon from "@/src/constants/SVGIcon";
import React, { useState } from "react";
import { FlatList, LayoutChangeEvent } from "react-native";
import StyleSheet from "react-native-media-query";
import RewardItem from "./item";

function Guide() {
  const [fullWidth, setFullWidth] = useState<number>(100);
  const iconSize = useBreakpoint({
    default: { width: 20, height: 13 },
    xlarge: { width: 31, height: 21 },
    large: { width: 29, height: 20 },
  });

  return (
    <Screen style={styles.main} dataSet={{ media: ids.main }}>
      <View style={styles.container}>
        <Text
          fontFamily="Montserrat-Bold"
          style={styles.text_style}
          dataSet={{ media: ids.text_style }}
        >
          Easy, fast, and secure SweepSCoins redemption
        </Text>
        <FlatList
          horizontal
          data={REDEEM_GUIDELINES}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, key) => key.toString()}
          onLayout={(e: LayoutChangeEvent) => setFullWidth(e.nativeEvent.layout.width)}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => (
            <View style={{ justifyContent: "center", marginHorizontal: 4 }}>
              <SVGIcon name="tierlevel-double-arrow" {...iconSize} />
            </View>
          )}
          renderItem={({ item, index }) => (
            <RewardItem
              key={index.toString()}
              {...item}
              fullWidth={fullWidth}
              iconSize={iconSize}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const { ids, styles } = StyleSheet.create({
  main: {
    width: "100%",
    marginTop: 20,
    maxWidth: 969,
    paddingHorizontal: 25,
    alignSelf: "center",
    "@media (min-width: 800px)": {
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: 40,
      // maxHeight: 74,
    },
  },
  contentContainerStyle: {
    alignItems: "center",
    marginTop: 35,
    marginBottom: 40,
    "@media (min-width: 800px)": {
      marginBottom: 0,
    },
  },
  text_style: {
    fontSize: 18,
    lineHeight: 23,
    width: "65%",
    textAlign: "center",
    alignSelf: "center",
    "@media (min-width: 800px)": {
      width: "100%",
      fontSize: 22,
      lineHeight: 27,
    },
  },
  container: {
    gap: 25,
  },
});

export default Guide;
