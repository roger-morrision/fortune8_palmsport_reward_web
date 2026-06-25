import React from "react";
import numeral from "numeral";
import SVGIcon from "@/src/constants/SVGIcon";
import { useRedeemContext } from "../provider";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";

export default function Amount() {
  const { state } = useRedeemContext();

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text color="placeholder" style={styles.t_available} dataSet={{ media: ids.t_available }}>
        Amount to be redeemed:
      </Text>
      <View style={styles.v_sweeps_balance}>
        <SVGIcon name="sc-coin" width={19} height={19} />
        <Text
          fontFamily="Montserrat-Bold"
          style={styles.t_redemption}
          dataSet={{ media: ids.t_redemption }}
        >
          {numeral(state.goldAmount).format("0,000.00")}
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    padding: 14,
    paddingVertical: 30,
    borderWidth: 1.82,
    borderColor: "#192851",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 800px)": {
      width: "100%",
      padding: 14,
    },
  },
  t_redemption: { fontSize: 20, lineHeight: 22, color: "#FBE18A" },
  t_available: { fontSize: 14, lineHeight: 16 },
  t_requirement: { fontSize: 12, lineHeight: 19, marginTop: 5 },

  v_sweeps_balance: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingRight: 10,
    gap: 10,
  },
});
