import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  image: string;
  description: string;
}

export default function Banner({ image, description }: Props) {

  return (
    <View backgroundColor="blueDark" style={styles.v_rewards} dataSet={{ media: ids.v_rewards }}>
      <LinearGradient
        colors={["#020E2E", "#06194B"]}
        style={[styles.linear_gradient]}
      />
      <Image
        style={styles.image_style}
        source={{ uri: image }}
        resizeMode="contain"
      />
      <View style={styles.right_wrap}>
        <Text fontFamily="Montserrat" color="text" style={styles.t_description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_rewards: {
    marginTop: 34,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 1084,
    borderRadius: 10,
    alignSelf: "center",
    "@media (min-width: 996px)": {
      flex: 1,
    },
  },
  linear_gradient: { width: "100%", height: "100%", position: "absolute", borderRadius: 10, },
  image_style: { width: "100%", height: 300 },
  right_wrap: { flex: 1, alignItems: "center", padding: 25 },
  t_description: {
    fontSize: 13.44,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: "80%",
    textAlign: "center",
  },
});
