import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import SVGIcon from "@/src/constants/SVGIcon";
import { useRouter } from "expo-router";
import React from "react";
import StyleSheet from "react-native-media-query";
import GotoGambly from "../home/go-to-gambly";
import ConnectUs from "../home/connect-with-us";
import Footer from "../home/footer";
import { ScrollView } from "react-native";

export default function KYCPendingPage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <RequestInProgress />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <GotoGambly />
          <ConnectUs />
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}

function RequestInProgress() {
  const router = useRouter();
  const size = useBreakpoint({
    default: {
      width: 125,
      height: 125,
    },
    mobile: {
      width: 110,
      height: 110,
    },
    tablet: {
      width: 110,
      height: 110,
    },
  });

  return (
    <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
      <SVGIcon name="time" {...size} />
      <Text fontFamily="PoppinsBold" style={styles.t_verify} dataSet={{ media: ids.t_verify }}>
        KYC Verification Under Review
      </Text>
      <Text
        fontFamily="PoppinsLight"
        color="closeColor"
        style={styles.t_description}
        dataSet={{ media: ids.t_description }}
      >
        Your documents have been submitted successfully.{"\n"}
        Our team is reviewing your information.{"\n"}
        You’ll be notified once the review is complete.
      </Text>
      <Button
        onPress={() => router.navigate("/")}
        style={styles.button_style}
        dataSet={{ media: ids.button_style }}
      >
        <Text
          color="textDark"
          fontFamily="PoppinsSemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Got it
        </Text>
      </Button>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 30,
    marginBottom: 50,
    "@media (min-width: 996px)": {
      alignSelf: "center",
    },
  },
  footer: {
    gap: 10,
    width: "100%",
    "@media (min-width: 996px)": {
      gap: 0,
    },
  },

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

  button_style: {
    width: "100%",
    height: 50,
    marginTop: 36,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    backgroundColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 800px)": {
      maxWidth: 377,
    },
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
  button_label: {
    fontSize: 16,
    lineHeight: 20,
  },
});
