import View from "@/src/common/components/View";
import { useRootContext } from "@/src/context/RootContext";
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import StyleSheet from "react-native-media-query";
import TakeAPhoto from "../take-a-photo";
import UploadFile from "./upload-file";

type Props = {
  label: string;
  value: string;
  error: string;
  onChange: (value: any) => void;
};

export default function Identification(props: Props) {
  const { setErrorMessage } = useRootContext();
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleShowCamera = async () => {
    if (!permission?.granted) {
      setErrorMessage("Camera permission required!");
      await requestPermission();
      return;
    }

    setShowCamera(true);
  };

  return (
    <View style={styles.container}>
      <UploadFile onPress={handleShowCamera} value={props.value} />
      <TakeAPhoto
        visible={showCamera}
        title={"Live Verification"}
        onUploadedFile={props.onChange}
        onClose={() => setShowCamera(false)}
      />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 46,
  },
  label_style: { fontSize: 14, lineHeight: 20 },
});
