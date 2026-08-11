import { Image } from "react-native";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import { CDNImages } from "@/src/constants/Images";

export default function EliteBanner() {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Image
        style={styles.i_banner}
        dataSet={{ media: ids.i_banner }}
        source={{ uri: CDNImages["elite-banner"] }}
        resizeMode="cover"
      />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    // maxWidth: 1084,
    alignSelf: "center",
    overflow: "hidden",
    "@media (max-width: 800px)": {
      marginTop: 12,
    },
  },
  i_banner: {
    top: 1,
    width: "100%",
    height: 463,
    "@media (max-width: 800px)": {
      height: 260,
    },
  },
});
