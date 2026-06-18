import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import SVGIcon from "@/src/constants/SVGIcon";
import { useRouter } from "expo-router";
import React from "react";
import StyleSheet from "react-native-media-query";

export default function RequestFailed() {
  const router = useRouter();
  const size = useBreakpoint({
    default: {
      width: 132,
      height: 132,
    },
    large: {
      width: 120,
      height: 120,
    },
    mobile: {
      width: 115,
      height: 115,
    },
    tablet: {
      width: 115,
      height: 115,
    },
  });

  return (
    <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
      <SVGIcon name="failed" {...size} />
      <Text fontFamily="PoppinsBold" style={styles.t_verify} dataSet={{ media: ids.t_verify }}>
        KYC Verification Unsuccessful
      </Text>
      <Text
        fontFamily="PoppinsLight"
        color="closeColor"
        style={styles.t_description}
        dataSet={{ media: ids.t_description }}
      >
        Unfortunately, we were unable to verify your identity based on the information provided.
        {"\n"}
        This may be due to unclear images, expired documents, or mismatched details.{"\n\n"}
        You can try again with a valid and clearly visible document.
      </Text>
      <Button
        onPress={() => router.navigate("/kyc-verification")}
        style={styles.button_style}
        dataSet={{ media: ids.button_style }}
      >
        <Text
          color="textDark"
          fontFamily="PoppinsSemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Try Again
        </Text>
      </Button>
      <Button
        onPress={() => router.navigate("/")}
        style={styles.button_home_style}
        dataSet={{ media: ids.button_home_style }}
      >
        <Text
          fontFamily="PoppinsSemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Back to Home
        </Text>
      </Button>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_redeem_container: {
    gap: 22,
    marginTop: 39,
    marginBottom: 143,
    marginLeft: 25,
    marginRight: 25,
    maxWidth: 600,
    alignSelf: "center",
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
    fontSize: 28,
    textAlign: "center",
    lineHeight: 35,
    marginTop: 5,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 20,
      lineHeight: 26,
      marginTop: 4,
    },
    "@media (max-width: 768px)": {
      fontSize: 18,
      lineHeight: 22,
    },
  },
  t_description: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 23,
    },
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },

  button_style: {
    width: "100%",
    height: 55,
    marginTop: 36,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    backgroundColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      width: 330,
      height: 45,
    },
    "@media (min-width: 800px)": {
      maxWidth: 377,
      height: 45,
    },
    "@media (max-width: 768px)": {
      height: 45,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 20,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 14,
      lineHeight: 17,
    },
  },

  button_home_style: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      width: 330,
      height: 45,
    },
    "@media (min-width: 800px)": {
      maxWidth: 377,
      height: 45,
    },
    "@media (max-width: 768px)": {
      height: 45,
    },
  },
});
