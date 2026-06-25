import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { GAMBLY_URL } from "@/src/constants/Config";
import { useAssetContext } from "@/src/context/AssetContext";
import React from "react";
import { Image, Linking } from "react-native";
import StyleSheet from "react-native-media-query";

export default function PlayRedeem() {
  const { images } = useAssetContext();

  const gotoGambly = () => Linking.openURL(GAMBLY_URL);

  return (
    <View style={styles.v_rewards} dataSet={{ media: ids.v_rewards }}>
      <View style={styles.right_wrap}>
        <Text
          fontFamily="Montserrat-SemiBold"
          color="yellow"
          style={styles.t_rewards}
          dataSet={{ media: ids.t_rewards }}
        >
          PLAY & REDEEM
        </Text>
        <Text
          fontFamily="Montserrat"
          color="text"
          style={styles.t_description}
          dataSet={{ media: ids.t_description }}
        >
          Play your favourite games{"\n"}now at Gambly!
        </Text>
        <Button
          onPress={gotoGambly}
          backgroundColor="button"
          style={styles.button_claim}
          dataSet={{ media: ids.button_claim }}
        >
          <Text
            color="textDark"
            fontFamily="Montserrat-Bold"
            style={styles.t_claim}
            dataSet={{ media: ids.t_claim }}
          >
            Go to Gambly
          </Text>
        </Button>
      </View>
      <Image
        style={styles.image_style}
        dataSet={{ media: ids.image_style }}
        source={{ uri: images?.["drawer-img-1"].uri }}
        resizeMode="contain"
      />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_rewards: {
    width: "100%",
    height: 231,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    "@media (min-width: 800px)": {
      height: 510,
      gap: 70,
    },
  },
  right_wrap: { alignItems: "center", zIndex: 1 },
  t_rewards: {
    fontSize: 23,
    lineHeight: 27,
    "@media (min-width: 800px)": {
      fontSize: 56,
      lineHeight: 61,
    },
  },
  t_description: {
    fontSize: 10,
    lineHeight: 18,
    marginTop: 6,
    textAlign: "center",
    "@media (min-width: 800px)": {
      fontSize: 22,
      lineHeight: 30,
    },
  },
  button_claim: {
    width: 128,
    height: 37,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4.48,
    "@media (min-width: 800px)": {
      width: 252,
      height: 70,
      marginTop: 30,
      borderRadius: 10,
    },
  },
  t_claim: {
    fontSize: 11.2,
    lineHeight: 15,
    "@media (min-width: 800px)": {
      fontSize: 20,
      lineHeight: 24,
    },
  },
  image_style: {
    width: 190,
    height: 200,
    transform: [{ scale: 1.4 }],
    "@media (min-width: 800px)": {
      width: 507,
      height: 517,
      transform: [{ scale: 1 }],
    },
  },
});
