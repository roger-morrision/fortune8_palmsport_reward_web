import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { GAMBLY_URL } from "@/src/constants/Config";
import { useAssetContext } from "@/src/context/AssetContext";
import React from "react";
import { Image, Linking } from "react-native";
import StyleSheet from "react-native-media-query";

export default function GotoGambly() {
  const { images } = useAssetContext();

  const gotoGambly = () => Linking.openURL(GAMBLY_URL);

  return (
    <View backgroundColor="blueDark" style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.v_rewards} dataSet={{ media: ids.v_rewards }}>
        <Image
          style={styles.image_style}
          dataSet={{ media: ids.image_style }}
          source={{ uri: images?.["gambly"].uri }}
          resizeMode="contain"
        />
        <View style={styles.right_wrap}>
          <Text
            fontFamily="Montserrat-SemiBold"
            color="text"
            style={styles.t_title}
            dataSet={{ media: ids.t_title }}
          >
            Go to Gambly
          </Text>
          <Text
            fontFamily="Montserrat-Light"
            color="text"
            style={styles.t_description}
            dataSet={{ media: ids.t_description }}
          >
            Ready for an exciting gaming experience with nonstop fun and great rewards?{"\n"}At
            GAMBLY, we've crafted the perfect destination for both casual players and gaming
            enthusiasts alike.
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
              PLAY NOW
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  v_rewards: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    maxWidth: 953,
    "@media (min-width: 996px)": {
      maxWidth: 953,
    },
    "@media (max-width: 768px)": {
      padding: 0,
    },
  },
  image_style: {
    width: 193,
    height: 193,
    right: "-3%",
    transform: [{ scale: 1.2 }],
    "@media (min-width: 996px)": {
      width: 441,
      height: 421,
    },
    "@media (max-width: 768px)": {
      width: 212,
      height: 219,
      right: "-10%",
    },
  },
  right_wrap: { alignItems: "flex-start", flex: 1 },
  t_welcome: { fontSize: 15, lineHeight: 18 },
  t_title: {
    fontSize: 23,
    lineHeight: 27,
    "@media (min-width: 996px)": {
      fontSize: 36,
      lineHeight: 41,
    },
  },
  t_description: {
    fontSize: 10,
    lineHeight: 15,
    marginTop: 6,
    "@media (min-width: 996px)": {
      fontSize: 18,
      lineHeight: 25,
      marginTop: 20,
    },
  },
  button_claim: {
    width: 106,
    height: 35,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    "@media (min-width: 996px)": {
      width: 203,
      height: 65,
      marginTop: 25,
    },
  },
  t_claim: {
    fontSize: 12,
    lineHeight: 15,
    "@media (min-width: 996px)": {
      fontSize: 18,
      lineHeight: 25,
    },
  },
});
