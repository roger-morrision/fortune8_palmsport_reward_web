import { KYCService } from "@/src/api/services/kyc.service";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useApi } from "@/src/common/hooks/useApi";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useAssetContext } from "@/src/context/AssetContext";
import { useRootContext } from "@/src/context/RootContext";
import { useCameraPermissions } from "expo-camera";
import * as DocumentPicker from "expo-document-picker";
import _ from "lodash";
import React, { useState } from "react";
import { Image, Modal, StyleSheet as SS } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  visible: boolean;
  onClose: () => void;
  onShowCamera: () => void;
  onUploadedFile: (value: any) => void;
};

export default function HowToSubmitID(props: Props) {
  const { images } = useAssetContext();
  const { setErrorMessage } = useRootContext();
  const [select, setSelect] = useState<string>();
  const [permission, requestPermission] = useCameraPermissions();

  const { loading, execute } = useApi(KYCService.upload, {
    onSuccess: (result: { filePath: string }) => {
      props.onUploadedFile(result.filePath);
      props.onClose();
    },
    onError: (e) => {
      let msg = e?.message ?? e?.error?.message ?? "";

      if (msg.includes("Failed to fetch")) {
        msg = "File is too large. Please upload an image up to 10MB.";
      }
      setErrorMessage(msg);
    },
  });

  const isDisabled = _.isEmpty(select);

  const size = useBreakpoint({
    default: {
      width: 95,
      height: 81,
    },
  });

  const onContinue = async () => {
    if (select === "camera") {
      if (!permission?.granted) {
        setErrorMessage("Camera permission required!");
        await requestPermission();
        return;
      }
      props.onShowCamera();
    } else if (select === "upload") {
      DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      })
        .then(async (res: any) => {
          if (res.canceled) return;

          const file = res.assets[0];
          const formdata = new FormData();
          formdata.append("file", file.file);

          execute(formdata);
        })
        .catch((e) => {
          setErrorMessage(e?.message ?? e?.error?.message);
        });
    }
  };

  return (
    <Modal visible transparent animationType="fade">
      <View backgroundColor="translucent" style={styles.modal_container}>
        <View
          backgroundColor="background"
          style={styles.container}
          dataSet={{ media: ids.container }}
        >
          <MaterialIcon
            color="closeColor"
            backgroundColor="transparent"
            onPress={props.onClose}
            asButton
            style={styles.btn_close_style}
            name="close"
          />
          <Image
            style={[{ alignSelf: "center" }, { ...size }]}
            source={{ uri: images?.["kyc-upload-id"].uri }}
            resizeMode="contain"
          />
          <Text
            fontFamily="Montserrat-Bold"
            color="yellowThick"
            style={styles.t_verify}
            dataSet={{ media: ids.t_verify }}
          >
            How to submit your ID
          </Text>
          <Text
            fontFamily="Montserrat-Light"
            style={styles.t_description}
            dataSet={{ media: ids.t_description }}
          >
            Use an original ID and submit a front and back image to ensure that the details are
            readable.
          </Text>
          <View style={{ gap: 17 }}>
            <ItemRequirement
              title="Take a photo"
              isSelect={select === "camera"}
              onPress={() => setSelect("camera")}
            />
            <View backgroundColor="borderColor" style={styles.divider} />
            <ItemRequirement
              title="Upload document"
              subtitle="JPG, PNG & PDF formats preferred"
              isSelect={select === "upload"}
              onPress={() => setSelect("upload")}
            />
          </View>
          <Button
            onPress={onContinue}
            disabled={isDisabled}
            backgroundColor={isDisabled ? "disabled" : "goldFlatBorder"}
            borderColor={isDisabled ? "disabled" : "goldFlatBorder"}
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
                Continue
              </Text>
            )}
          </Button>

          <Button
            onPress={props.onClose}
            borderColor="goldFlatBorder"
            style={styles.button_home_style}
            dataSet={{ media: ids.button_home_style }}
          >
            <Text
              fontFamily="Montserrat-SemiBold"
              style={styles.button_label}
              dataSet={{ media: ids.button_label }}
            >
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

type ItemProps = {
  title: string;
  subtitle?: string;
  isSelect: boolean;
  onPress: () => void;
};

const ItemRequirement = (props: ItemProps) => {
  return (
    <View style={styles.item_container} dataSet={{ media: ids.item_container }}>
      <View>
        <Text
          fontFamily="Montserrat-Bold"
          style={styles.item_t_title}
          dataSet={{ media: ids.item_t_title }}
        >
          {props.title}
        </Text>
        <Text style={styles.item_t_subtitle} dataSet={{ media: ids.item_t_subtitle }}>
          {props.subtitle}
        </Text>
      </View>
      <Button
        onPress={props.onPress}
        borderColor={props.isSelect ? "yellowThick" : "blueMatt"}
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          backgroundColor={props.isSelect ? "yellowThick" : "transparent"}
          style={{ width: 14, height: 14, borderRadius: 7 }}
        />
      </Button>
    </View>
  );
};

const { ids, styles } = StyleSheet.create({
  modal_container: {
    alignItems: "center",
    justifyContent: "center",
    ...SS.absoluteFill,
  },
  container: {
    gap: 22,
    borderRadius: 8,
    paddingVertical: "6%",
    paddingLeft: "4%",
    paddingRight: "5%",
    maxWidth: 600,
    "@media (max-width: 800px)": {
      gap: 21,
      marginTop: 19,
      marginBottom: 150,
      marginLeft: 25,
      marginRight: 25,
    },
  },
  btn_close_style: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  t_verify: {
    fontSize: 28,
    lineHeight: 35,
    marginTop: 5,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 23,
      lineHeight: 28,
      marginTop: 4,
    },
    "@media (max-width: 768px)": {
      fontSize: 20,
      lineHeight: 24,
    },
  },
  t_description: {
    fontSize: 18,
    lineHeight: 25,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 23,
    },
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },

  t_error_style: {
    fontSize: 14,
    lineHeight: 20,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 20,
    },
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },

  button_style: {
    width: "100%",
    alignSelf: "center",
    height: 60,
    marginTop: 36,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      height: 50,
    },
    "@media (min-width: 800px)": {
      height: 50,
    },
    "@media (max-width: 768px)": {
      height: 50,
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
  button_home_style: {
    width: "100%",
    height: 60,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      height: 50,
    },
    "@media (min-width: 800px)": {
      height: 50,
    },
    "@media (max-width: 768px)": {
      height: 50,
    },
  },

  // ITEM
  item_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  item_t_title: {
    fontSize: 14,
    lineHeight: 26,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 26,
    },
  },
  divider: { height: 2 },
  item_t_subtitle: {
    fontSize: 12,
    lineHeight: 22,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 14,
      lineHeight: 25,
    },
  },
});
