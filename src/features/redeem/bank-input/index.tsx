import React from "react";
import Amount from "./amount";
import AccountDetails from "./account";
import BankDetails from "./bank-details";
import { useRedeemContext } from "../provider";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import ScreenTitle from "@/src/common/components/header/screen-title";

export default function BankInput() {
  const { setScreen } = useRedeemContext();

  return (
    <>
      <ScreenTitle onBack={() => setScreen("MAIN")} options={{ title: "Real Time Payments" }} />
      <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
        <View style={styles.v_amount_container} dataSet={{ media: ids.v_amount_container }}>
          <Amount />
          <AccountDetails />
          <BankDetails />
        </View>
      </View>
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  v_redeem_container: {
    gap: 22,
    marginTop: 21,
    marginBottom: 143,
    marginLeft: 25,
    marginRight: 25,
    "@media (max-width: 800px)": {
      gap: 21,
      marginTop: 19,
      marginBottom: 150,
      marginLeft: 25,
      marginRight: 25,
    },
  },
  v_amount_container: {
    gap: 21,
    width: "100%",
    maxWidth: 974,
    alignSelf: "center",
    "@media (max-width: 768px)": {
      gap: 21,
      width: "100%",
    },
  },
});
