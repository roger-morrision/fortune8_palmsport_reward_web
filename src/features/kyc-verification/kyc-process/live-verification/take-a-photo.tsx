import Button from "@/src/common/components/Button";
import { Ionicon, MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useLobbyService } from "@/src/store/hooks";
import { CameraView } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet as SS, TouchableWithoutFeedback } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  title: string;
  visible: boolean;
  onClose: () => void;
  onUploadedFile: (value: string) => void;
};

export default function TakeAPhoto(props: Props) {
  const cameraRef = useRef<any>(null);
  const { onKYCRequest } = useLobbyService();
  const [cameraKey, setCameraKey] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [croppedImage, setCroppedImage] = useState<ImageManipulator.ImageResult | null>(null);

  const closeSize = useBreakpoint({
    default: 30,
    large: 28,
    tablet: 25,
    mobile: 25,
  });

  const handleTapToFocus = async (event: any) => {
    const { x, y } = event.nativeEvent;

    await cameraRef.current?.focus({
      x,
      y,
    });
  };

  const takePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      skipProcessing: false,
      exif: true,
    });

    setCroppedImage(photo);
  };

  const handleClose = () => {
    setCroppedImage(null);
    setIsCameraReady(false);
    cameraRef.current = null;

    props.onClose();
  };

  const onSubmit = async () => {
    onKYCRequest(croppedImage?.uri);
    handleClose();
  };

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    const t = setTimeout(() => {
      setCameraKey((k) => k + 1); // force fresh video layer
    }, 400);

    return () => clearTimeout(t);
  }, [props.visible]);

  if (!props.visible) return null;

  return (
    <Modal visible transparent animationType="slide">
      <View backgroundColor="primary" style={styles.modal_container}>
        <View style={styles.main_container} dataSet={{ media: ids.main_container }}>
          <View
            style={[styles.header_container, { maxWidth: "100%" }]}
            dataSet={{ media: ids.header_container }}
          >
            <MaterialIcon
              name="close"
              onPress={props.onClose}
              size={closeSize}
              color={"text"}
              style={styles.button_container}
            />
            <Text fontFamily="PoppinsBold" style={styles.text} dataSet={{ media: ids.text }}>
              {props.title}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={handleTapToFocus}>
            <CameraView
              key={cameraKey}
              style={styles.camera}
              ref={cameraRef}
              facing={"front"}
              autofocus="on"
              onCameraReady={() => setIsCameraReady(true)}
            />
          </TouchableWithoutFeedback>

          <Button backgroundColor="yellowThick" onPress={takePhoto} style={styles.captureBtn}>
            <Ionicon disabled name="camera" size={25} color="textDark" />
          </Button>

          {_.isEmpty(croppedImage) ? null : (
            <View
              backgroundColor="primary"
              style={[styles.v_action_buttons]}
              dataSet={{ media: ids.v_action_buttons }}
            >
              <Text
                color="yellowThick"
                fontFamily="PoppinsBold"
                style={styles.t_title}
                dataSet={{ media: ids.t_title }}
              >
                Would you like to use this photo?
              </Text>
              <Text style={styles.t_notes} dataSet={{ media: ids.t_notes }}>
                Ensure that photo is well lit, clear and not blurred.
              </Text>
              <View style={styles.button_row}>
                <Button
                  onPress={() => setCroppedImage(null)}
                  borderColor="goldFlatBorder"
                  style={styles.button_style}
                  dataSet={{ media: ids.button_style }}
                >
                  <Text
                    fontFamily="PoppinsSemiBold"
                    style={styles.button_label}
                    dataSet={{ media: ids.button_label }}
                  >
                    Retake
                  </Text>
                </Button>
                <Button
                  onPress={onSubmit}
                  backgroundColor={"goldFlatBorder"}
                  borderColor={"goldFlatBorder"}
                  style={styles.button_style}
                  dataSet={{ media: ids.button_style }}
                >
                  <Text
                    color="textDark"
                    fontFamily="PoppinsSemiBold"
                    style={styles.button_label}
                    dataSet={{ media: ids.button_label }}
                  >
                    Use this
                  </Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const { ids, styles } = StyleSheet.create({
  modal_container: {
    ...SS.absoluteFill,
  },

  main_container: {
    width: "100%",
    maxWidth: 974,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header_container: {
    height: 61,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 1600px)": {
      width: "100%",
      height: 61,
      paddingLeft: 0,
      paddingRight: 0,
    },
    "@media (max-width: 1600px) and (min-width: 800px)": {
      width: "100%",
      height: 61,
      paddingLeft: 20,
      paddingRight: 20,
    },
    "@media (max-width: 768px)": {
      height: 45,
    },
  },

  button_container: {
    left: 21,
    position: "absolute",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      paddingLeft: 32,
      paddingRight: 32,
    },
  },
  text: {
    width: "60%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 18,
    "@media (max-width: 1920px) and (min-width: 800px)": {
      fontSize: 18,
      lineHeight: 20,
    },
    "@media (max-width: 768px)": {
      fontSize: 14,
      lineHeight: 16,
    },
  },

  container: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },
  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    padding: 15,
    borderRadius: 50,
  },
  cameraSwitchBtn: {
    position: "absolute",
    bottom: 40,
    right: "40%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    "@media (max-width: 850px)": {
      right: "3%",
    },
  },

  v_action_buttons: {
    alignSelf: "center",
    width: "50%",
    paddingHorizontal: 30,
    paddingTop: 26,
    paddingBottom: 40,
    bottom: 0,
    position: "absolute",
    "@media (max-width: 800px)": {
      width: "100%",
    },
  },
  t_title: {
    fontSize: 18,
    lineHeight: 22,
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },
  t_notes: {
    fontSize: 14,
    lineHeight: 19,
    marginTop: 10,
    "@media (max-width: 768px)": {
      fontSize: 13,
      lineHeight: 18,
    },
  },
  button_row: {
    flexDirection: "row",
    gap: 21,
  },
  button_style: {
    flex: 1,
    alignSelf: "center",
    height: 48,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      height: 40,
      borderRadius: 6,
    },
    "@media (min-width: 800px)": {
      height: 40,
      borderRadius: 6,
    },
    "@media (max-width: 768px)": {
      height: 40,
      borderRadius: 6,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 20,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 15,
      lineHeight: 18,
    },
    "@media (max-width: 768px)": {
      fontSize: 12,
      lineHeight: 15,
    },
  },
});
