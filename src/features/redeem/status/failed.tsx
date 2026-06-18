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
  });

  return (
    <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
      <SVGIcon name="failed" {...size} />
      <Text fontFamily="PoppinsBold" style={styles.t_verify} dataSet={{ media: ids.t_verify }}>
        Uh oh! Something is not right!
      </Text>
      <Text
        fontFamily="PoppinsLight"
        color="closeColor"
        style={styles.t_description}
        dataSet={{ media: ids.t_description }}
      >
        Please check the following and try again.{"\n\n"}
        {" ●  "}Go to My Account and make sure your profile details are complete.{"\n"}
        {" ●  "}Make sure the account details you entered are correct and valid.{"\n"}
      </Text>
      <Button
        onPress={() => router.navigate("/redeem")}
        style={styles.button_style}
        dataSet={{ media: ids.button_style }}
      >
        <Text
          color="textDark"
          fontFamily="PoppinsSemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Redeem Again
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
    "@media (max-width: 768px)": {
      fontSize: 20,
      lineHeight: 24,
    },
  },
  t_description: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 23,
    },
  },

  button_style: {
    width: "100%",
    height: 60,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    backgroundColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 800px)": {
      maxWidth: 400,
    },
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 20,
  },

  button_home_style: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 800px)": {
      maxWidth: 400,
    },
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
});
