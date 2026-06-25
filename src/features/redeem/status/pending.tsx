import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import SVGIcon from "@/src/constants/SVGIcon";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import StyleSheet from "react-native-media-query";
import { useRedeemContext } from "../provider";
import numeral from "numeral";
import moment from "moment";

export default function RequestInProgress() {
  const router = useRouter();
  const { handleFormReset, setScreen } = useRedeemContext();
  const size = useBreakpoint({
    default: {
      width: 125,
      height: 125,
    },
  });

  return (
    <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
      <SVGIcon name="time" {...size} />
      <Text fontFamily="Montserrat-Bold" style={styles.t_verify} dataSet={{ media: ids.t_verify }}>
        Your Request is in progress
      </Text>
      <Text
        fontFamily="Montserrat-Light"
        color="closeColor"
        style={styles.t_description}
        dataSet={{ media: ids.t_description }}
      >
        Your request is being processed. We’ll notify you once it’s done.
      </Text>

      <TransactionDetails />

      <Button
        onPress={() => {
          handleFormReset();
          setScreen("MAIN");
          router.navigate("/");
        }}
        style={styles.button_style}
        dataSet={{ media: ids.button_style }}
      >
        <Text
          color="textDark"
          fontFamily="Montserrat-SemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Back to Home
        </Text>
      </Button>

      <Text
        color="blueLight"
        fontFamily="Montserrat-Bold"
        onPress={() => router.navigate("/transactions")}
        style={styles.t_view_transaction_log}
        dataSet={{ media: ids.t_view_transaction_log }}
      >
        View Transaction Log
      </Text>
    </View>
  );
}

function maskString(value: string) {
  if (value.length <= 4) return value;

  return "*".repeat(value.length - 4) + value.slice(-4);
}

function TransactionDetails() {
  const { state, payout } = useRedeemContext();
  console.log("statestate", state);

  return (
    <View backgroundColor="primary" style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="Montserrat-Bold" style={styles.t_details_description}>
        Request details:
      </Text>
      <Item
        label="Amount Redeemed:"
        value={
          <View style={styles.v_sweeps_balance}>
            <SVGIcon name="sc-coin" width={17} height={17} />
            <Text
              fontFamily="Montserrat-Bold"
              style={styles.t_redemption}
              dataSet={{ media: ids.t_redemption }}
            >
              {numeral(state.goldAmount).format("0,000.00")}
            </Text>
          </View>
        }
      />
      <Item label="Transaction ID:" value={String(payout.id)} />

      {state.serviceType === "INSTANT" && (
        <>
          {payout?.pickupCode ? <Item label="Pick up code:" value={payout?.pickupCode} /> : null}
          {payout?.expiration ? (
            <Item
              label="Expiration:"
              value={moment(payout?.expiration).format("YYYY-MM-DD | hh:mm:ss")}
            />
          ) : null}
          {payout?.estimatedPayoutTime ? (
            <Item
              label="Estimated Availablity:"
              value={moment(payout?.estimatedPayoutTime).format("YYYY-MM-DD | hh:mm:ss")}
            />
          ) : null}
        </>
      )}

      {state.serviceType === "BANK_ACCOUNT" && (
        <>
          <Item label="Account Type:" value={state.accountType} />
          {state.bankAccountNumber && (
            <Item label="Account Number:" value={maskString(state.bankAccountNumber)} />
          )}
          {state.bankIbanIbcCode && (
            <Item label="Routing Number:" value={maskString(state.bankIbanIbcCode)} />
          )}
        </>
      )}
      {state.serviceType === "PAYPAL" && (
        <Item label="Paypal Email Address:" value={state.paypalEmail} />
      )}
    </View>
  );
}

function Item(props: { label: string; value: string | ReactNode }) {
  return (
    <View style={styles.v_item_row}>
      <Text color="placeholder" style={styles.t_label}>
        {props.label}
      </Text>

      {typeof props.value === "string" ? (
        <Text color="text" fontFamily="Montserrat-Bold" style={styles.t_label}>
          {props.value}
        </Text>
      ) : (
        props.value
      )}
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  v_redeem_container: {
    gap: 22,
    marginTop: 39,
    marginBottom: 140,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    alignItems: "center",
    "@media (max-width: 800px)": {
      gap: 21,
      marginTop: 19,
      width: "92%",
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
    textAlign: "center",
    lineHeight: 25,
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },

  button_style: {
    width: "100%",
    height: 60,
    marginTop: 36,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    backgroundColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 20,
  },

  t_view_transaction_log: {
    marginTop: 15,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 22,
    textDecorationLine: "underline",
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 18,
    },
  },

  // TRANSACTION DETAILS
  container: {
    width: "100%",
    gap: 12,
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
  t_details_description: { fontSize: 18, lineHeight: 22, marginBottom: 5 },
  v_item_row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  v_sweeps_balance: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    gap: 10,
  },
  t_redemption: { fontSize: 14, lineHeight: 18, color: "#FBE18A" },
  t_label: { fontSize: 14, lineHeight: 18 },
});
