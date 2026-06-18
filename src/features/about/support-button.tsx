import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import { useAssetContext } from "@/src/context/AssetContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

function SupportButton() {
  const router = useRouter();
  const { page } = useLocalSearchParams();
  const { images } = useAssetContext();

  const onPress = () => router.push("/contact-support");

  return (
    <Button
      onPress={onPress}
      backgroundColor="blueDark"
      style={styles.button_support}
      dataSet={{ media: ids.button_support }}
    >
      <Image
        style={styles.i_headphone}
        dataSet={{ media: ids.i_headphone }}
        source={{ uri: images?.headphone?.uri }}
        resizeMode="stretch"
      />
      <Text
        style={styles.button_label}
        fontFamily="PoppinsBold"
        dataSet={{ media: ids.button_label }}
      >
        Contact Support
      </Text>

      <Image
        style={styles.i_sent_small}
        dataSet={{ media: ids.i_sent_small }}
        source={{ uri: images?.send?.uri }}
        resizeMode="stretch"
      />
      <Image
        style={styles.i_sent_big}
        dataSet={{ media: ids.i_sent_big }}
        source={{ uri: images?.send?.uri }}
        resizeMode="stretch"
      />
    </Button>
  );
}

const { ids, styles } = StyleSheet.create({
  button_support: {
    width: "100%",
    height: 104,
    marginTop: 54,
    overflow: "hidden",
    borderRadius: 10.41,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      marginTop: 20,
    },
  },
  i_headphone: {
    width: 67,
    height: 67,
    position: "absolute",
    left: 14,
  },
  i_sent_small: {
    width: 67.6,
    height: 67.6,
    top: -30,
    position: "absolute",
    right: 270.4,
    "@media (max-width: 800px)": {
      width: 39.58,
      height: 39.58,
      top: -20,
      right: 123.62,
    },
  },
  i_sent_big: {
    width: 119,
    height: 119,
    top: 11,
    position: "absolute",
    right: -11,
    "@media (max-width: 800px)": {
      top: 16.18,
      right: -37,
    },
  },
  button_label: {
    fontSize: 26,
    lineHeight: 30,
    "@media (max-width: 800px)": {
      fontSize: 24.36,
      lineHeight: 29,
    },
  },
});

export default SupportButton;
