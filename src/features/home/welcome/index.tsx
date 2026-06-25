import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

export default function Welcome() {
  const router = useRouter();
  const { images } = useAssetContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  return (
    <View style={styles.v_rewards} dataSet={{ media: ids.v_rewards }}>
      <Image
        style={styles.image_style}
        dataSet={{ media: ids.image_style }}
        source={{ uri: images?.["gift"].uri }}
        resizeMode="contain"
      />
      <View style={styles.right_wrap} dataSet={{ media: ids.right_wrap }}>
        <Text
          fontFamily="Montserrat-SemiBold"
          color="text"
          style={styles.t_welcome}
          dataSet={{ media: ids.t_welcome }}
        >
          Welcome to
        </Text>
        <Text
          fontFamily="Montserrat-SemiBold"
          color="yellow"
          style={styles.t_rewards}
          dataSet={{ media: ids.t_rewards }}
        >
          PalmsPlay Rewards
        </Text>
        <Text
          fontFamily="Montserrat"
          color="text"
          style={styles.t_description}
          dataSet={{ media: ids.t_description }}
        >
          PalmsPlay Rewards Offers Real Value in Entertainment. Add Excitement to Your Game. Play With
          Real Rewards. Join Now and Start Playing for Real Prizes.
        </Text>
        <Button
          onPress={() => (isLoggedIn ? router.navigate("/redeem") : router.navigate("/auth/login"))}
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
            Claim your rewards
          </Text>
        </Button>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_rewards: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image_style: {
    width: 188,
    height: 188,
    "@media (min-width: 996px)": {
      width: 450,
      height: 408,
    },
  },
  right_wrap: {
    alignItems: "center",
    maxWidth: 570,
    "@media (max-width: 996px) and (min-width: 768px)": {
      maxWidth: 370,
    },
    "@media (max-width: 768px)": {
      flex: 1,
      maxWidth: 370,
    },
  },
  t_welcome: {
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
    "@media (min-width: 996px)": {
      fontSize: 40,
      lineHeight: 45,
    },
  },
  t_rewards: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    "@media (min-width: 996px)": {
      fontSize: 56,
      lineHeight: 62,
    },
  },
  t_description: {
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 10,
    "@media (min-width: 996px)": {
      fontSize: 19,
      lineHeight: 24,
      marginTop: 15,
    },
  },
  button_claim: {
    width: 152,
    height: 38,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    "@media (min-width: 996px)": {
      width: 329,
      height: 70,
      borderRadius: 10,
      marginTop: 30,
    },
  },
  t_claim: {
    fontSize: 12,
    lineHeight: 15,
    "@media (min-width: 996px)": {
      fontSize: 20,
      lineHeight: 24,
    },
  },
});
