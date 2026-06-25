import { KYCService } from "@/src/api/services/kyc.service";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import Button from "@/src/common/components/Button";
import { Ionicon, MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useApi } from "@/src/common/hooks/useApi";
import { uriToBlob } from "@/src/common/utils/transform-helper";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useRootContext } from "@/src/context/RootContext";
import { CameraView } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet as SS,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  title: string;
  visible: boolean;
  onClose: () => void;
  onUploadedFile: (value: any) => void;
};

export default function TakeAPhoto(props: Props) {
  const cameraRef = useRef<any>(null);
  const { setErrorMessage } = useRootContext();
  const [cameraKey, setCameraKey] = useState(0);
  const { width, height } = useWindowDimensions();
  const [croppedImage, setCroppedImage] = useState<ImageManipulator.ImageResult | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraLayout, setCameraLayout] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const { loading, execute } = useApi(KYCService.upload, {
    onSuccess: (result) => {
      props.onUploadedFile(result.filePath);
      handleClose();
    },
    onError: (error) => {
      setErrorMessage(error?.message ?? error?.error?.message);
    },
  });

  const closeSize = useBreakpoint({
    default: 30,
    large: 28,
    tablet: 25,
    mobile: 25,
  });

  const { FRAME_WIDTH, FRAME_HEIGHT } = useBreakpoint({
    default: {
      FRAME_WIDTH: width * 0.8,
      FRAME_HEIGHT: width * 0.8 * 0.6,
    },
    xlarge: {
      FRAME_WIDTH: width * 0.5,
      FRAME_HEIGHT: width * 0.5 * 0.6,
    },
    large: {
      FRAME_WIDTH: width * 0.5,
      FRAME_HEIGHT: width * 0.5 * 0.6,
    },
    tablet: {
      FRAME_WIDTH: width * 0.65,
      FRAME_HEIGHT: width * 0.65 * 0.6,
    },
  });

  const takePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: false,
        exif: true,
      });

      if (!cameraLayout) return;

      const crop = getCropData(photo);

      const cropped = await ImageManipulator.manipulateAsync(photo.uri, [{ crop }], {
        compress: 0.95,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      setCroppedImage(cropped);

      console.log("croppedcropped", cropped);
    } catch (err) {
      console.log("Camera capture error:", err);
    }
  };

  const getPreviewLayout = (imgW: number, imgH: number) => {
    const containerWidth = cameraLayout?.width ?? width;
    const containerHeight = cameraLayout?.height ?? height;

    const screenRatio = containerWidth / containerHeight;
    const imageRatio = imgW / imgH;

    let renderWidth = containerWidth;
    let renderHeight = containerHeight;

    if (imageRatio > screenRatio) {
      renderHeight = containerWidth / imageRatio;
    } else {
      renderWidth = containerHeight * imageRatio;
    }

    const offsetX = (containerWidth - renderWidth) / 2;
    const offsetY = (containerHeight - renderHeight) / 2;

    return { renderWidth, renderHeight, offsetX, offsetY };
  };

  const getCropData = (photo: any) => {
    const { width: imgW, height: imgH } = photo;

    const containerWidth = cameraLayout?.width ?? width;
    const containerHeight = cameraLayout?.height ?? height;

    const { renderWidth, renderHeight, offsetX, offsetY } = getPreviewLayout(imgW, imgH);

    // Your FRAME (center rectangle)
    const frameLeft = (containerWidth - FRAME_WIDTH) / 2;
    const frameTop = (containerHeight - FRAME_HEIGHT) / 3;

    const scaleX = imgW / renderWidth;
    const scaleY = imgH / renderHeight;

    return {
      originX: (frameLeft - offsetX) * scaleX,
      originY: (frameTop - offsetY) * scaleY,
      width: FRAME_WIDTH * scaleX,
      height: FRAME_HEIGHT * scaleY,
    };
  };

  const onSubmit = async () => {
    try {
      const formdata = new FormData();
      const blob = await uriToBlob(croppedImage?.uri as any);
      formdata.append("file", blob as any, "kyc-id.jpg");
      execute(formdata);
    } catch (error: any) {
      setErrorMessage(error?.message ?? error);
    }
  };

  const handleTapToFocus = async (event: any) => {
    const { x, y } = event.nativeEvent;

    await cameraRef.current?.focus({
      x,
      y,
    });
  };

  const handleClose = () => {
    setCroppedImage(null);
    setIsCameraReady(false);
    cameraRef.current = null;

    props.onClose();
  };

  /**
   * IMPORTANT:
   * Do NOT fully unmount camera immediately on Android web
   */
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
    <Modal visible={props.visible} transparent animationType="fade">
      <View backgroundColor="primary" style={styles.modal_container}>
        <View style={styles.main_container} dataSet={{ media: ids.main_container }}>
          <View
            style={[styles.header_container, { maxWidth: "100%" }]}
            dataSet={{ media: ids.header_container }}
          >
            <MaterialIcon
              name="close"
              onPress={handleClose}
              size={closeSize}
              color={"text"}
              style={styles.button_container}
            />
            <Text fontFamily="Montserrat-Bold" style={styles.text} dataSet={{ media: ids.text }}>
              {props.title}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{ flex: 1 }} onLayout={(e) => setCameraLayout(e.nativeEvent.layout)}>
            <TouchableWithoutFeedback onPress={handleTapToFocus}>
              <CameraView
                key={cameraKey}
                style={styles.camera}
                ref={cameraRef}
                facing={"back"}
                autofocus="on"
                onCameraReady={() => setIsCameraReady(true)}
              />
            </TouchableWithoutFeedback>
          </View>

          {/* Overlay */}
          <OverlayMask
            width={width}
            height={height}
            FRAME_WIDTH={FRAME_WIDTH}
            FRAME_HEIGHT={FRAME_HEIGHT}
          />

          <Button
            disabled={!isCameraReady}
            backgroundColor="yellowThick"
            onPress={takePhoto}
            style={styles.captureBtn}
            dataSet={{ media: ids.captureBtn }}
          >
            <Ionicon disabled name="camera" size={27} color="textDark" />
          </Button>

          {_.isEmpty(croppedImage) ? null : (
            <View
              backgroundColor="primary"
              style={[styles.v_action_buttons]}
              dataSet={{ media: ids.v_action_buttons }}
            >
              <Text style={styles.t_notes} dataSet={{ media: ids.t_notes }}>
                Ensure that your ID details are readable, with no blur or glare.
              </Text>
              <View style={styles.button_row}>
                <Button
                  onPress={() => setCroppedImage(null)}
                  borderColor="goldFlatBorder"
                  style={styles.button_style}
                  dataSet={{ media: ids.button_style }}
                >
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    style={styles.button_label}
                    dataSet={{ media: ids.button_label }}
                  >
                    Retake
                  </Text>
                </Button>
                <Button
                  onPress={onSubmit}
                  disabled={loading}
                  backgroundColor={"goldFlatBorder"}
                  borderColor={"goldFlatBorder"}
                  style={styles.button_style}
                  dataSet={{ media: ids.button_style }}
                >
                  {loading ? (
                    <ActivityIndicator animating size={"small"} color="textDark" />
                  ) : (
                    <Text
                      color="textDark"
                      fontFamily="Montserrat-SemiBold"
                      style={styles.button_label}
                      dataSet={{ media: ids.button_label }}
                    >
                      Use this
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

/**
 * Use simple dark mask instead
 */
const OverlayMask = (props: {
  width: number;
  height: number;
  FRAME_HEIGHT: number;
  FRAME_WIDTH: number;
}) => {
  const { width, height, FRAME_HEIGHT, FRAME_WIDTH } = props;

  return (
    <View style={[styles.overlay, { width, height }]}>
      {/* Top */}
      <View style={{ backgroundColor: "rgba(0,0,0,0.8)", height: (height - FRAME_HEIGHT) / 4 }} />

      {/* Middle */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: (width - FRAME_WIDTH) / 2, backgroundColor: "rgba(0,0,0,0.8)" }} />

        {/* Frame */}
        <View
          borderColor="text"
          style={[
            styles.frame,
            {
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
            },
          ]}
        />

        <View style={{ width: (width - FRAME_WIDTH) / 2, backgroundColor: "rgba(0,0,0,0.8)" }} />
      </View>

      {/* Bottom */}
      <View style={{ height: (height - FRAME_HEIGHT) / 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
    </View>
  );
};

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
  overlay: {
    position: "absolute",
  },

  mask: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  frame: {
    borderWidth: 4,
    borderRadius: 12,
  },

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
  t_notes: {
    fontSize: 14,
    lineHeight: 19,
  },
  button_row: {
    flexDirection: "row",
    gap: 21,
  },
  button_style: {
    // width: "100%",
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
  },
});
