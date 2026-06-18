import React from "react";
import { useRedeemContext } from "../provider";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";

export default function AccountDetails() {
  const { state } = useRedeemContext();

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="PoppinsBold" style={styles.t_description}>
        Paypal Email Address:
      </Text>
      <View style={styles.v_divider} />
      <Text color="placeholder" style={styles.t_user}>
        Email Address:{"    "}
        <Text color="text" fontFamily="PoppinsBold">
          {state.paypalEmail}
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
  t_notes: { fontSize: 10, lineHeight: 19, marginTop: 17, fontStyle: "italic" },
});
