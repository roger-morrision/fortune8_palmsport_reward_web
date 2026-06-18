import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import { selectedGeoLocationStatus } from "@/src/store/slices/settings.slice";
import React, { useState } from "react";
import { Image, LayoutChangeEvent, Modal } from "react-native";
import StyleSheet from "react-native-media-query";

const Restricted = () => {
  const { images } = useAssetContext();
  const [imgLayout, setImgLayout] = useState({ width: 0, height: 0 });
  const isGeoLocationAllowed = useAppSelector(selectedGeoLocationStatus);

  const onImageLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setImgLayout({ width, height });
  };

  if (isGeoLocationAllowed) {
    return null;
  }

  return (
    <Modal transparent visible animationType={"none"}>
      <View backgroundColor="translucent" style={styles.container}>
        {/* IMAGE WRAPPER */}
        <View style={styles.imageWrapper} dataSet={{ media: ids.imageWrapper }}>
          <Image
            onLayout={onImageLayout}
            source={{ uri: images?.["restrict-bg"].uri }}
            style={styles.image_style}
            dataSet={{ media: ids.image_style }}
          />

          {/* TEXT OVERLAY */}
          {imgLayout.height > 0 && (
            <View
              style={[
                styles.textOverlay,
                {
                  bottom: imgLayout.height * 0.14, // 8% from bottom
                  width: imgLayout.width * 0.9,
                },
              ]}
            >
              <Text
                fontFamily="PoppinsSemiBold"
                style={[
                  styles.text,
                  { fontSize: imgLayout.width * 0.03, lineHeight: imgLayout.width * 0.04 },
                ]}
                dataSet={{ media: ids.text }}
              >
                Gambly is only available{"\n"}
                to customers located in{"\n"}
                the United States.{"\n\n"}
                Unfortunately,{"\n"}
                customers outside of{"\n"}
                the United States cannot{"\n"}
                access this site.
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 455,
    alignItems: "center",
    height: "80%",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
      height: "100%",
    },
  },

  image_style: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
    height: "100%",
  },

  textOverlay: {
    position: "absolute",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
  },
});

export default Restricted;
