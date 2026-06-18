import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { GAMBLY_URL } from "@/src/constants/Config";
import { useAssetContext } from "@/src/context/AssetContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Linking } from "react-native";
import StyleSheet from "react-native-media-query";

export default function HowItWorks() {
  const { images } = useAssetContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  const gotoGambly = () => Linking.openURL(`${GAMBLY_URL}/auth/signup`);

  return (
    <View
      backgroundColor="blueDark"
      style={styles.v_howitworks}
      dataSet={{ media: ids.v_howitworks }}
    >
      <Text
        fontFamily="PoppinsSemiBold"
        color="yellow"
        style={styles.t_howitworks}
        dataSet={{ media: ids.t_howitworks }}
      >
        HOW IT WORKS
      </Text>
      <Text
        fontFamily="PoppinsRegular"
        color="text"
        style={styles.t_hiw_description}
        dataSet={{ media: ids.t_hiw_description }}
      >
        Redeem rewards with PalmsPlay Rewards
      </Text>
      <View style={styles.v_row} dataSet={{ media: ids.v_row }}>
        <View style={styles.left_wrap}>
          <Item sequence={1} title="PLAY" description="Play Feature Games in Gambly" />
          <Item sequence={2} title="EARN" description="Earn Sweepscoin" />
          <Item
            sequence={3}
            title="REDEEM"
            description={`Go to Redeem and select \nyour reward.`}
          />
          <Button
            onPress={gotoGambly}
            backgroundColor="button"
            style={[styles.button_claim, isLoggedIn && { maxHeight: 20, opacity: 0 }]}
            dataSet={{ media: ids.button_claim }}
          >
            <Text
              color="textDark"
              fontFamily="PoppinsBold"
              style={styles.t_claim}
              dataSet={{ media: ids.t_claim }}
            >
              Sign up now!
            </Text>
          </Button>
          <Text
            color="text"
            fontFamily="PoppinsMedium"
            style={styles.t_notes}
            dataSet={{ media: ids.t_notes }}
          >
            *Terms and conditions apply
          </Text>
        </View>
        <Image
          style={styles.image_style}
          dataSet={{ media: ids.image_style }}
          source={{ uri: images?.["how-it-works"].uri }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

type ItemProps = {
  sequence: number;
  title: string;
  description: string;
};

const Item = (props: ItemProps) => {
  return (
    <View style={styles.v_row_item}>
      <LinearGradient
        style={styles.item_box}
        dataSet={{ media: ids.item_box }}
        colors={["#334F98", "#172C60"]}
      >
        <Text
          fontFamily="PoppinsBold"
          style={styles.item_number}
          dataSet={{ media: ids.item_number }}
        >
          {props.sequence}
        </Text>
      </LinearGradient>
      <View>
        <Text
          fontFamily="PoppinsSemiBold"
          color="yellow"
          style={styles.t_title}
          dataSet={{ media: ids.t_title }}
        >
          {props.title}
        </Text>
        <Text
          fontFamily="PoppinsRegular"
          color="text"
          style={styles.t_description}
          dataSet={{ media: ids.t_description }}
        >
          {props.description}
        </Text>
      </View>
    </View>
  );
};

const { ids, styles } = StyleSheet.create({
  v_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    "@media (min-width: 996px)": {
      marginTop: 40,
      gap: 50,
    },
  },

  v_row_item: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
  item_box: {
    width: 29,
    height: 32,
    borderRadius: 8.4,
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 996px)": {
      width: 42,
      height: 47,
    },
  },
  item_number: {
    fontSize: 17,
    lineHeight: 20,
    "@media (min-width: 996px)": {
      fontSize: 24,
      lineHeight: 29,
    },
  },

  left_wrap: { flex: 1, gap: 15, zIndex: 1 },
  t_title: {
    fontSize: 16.8,
    lineHeight: 20,
    "@media (min-width: 996px)": {
      fontSize: 24,
      lineHeight: 29,
    },
  },
  t_description: {
    fontSize: 11.2,
    lineHeight: 15,
    "@media (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 22,
    },
  },
  button_claim: {
    width: 152,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    "@media (min-width: 996px)": {
      width: 221,
      height: 55,
      borderRadius: 6.49,
      marginTop: 3,
    },
  },
  t_claim: {
    fontSize: 12,
    lineHeight: 15,
    "@media (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },
  t_notes: {
    width: 152,
    fontSize: 8.9,
    lineHeight: 9,
    textAlign: "center",
    fontStyle: "italic",
    "@media (min-width: 996px)": {
      width: 221,
    },
  },

  image_style: {
    width: 181,
    height: 200,
    transform: [{ scale: 1.25 }],
    "@media (min-width: 996px)": {
      width: 301,
      height: 351,
      transform: [{ scale: 1 }],
    },
    "@media (max-width: 768px)": {
      width: 181,
      height: 200,
      transform: [{ scale: 1.5 }],
    },
  },

  v_howitworks: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 25,
    paddingTop: 25,
    paddingBottom: 50,
    "@media (min-width: 996px)": {
      paddingTop: 53.5,
      paddingBottom: 80,
    },
  },
  t_howitworks: {
    fontSize: 22,
    lineHeight: 27,
    textAlign: "center",
    "@media (min-width: 996px)": {
      fontSize: 50,
      lineHeight: 65,
    },
  },
  t_hiw_description: {
    fontSize: 13.44,
    lineHeight: 15,
    textAlign: "center",
    "@media (min-width: 996px)": {
      fontSize: 18,
      lineHeight: 25,
    },
  },
});
