import React from "react";
import AmountDetails from "./amount";
import AccountDetails from "./account";
import { Redeem } from "@/src/store/types";
import { useRedeemContext } from "../provider";
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";
import StyleSheet from "react-native-media-query";
import Button from "@/src/common/components/Button";
import { useRootContext } from "@/src/context/RootContext";
import { RedeemService } from "@/src/api/services/redeem.service";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import ScreenTitle from "@/src/common/components/header/screen-title";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";

export default function PaypalReview() {
  const { setErrorMessage } = useRootContext();
  const { state, instrument, setScreen, setOTP } = useRedeemContext();

  const { mutate, isPending } = useMutationApi(RedeemService.save, {
    onSuccess: (response) => {
      console.log("response", response);
      setOTP(response);
      setScreen("OTP-VERIFICATION");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = () => {
    const params = {
      userID: instrument.user_id,
      payoutInstrumentId: instrument.id,
      goldAmount: state.goldAmount,
      redeemType: {
        id: 2,
      },
      paypalEmail: state.paypalEmail,
      paypalUserName: state.paypalEmail,
      paypalFirstName: "Test",
      paypalLastName: "User",
    } as Redeem;

    mutate(params);
  };

  return (
    <>
      <ScreenTitle
        onBack={() => setScreen("PAYPAL-INPUT")}
        options={{ title: "Review your redemption" }}
      />
      <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
        <View style={styles.v_amount_container} dataSet={{ media: ids.v_amount_container }}>
          <AmountDetails />
          <AccountDetails />
          <Button
            disabled={isPending}
            onPress={handleSubmit}
            backgroundColor={"goldFlatBorder"}
            style={styles.button_submit}
          >
            {isPending ? (
              <ActivityIndicator animating size={"small"} color="textDark" />
            ) : (
              <Text fontFamily="PoppinsSemiBold" color="textDark" style={styles.button_label}>
                Confirm and Continue
              </Text>
            )}
          </Button>

          <Button
            onPress={() => setScreen("PAYPAL-INPUT")}
            borderColor={"goldFlatBorder"}
            style={styles.button_back}
          >
            <Text fontFamily="PoppinsSemiBold" color="text" style={styles.button_label}>
              Back to Edit
            </Text>
          </Button>
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
  },
  button_submit: {
    marginTop: 10,
    width: "100%",
    height: 55,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  button_back: {
    marginTop: 4,
    width: "100%",
    height: 55,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button_label: { fontSize: 18, lineHeight: 22 },
});
