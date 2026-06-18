import React from "react";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useLobbyService } from "@/src/store/hooks";
import { useRouter } from "expo-router";
import Identification from "./identification";
import { ids, styles } from "./styles.css";
import { selectKYCInputs } from "@/src/store/slices/lobby.slice";

function LiveVerification() {
  const router = useRouter();
  const input = useAppSelector(selectKYCInputs);
  const { onKYCInputUpdate } = useLobbyService();

  return (
    <View style={styles.input_container} dataSet={{ media: ids.input_container }}>
      <Text
        color="yellowThick"
        fontFamily="PoppinsBold"
        style={styles.title_style}
        dataSet={{ media: ids.title_style }}
      >
        Live Verification
      </Text>
      <Text style={[styles.description_style]}>
        Keep a neutral expression, find a balanced light, and remove any glasses or hats
      </Text>

      <Identification
        label="Upload front of ID"
        value={input?.frontImage}
        error={""}
        onChange={onKYCInputUpdate("portraitImage")}
      />

      <Text
        style={styles.t_help_style}
        onPress={() => router.push("/(modal)/contact-us")}
        fontFamily="PoppinsBold"
        dataSet={{ media: ids.t_help_style }}
      >
        Need Help? Contact Support
      </Text>
    </View>
  );
}

export default LiveVerification;
