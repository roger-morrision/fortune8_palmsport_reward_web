import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useAssetContext } from "@/src/context/AssetContext";
import React from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

export default function CashBack() {
  const { images } = useAssetContext();

  return (
    <View backgroundColor="blueDark" style={styles.v_rewards} dataSet={{ media: ids.v_rewards }}>
      <Image
        style={{ width: "100%", height: 150 }}
        source={{ uri: images?.["cash-back"].uri }}
        resizeMode="contain"
      />
      <View style={styles.right_wrap}>
        <Text fontFamily="PoppinsSemiBold" color="yellow" style={styles.t_rewards}>
          Cash Back Bonanza
        </Text>
        <Text fontFamily="PoppinsRegular" color="text" style={styles.t_description}>
          Your play deserves to be rewarded in cash. Exchange your Sweeps Coins for cash and watch
          your earnings grow giving you even more reasons to play and earn.
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  //
  v_rewards: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 17,
    borderRadius: 10,
    paddingBottom: 40,
    "@media (min-width: 996px)": {
      flex: 1,
    },
  },
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
