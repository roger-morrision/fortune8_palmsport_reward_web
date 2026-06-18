import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import React, { useState } from "react";
import StyleSheet from "react-native-media-query";
import HowToSubmitID from "../how-to-submit-id";
import TakeAPhoto from "../take-a-photo";
import UploadFile from "./upload-file";

type Props = {
  label: string;
  title: string;
  value: string;
  error: string;
  onChange: (value: any) => void;
};

export default function Identification(props: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text
        style={[styles.label_style, props.error && { color: "red" }]}
        dataSet={{ media: ids.label_style }}
      >
        {props.label} <Text color="red">*</Text>
      </Text>
      <UploadFile onPress={() => setVisible(true)} value={props.value} />
      {visible && (
        <HowToSubmitID
          visible={visible}
          onUploadedFile={props.onChange}
          onClose={() => setVisible(false)}
          onShowCamera={() => {
            setVisible(false);
            setShowCamera(true);
          }}
        />
      )}
      <TakeAPhoto
        visible={showCamera}
        title={props.title}
        onUploadedFile={props.onChange}
        onClose={() => setShowCamera(false)}
      />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  label_style: { fontSize: 14, lineHeight: 20 },
});
