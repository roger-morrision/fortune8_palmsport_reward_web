import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useAssetContext } from "@/src/context/AssetContext";
import React from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

export default function PalmsPlayRewards() {
  const { images } = useAssetContext();

  return (
    <View backgroundColor="blueDark" style={styles.v_rewards} dataSet={{ media: ids.v_rewards }}>
      <Image
        style={styles.image_style}
        source={{ uri: images?.["bitcoin-banner"].uri }}
        resizeMode="contain"
      />
      <Image
        style={styles.i_coming_soon_style}
        source={{ uri: images?.["coming-soon"].uri }}
        resizeMode="stretch"
      />
      <View style={styles.right_wrap}>
        <Text fontFamily="Montserrat-SemiBold" color="yellow" style={styles.t_rewards}>
          Crypto Redemption – Coming Soon
        </Text>
        <Text fontFamily="Montserrat" color="text" style={styles.t_description}>
          Turn your SweepsCoins into crypto and unlock a new way to get rewarded. Exchange your
          coins and watch your crypto balance grow.
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_rewards: {
    alignItems: "center",
    justifyContent: "center",
    padding: 17,
    borderRadius: 10,
    paddingBottom: 40,
    "@media (min-width: 996px)": {
      flex: 1,
    },
  },
  image_style: { width: "100%", height: 150 },
  i_coming_soon_style: { width: 133.4, height: 34.5, position: "absolute", top: 0, right: 0 },
  right_wrap: { flex: 1, alignItems: "center", marginTop: 25 },
  t_rewards: { fontSize: 21, lineHeight: 27 },
  t_description: {
    fontSize: 13.44,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: "80%",
    textAlign: "center",
  },
});
