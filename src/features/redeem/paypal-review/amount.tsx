import React from "react";
import numeral from "numeral";
import { useRedeemContext } from "../provider";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import { RedeemServiceType } from "@/src/constants/Objects";

export default function AmountDetails() {
  const { state } = useRedeemContext();

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="Montserrat-Bold" style={styles.t_description}>
        Redemption Details:
      </Text>
      <View style={styles.v_divider} />
      <Text color="placeholder" style={styles.t_user}>
        Amount:{"        "}
        <Text color="text" fontFamily="Montserrat-Bold" style={{ color: "#FBE18A" }}>
          SC {numeral(state.goldAmount).format("0,000.00")}
        </Text>
      </Text>
      <Text color="placeholder" style={styles.t_user}>
        Method:{"         "}
        <Text color="text" fontFamily="Montserrat-Bold">
          {RedeemServiceType[state.serviceType || "INSTANT"]}
        </Text>
      </Text>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    padding: 25,
    borderWidth: 1.82,
    borderColor: "#192851",
    borderRadius: 8,
    alignSelf: "center",
  },
  v_divider: {
    height: 1,
    backgroundColor: "rgba(225,255,255,0.25)",
    marginTop: 14,
    marginBottom: 6,
  },
  t_description: { fontSize: 18, lineHeight: 22 },
  t_user: { fontSize: 14, lineHeight: 18, marginTop: 12 },
});
