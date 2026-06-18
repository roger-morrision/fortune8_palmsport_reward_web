import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useAssetContext } from "@/src/context/AssetContext";
import React from "react";
import { Image, Linking, Pressable } from "react-native";
import { ids, styles } from "./styles.css";

function ConnectUs(props: any) {
  const { images } = useAssetContext();

  const onFacebook = () => {
    Linking.openURL("https://facebook.com/Fortune8Games");
  };
  const onInstagram = () => {
    Linking.openURL("https://instagram.com/fortune8games");
  };
  const onYoutube = () => {
    Linking.openURL("https://www.youtube.com/@Fortune8Games");
  };
  const onLinkedin = () => {
    Linking.openURL("https://www.linkedin.com/company/gameworkz");
  };

  return null;

  return (
    <View
      backgroundColor="primary"
      style={[styles.container, props.containerStyle]}
      dataSet={{ media: ids.container }}
    >
      <Text
        fontFamily="PoppinsBold"
        style={[styles.t_title, props.titleStyle]}
        dataSet={{ media: ids.t_title }}
      >
        {props.title || "Connect With Us"}
      </Text>
      <View style={styles.v_row} dataSet={{ media: ids.v_row }}>
        <Pressable onPress={onInstagram}>
          <Image
            style={styles.imageStyle}
            dataSet={{ media: ids.imageStyle }}
            source={{ uri: images?.ic_instagram?.uri }}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable onPress={onFacebook}>
          <Image
            style={styles.imageFb}
            dataSet={{ media: ids.imageFb }}
            source={{ uri: images?.ic_facebook.uri }}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable onPress={onYoutube}>
          <Image
            style={styles.imageYoutube}
            dataSet={{ media: ids.imageYoutube }}
            source={{ uri: images?.ic_youtube.uri }}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable onPress={onLinkedin}>
          <Image
            style={styles.imageStyle}
            dataSet={{ media: ids.imageStyle }}
            source={{ uri: images?.ic_indeed.uri }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

export default ConnectUs;
