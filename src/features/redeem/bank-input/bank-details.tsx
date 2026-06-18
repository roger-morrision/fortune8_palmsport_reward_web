import React from "react";
import _ from "lodash";
import { useRouter } from "expo-router";
import { useRedeemContext } from "../provider";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import Button from "@/src/common/components/Button";
import Select from "@/src/common/components/select";
import TextInput from "@/src/common/components/TextInput";
import { MaterialIcon } from "@/src/common/components/Icon";
import { CreatePayoutInstrument } from "@/src/store/types";
import { PaymentService } from "@/src/api/services/payment.service";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { selectedUserEmail } from "@/src/store/slices/user.slice";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useRootContext } from "@/src/context/RootContext";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";

function BankDetails() {
  const router = useRouter();
  const { setErrorMessage } = useRootContext();
  const email = useAppSelector(selectedUserEmail);
  const { error, state, setError, onDispatch, setScreen, setInstrument } = useRedeemContext();

  const { mutateAsync, isPending } = useMutationApi(
    async (result) => {
      const user = await PaymentService.lookup({
        email: result.params.email,
      });

      const payloadPayoutInstrument = {
        bank_deposit_sub_type: result.params.serviceType,
      } as CreatePayoutInstrument;

      if (result.params.serviceType === "PAYPAL") {
        payloadPayoutInstrument.attribute_payload = {
          paypal_email: result.params.paypalEmail,
        };
      } else if (result.params.serviceType === "BANK_ACCOUNT") {
        payloadPayoutInstrument.attribute_payload = {
          paypal_email: result.params.paypalEmail,
          bank_account_number: result.params.bankAccountNumber,
          bank_routing_number: result.params.bankIbanIbcCode,
          bank_account_type: result.params.accountType,
        };
      }

      return PaymentService.createPayoutInstrument(user.internal_user_id, payloadPayoutInstrument);
    },
    {
      onSuccess: (response) => {
        console.log("response", response);
        setInstrument(response);
        setScreen("BANK-DETAILS");
      },
      onError: (error) => {
        const acceptedKeys = error?.data?.details?.acceptedKeys;

        const details =
          Array.isArray(acceptedKeys) && acceptedKeys.length > 0
            ? ` Accepted keys: ${acceptedKeys.join(", ")}`
            : "";

        setErrorMessage(`${error?.message || "Something went wrong"}${details}`);
      },
    },
  );

  const handleSubmit = () => {
    const newError: Record<string, string> = {};

    if (!state.accountType) {
      newError["accountType"] = "Required";
    }
    if (!state.bankAccountNumber) {
      newError["bankAccountNumber"] = "Required";
    }
    if (!state.bankIbanIbcCode) {
      newError["bankIbanIbcCode"] = "Required";
    } else if (state.bankIbanIbcCode.length !== 9) {
      newError["bankIbanIbcCode"] = "Please enter a valid 9-digit routing number.";
    }

    setError(newError);

    if (!_.isEmpty(newError)) return;

    mutateAsync({ email, ...state });
  };

  return (
    <>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Text fontFamily="PoppinsBold" style={styles.t_title}>
          Enter Account Details:
        </Text>
        <View style={{ gap: 21, marginTop: 10 }}>
          <View style={{ zIndex: 2 }}>
            <Select
              ids={1}
              keys={"accountType"}
              selectedKey={"dropdownKey"}
              options={["Checking", "Savings"]}
              placeholder="Bank Account Type *"
              value={state?.accountType}
              inputStyle={[styles.input_style, error.accountType && styles.input_error_style]}
              onSelected={onDispatch("accountType")}
              onSelectedKeys={() => {}}
            />
            {error.accountType && (
              <Text
                style={styles.text_error_bottom_style}
                dataSet={{ media: ids.text_error_bottom_style }}
                fontFamily="PoppinsLight"
              >
                {error.accountType}
              </Text>
            )}
          </View>
          <View>
            <TextInput
              placeholder="Bank Account Number *"
              style={[styles.input_style, error?.bankAccountNumber && styles.input_error_style]}
              value={state.bankAccountNumber}
              keyboardType="numeric"
              onChangeText={onDispatch("bankAccountNumber")}
              dataSet={{ media: ids.input_style }}
              backgroundColor="secondary"
            />
            {error?.bankAccountNumber && (
              <Text color="error" style={[styles.t_error_style]}>
                {error?.bankAccountNumber}
              </Text>
            )}
          </View>
          <View>
            <TextInput
              placeholder="Bank Routing Number *"
              style={[styles.input_style, error?.bankIbanIbcCode && styles.input_error_style]}
              value={state.bankIbanIbcCode}
              keyboardType="numeric"
              onChangeText={onDispatch("bankIbanIbcCode")}
              dataSet={{ media: ids.input_style }}
              backgroundColor="secondary"
            />
            {error?.bankIbanIbcCode && (
              <Text color="error" style={[styles.t_error_style]}>
                {error?.bankIbanIbcCode}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 13, alignItems: "center" }}>
        <Button
          backgroundColor={state.isTermsCheck ? "button" : "tertiary"}
          onPress={() => onDispatch("isTermsCheck")(!state.isTermsCheck)}
          style={styles.v_check_container}
        >
          {state.isTermsCheck && <MaterialIcon disabled name="check" size={15} />}
        </Button>
        <Text color="placeholder" style={styles.t_aggree}>
          I agree to PalmsPlay Rewards{" "}
          <Text
            style={{ color: "#FBE18A" }}
            onPress={() => router.push("/about/terms-and-conditions")}
          >
            Terms and Conditions
          </Text>
        </Text>
      </View>
      <Button
        backgroundColor={state.isTermsCheck ? "goldFlatBorder" : "disabled"}
        disabled={!state.isTermsCheck || isPending}
        onPress={handleSubmit}
        style={styles.button_submit}
      >
        {isPending ? (
          <ActivityIndicator animating size={"small"} color="textDark" />
        ) : (
          <Text fontFamily="PoppinsSemiBold" color="textDark" style={styles.button_label}>
            Submit
          </Text>
        )}
      </Button>
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    zIndex: 1,
    padding: 20,
    paddingTop: 25,
    paddingBottom: 39,
    borderWidth: 1.82,
    borderColor: "#192851",
    borderRadius: 8,
  },
  v_check_container: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#343C54",
    borderRadius: 5,
  },
  t_title: { fontSize: 16, lineHeight: 18, marginBottom: 6 },

  t_aggree: { fontSize: 14, lineHeight: 18 },

  input_style: {
    height: 51,
    borderRadius: 5,
    paddingLeft: 15,
    "@media (max-width: 800px)": {
      height: 48,
      borderRadius: 5,
    },
  },
  input_error_style: {
    borderColor: "red",
  },
  t_error_style: { fontSize: 10, lineHeight: 13, marginTop: 5 },

  text_error_bottom_style: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 13,
    color: "red",
    "@media (min-width: 800px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },

  button_submit: {
    marginTop: 10,
    width: "100%",
    height: 60,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  button_label: { fontSize: 18, lineHeight: 22 },
});

export default BankDetails;
