import Button from "@/src/common/components/Button";
import { Ionicon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { CDN_URL } from "@/src/constants/Config";
import React from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  value: any;
  onPress: () => void;
};

export default function UploadFile(props: Props) {
  if (props.value) {
    return (
      <View
        borderColor="borderColor"
        backgroundColor="secondary"
        style={styles.container}
        dataSet={{ media: ids.container }}
      >
        <Image
          style={styles.image_style}
          dataSet={{ media: ids.image_style }}
          source={{ uri: `${CDN_URL}/${props.value}` }}
          resizeMode="contain"
        />
        <Button
          onPress={props.onPress}
          borderColor="goldFlatBorder"
          style={styles.button_style}
          dataSet={{ media: ids.button_style }}
        >
          <Text
            fontFamily="Montserrat-SemiBold"
            style={styles.button_label}
            dataSet={{ media: ids.button_label }}
          >
            Re-upload
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <Button
      onPress={props.onPress}
      borderColor="borderColor"
      backgroundColor="secondary"
      style={styles.container}
      dataSet={{ media: ids.container }}
    >
      <View backgroundColor="yellowThick" style={styles.v_icon}>
        <Ionicon disabled name="camera" size={25} color="textDark" />
      </View>
      <Text color="placeholder" style={styles.t_upload}>
        Tap to take a photo {"\n"}or upload document
      </Text>
    </Button>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 28,
    flexDirection: "column",
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    "@media (max-width: 800px)": {},
  },
  v_icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  t_upload: { fontSize: 14, lineHeight: 18 },
  image_style: {
    width: 356,
    height: 224,
    "@media (max-width: 800px)": {
      width: "90%",
      height: 224,
    },
  },

  button_style: {
    width: "50%",
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      height: 45,
    },
    "@media (max-width: 768px)": {
      width: "100%",
      height: 45,
    },
  },
  button_label: {
    fontSize: 16,
    lineHeight: 18,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 15,
      lineHeight: 18,
    },
  },
});
