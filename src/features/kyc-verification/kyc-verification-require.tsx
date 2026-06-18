import { MaterialIcon } from "@/src/common/components/Icon";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, StyleSheet as SS } from "react-native";
import StyleSheet from "react-native-media-query";
import KYCVerification from "./kyc-verification";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function KYCVerificationModal(props: Props) {
  const router = useRouter();
  const closeSize = useBreakpoint({
    default: 30,
    large: 28,
    tablet: 25,
    mobile: 25,
  });

  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <View backgroundColor="translucent" style={styles.modal_container}>
        <View
          backgroundColor="background"
          style={styles.container}
          dataSet={{ media: ids.container }}
        >
          <MaterialIcon
            name="close"
            onPress={props.onClose}
            size={closeSize}
            color={"closeColor"}
            style={styles.button_container}
          />
          <KYCVerification
            onVerify={() => {
              router.push("/kyc-verification/start-process");
              props.onClose();
            }}
            onCancel={props.onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const { ids, styles } = StyleSheet.create({
  modal_container: {
    alignItems: "center",
    justifyContent: "center",
    ...SS.absoluteFill,
  },
  container: {
    width: "100%",
    maxWidth: 450,
    // alignSelf: "center",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },

  button_container: {
    right: 19,
    top: 18,
    position: "absolute",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      paddingLeft: 32,
      paddingRight: 32,
    },
  },
});
