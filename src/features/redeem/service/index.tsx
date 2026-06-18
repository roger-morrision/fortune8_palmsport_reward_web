import React from "react";
import numeral from "numeral";
import ServiceItem from "./service-item";
import { useRedeemContext } from "../provider";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";

export default function Service() {
  const { state, error, setError, onDispatch } = useRedeemContext();

  const handleChange = (value: string) => {
    onDispatch("serviceType")(value);
    setError({});
  };

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text
        fontFamily="PoppinsBold"
        color={error.serviceTypeError ? "red" : "yellowThick"}
        style={styles.t_verify}
        dataSet={{ media: ids.t_verify }}
      >
        Select Service
      </Text>

      <View style={{ gap: 16, marginTop: 24 }}>
        <ServiceItem
          title="Instant Pay"
          serviceType="Bank"
          fee={numeral(3.6).format("$0,000.00")}
          isSelect={state.serviceType === "INSTANT"}
          svg={"redeem-bank"}
          onPress={() => handleChange("INSTANT")}
        />
        <ServiceItem
          title="Bank Transfer"
          serviceType="Bank"
          fee={numeral(3.6).format("$0,000.00")}
          svg={"redeem-instant-pay"}
          isSelect={state.serviceType === "BANK_ACCOUNT"}
          onPress={() => handleChange("BANK_ACCOUNT")}
        />
        <ServiceItem
          title="Paypal"
          serviceType="Bank"
          fee={numeral(3.6).format("$0,000.00")}
          svg={"redeem-paypal"}
          isSelect={state.serviceType === "PAYPAL"}
          onPress={() => handleChange("PAYPAL")}
        />
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    marginTop: 30,
    "@media (max-width: 768px)": {
      marginTop: 22,
    },
  },
  t_verify: {
    fontSize: 20,
    lineHeight: 29,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 18,
      lineHeight: 27,
    },
    "@media (max-width: 768px)": {
      fontSize: 17,
      lineHeight: 26,
    },
  },
});
