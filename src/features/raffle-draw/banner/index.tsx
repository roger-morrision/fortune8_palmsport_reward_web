import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useAssetContext } from "@/src/context/AssetContext";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  description?: string;
  prizeLabel?: string;
  prizeName?: string;
};

export default function Banner({
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  prizeLabel = "This Week's prize",
  prizeName = "iphone 17 pro max 512 gb orange and magsafe",
}: Props) {
  const { images } = useAssetContext();

  return (
    <View backgroundColor="blueDark" style={styles.container} dataSet={{ media: ids.container }}>
      <LinearGradient
        colors={["#020E2E", "#06194B"]}
        style={styles.gradient}
      />

      {/* Giveaway image */}
      <Image
        style={styles.i_banner}
        dataSet={{ media: ids.i_banner }}
        source={{ uri: images?.["banner-1"]?.uri }}
        resizeMode="stretch"
      />

      {/* Description + prize */}
      <View style={styles.v_info} dataSet={{ media: ids.v_info }}>
        <Text
          fontFamily="Montserrat"
          color="text"
          style={styles.t_description}
          dataSet={{ media: ids.t_description }}
        >
          {description}
        </Text>

        <Text
          fontFamily="Montserrat"
          color="text"
          style={styles.t_prize_label}
          dataSet={{ media: ids.t_prize_label }}
        >
          {prizeLabel}
        </Text>

        <Text
          fontFamily="Montserrat-Bold"
          color="button"
          style={styles.t_prize_name}
          dataSet={{ media: ids.t_prize_name }}
        >
          {prizeName}
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    maxWidth: 1084,
    marginTop: 20,
    "@media (max-width: 800px)": {
      borderRadius: 8,
      marginTop: 12,
    },
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  i_banner: {
    width: "100%",
    height: 260,
    "@media (max-width: 800px)": {
      height: 200,
    },
  },
  v_info: {
    paddingHorizontal: 40,
    paddingVertical: 24,
    alignItems: "center",
    "@media (max-width: 800px)": {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
  },
  t_description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    opacity: 0.85,
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 19,
    },
  },
  t_prize_label: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    "@media (max-width: 800px)": {
      marginTop: 12,
      fontSize: 14,
      lineHeight: 18,
    },
  },
  t_prize_name: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 18,
      lineHeight: 26,
    },
  },
});
