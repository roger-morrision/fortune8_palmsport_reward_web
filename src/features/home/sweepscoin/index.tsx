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

export default function SweepsCoin() {
  const router = useRouter();
  const { images } = useAssetContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Image
        style={styles.image_style}
        dataSet={{ media: ids.image_style }}
        source={{ uri: images?.["sweepscoin-banner"].uri }}
        resizeMode="contain"
      />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    height: 455,
    maxWidth: 1280,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 996px) and (min-width: 768px)": {
      height: 280,
    },
    "@media (max-width: 768px)": {
      height: 200,
    },
  },
  image_style: { width: "100%", height: "100%" },
});
