import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import SVGIcon from "@/src/constants/SVGIcon";
import React, { useEffect, useState } from "react";
import StyleSheet from "react-native-media-query";

export default function KYCUploading() {
  const [dots, setDots] = useState("");

  const size = useBreakpoint({
    default: {
      width: 100,
      height: 75,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 4 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
      <SVGIcon name="kyc-upload" {...size} />
      <Text fontFamily="PoppinsBold" style={styles.t_verify} dataSet={{ media: ids.t_verify }}>
        Submitting.{dots}
      </Text>
      <Text
        fontFamily="PoppinsLight"
        color="closeColor"
        style={styles.t_description}
        dataSet={{ media: ids.t_description }}
      >
        This will only take a moment
      </Text>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_redeem_container: {
    gap: 22,
    marginTop: 39,
    marginBottom: 170,
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
    "@media (max-width: 800px)": {
      gap: 21,
      marginTop: 19,
      marginBottom: 150,
      marginLeft: 25,
      marginRight: 25,
    },
  },
  t_verify: {
    fontSize: 22,
    textAlign: "center",
    lineHeight: 30,
    marginTop: 5,
  },
  t_description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25,
  },
});
