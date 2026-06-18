import Colors from "@/src/constants/Colors";
import SVGIcon from "@/src/constants/SVGIcon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import Button from "@/src/common/components/Button";
import TextInput from "@/src/common/components/TextInput";
import { RedeemYourRewardsRequirements } from "@/src/constants/static";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import {
  selectedDisplayname,
  selectedKYCStatus,
  selectedUserCoins,
  selectedUserUserID,
} from "@/src/store/slices/user.slice";
import numeral from "numeral";
import Service from "./service";
import InstantPay from "./instant-pay";
import { useRouter } from "expo-router";
import { useRedeemContext } from "./provider";
import StyleSheet from "react-native-media-query";
import React, { useCallback, useState } from "react";
import { useRootContext } from "@/src/context/RootContext";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { RedeemService } from "@/src/api/services/redeem.service";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { PaymentService } from "@/src/api/services/payment.service";
import KYCVerificationModal from "../kyc-verification/kyc-verification-require";

export default function RedeemYourRewards() {
  const router = useRouter();
  const { setErrorMessage } = useRootContext();
  const [visible, setVisible] = useState(false);
  const userId = useAppSelector(selectedUserUserID);
  const balance = useAppSelector(selectedUserCoins);
  const kycStatus = useAppSelector(selectedKYCStatus);
  const displayName = useAppSelector(selectedDisplayname);
  const [instantURL, setInstantURL] = useState<string>("");
  const { state, error, setError, onDispatch, setScreen } = useRedeemContext();

  const instantLink = useMutationApi(PaymentService.instantPayLink, {
    onSuccess: (response) => {
      setInstantURL(response.validation_link);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setError(error.message);
    },
  });

  const { mutate, isPending } = useMutationApi(RedeemService.validateAmount, {
    onSuccess: (response) => {
      setError({ goldAmount: response.reason });
      if (response.isRedeemable) {
        switch (state.serviceType) {
          case "INSTANT":
            instantLink.mutate({ user_id: userId });
            break;
          case "BANK_ACCOUNT":
            setScreen("BANK-INPUT");
            break;
          case "PAYPAL":
            setScreen("PAYPAL-INPUT");
            break;
        }
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = () => {
    if (Number(state.goldAmount) <= 0) {
      return;
    }

    if (Number(state.goldAmount) > balance.GOLD) {
      setError({ goldAmount: "Insufficient Sweepcoins balance." });
      return;
    }

    if (!state.serviceType) {
      setError({ serviceTypeError: "Required" });
      return;
    }

    if (kycStatus === "NOT_SUBMITTED" || !kycStatus) {
      setVisible(true);
      return;
    }

    if (kycStatus === "PENDING") {
      router.push("/kyc-verification/pending");
      return;
    }

    if (kycStatus === "REJECTED") {
      router.push("/kyc-verification/rejected");
      return;
    }

    setError({});
    mutate({ amount: Number(state.goldAmount) });
  };

  const onChangeText = useCallback(
    (value: any) => {
      const numOnly = value?.replace(/[^0-9]/g, "");
      if (error.goldAmount) {
        setError({});
      }
      onDispatch("goldAmount")(numOnly);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [balance.GOLD, error],
  );

  return (
    <>
      <View style={styles.container}>
        <Text fontFamily="PoppinsBold" style={styles.t_redemption}>
          Redemption Requirement
        </Text>
        <Text style={styles.t_hello}>
          Hello, <Text fontFamily="PoppinsMedium">{displayName}</Text>
        </Text>
        <Text style={styles.t_available}>Available Sweepcoins for redemption:</Text>
        <View borderColor="borderColor" style={styles.v_sweeps_balance}>
          <SVGIcon name="sc-coin" width={19} height={19} />
          <Text fontFamily="PoppinsBold" style={styles.t_redemption}>
            {numeral(balance.GOLD).format("0,000")}
          </Text>
        </View>
        <Text color="placeholder" style={styles.t_requirement}>
          {RedeemYourRewardsRequirements}
        </Text>
        <Text style={styles.t_available}>Enter amount to redeem:</Text>
        <View style={{ justifyContent: "center", marginTop: 10 }}>
          <View style={{ position: "absolute", left: 10 }}>
            <SVGIcon name="sc-coin" width={19} height={19} />
          </View>
          <TextInput
            value={state.goldAmount}
            backgroundColor="secondary"
            placeholder="0.00"
            onChangeText={onChangeText}
            style={[styles.ti_input, error.goldAmount && styles.ti_input_error]}
            keyboardType="numeric"
          />
        </View>
        {error?.goldAmount && (
          <Text color="error" style={[styles.t_error_style]}>
            {error?.goldAmount}
          </Text>
        )}
        <Text color="placeholder" style={[styles.t_requirement, { color: "#FBE18A" }]}>
          1 SweepCoins = US$1.00
        </Text>
        <Service />

        <Button
          backgroundColor={Number(state.goldAmount) > 0 ? "goldFlatBorder" : "disabled"}
          disabled={isPending || instantLink.isPending}
          style={styles.button_style}
          dataSet={{ media: ids.button_style }}
          onPress={onSubmit}
        >
          {isPending || instantLink.isPending ? (
            <ActivityIndicator animating size={"small"} color="textDark" />
          ) : (
            <Text color="textDark" fontFamily="PoppinsSemiBold" style={styles.button_label}>
              Redeem
            </Text>
          )}
        </Button>
        <Text color="text" style={styles.t_fees_notes}>
          Fees and charges apply.{"\n"}Read our{" "}
          <Text
            style={{ color: "#FBE18A" }}
            onPress={() => router.push("/(stack)/about/terms-and-conditions")}
          >
            Terms and Conditions
          </Text>{" "}
          for details.
        </Text>

        <KYCVerificationModal visible={visible} onClose={() => setVisible(false)} />
      </View>
      <InstantPay url={instantURL} onClose={() => setInstantURL("")} />
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    padding: 25,
    borderWidth: 1.82,
    borderColor: "#192851",
    borderRadius: 8,
    width: "100%",
    maxWidth: 969,
    alignSelf: "center",
  },
  t_redemption: { fontSize: 20, lineHeight: 29, color: "#FBE18A" },
  t_hello: { fontSize: 16, lineHeight: 20, marginTop: 12 },
  t_available: { fontSize: 14, lineHeight: 18, marginTop: 12 },
  t_requirement: { fontSize: 10, lineHeight: 19, marginTop: 5 },
  t_error_style: { fontSize: 10, lineHeight: 13, marginTop: 5 },

  ti_input: { width: "100%", paddingLeft: 38, height: 45 },
  ti_input_error: { borderColor: Colors.dark.error },

  v_sweeps_balance: {
    marginTop: 8,
    backgroundColor: "#040C1E",
    flexDirection: "row",
    height: 45,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    gap: 10,
  },

  button_style: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginTop: 43,
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
  button_label: { fontSize: 18, lineHeight: 24 },
  t_fees_notes: { fontSize: 12, lineHeight: 16, marginTop: 11, textAlign: "center" },
});
