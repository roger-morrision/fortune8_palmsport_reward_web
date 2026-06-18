import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { PaymentService } from "@/src/api/services/payment.service";
import { useRootContext } from "@/src/context/RootContext";
import { selectedUserUserID } from "@/src/store/slices/user.slice";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import Button from "@/src/common/components/Button";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import { useRedeemContext } from "../provider";
import { Redeem } from "@/src/store/types";
import { RedeemService } from "@/src/api/services/redeem.service";

type Props = {
  url: string;
  onClose: () => void;
};

const InstantPay = (props: Props) => {
  const { setErrorMessage } = useRootContext();
  const userId = useAppSelector(selectedUserUserID);
  const [loading, setLoading] = useState<boolean>(true);
  const { state, setScreen, setInstrument, setOTP } = useRedeemContext();

  const sendOtp = useMutationApi(RedeemService.save, {
    onSuccess: (response) => {
      props.onClose();
      setOTP(response);
      setScreen("OTP-VERIFICATION");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const instantPayInstrument = useMutationApi(PaymentService.instantPayInstrument, {
    onSuccess: (response) => {
      console.log("responseresponse", response)
      setInstrument(response);
      const params = {
        userID: response.user_id,
        payoutInstrumentId: response.id,
        goldAmount: state.goldAmount,
        redeemType: {
          id: 9,
        },
      } as Redeem;

      sendOtp.mutate(params);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("RAW", event.data);

      let data: any = event.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data.action === "submit") {
        console.log("SUCCESS", data);
        instantPayInstrument.mutate({
          user_id: userId,
          attribute_token: data.attr_set_token,
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Modal transparent visible={Boolean(props.url)} onRequestClose={props.onClose}>
      <View backgroundColor="text" style={styles.container} dataSet={{ media: ids.container }}>
        {loading ||
          sendOtp.isPending ||
          (instantPayInstrument.isPending && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating size={30} color="textDark" />
              <Text color="textDark">Please wait...</Text>
            </View>
          ))}
        <iframe
          src={props.url}
          style={{
            flex: 1,
            border: "none",
          }}
          onLoad={() => setLoading(false)}
        />
        <Button
          onPress={props.onClose}
          style={styles.button_close}
          dataSet={{ media: ids.button_close }}
        >
          <MaterialIcon disabled name="cancel" size={20} color="textDark" />
          <Text color="textDark" style={styles.text_close} dataSet={{ media: ids.text_close }}>
            Close
          </Text>
        </Button>
      </View>
    </Modal>
  );
};

const { ids, styles } = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginTop: "2%",
    width: "70%",
    height: "94%",
    borderWidth: 2,
    alignSelf: "center",
    backgroundColor: "white",
    "@media (max-width: 800px)": {
      width: "90%",
    },
  },
  loadingContainer: {
    gap: 10,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button_close: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },
  text_close: {
    fontSize: 15,
    lineHeight: 17,
  },
});

export default InstantPay;
