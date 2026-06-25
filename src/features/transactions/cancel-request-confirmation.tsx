import React from "react";
import SVGIcon from "@/src/constants/SVGIcon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import Button from "@/src/common/components/Button";
import { Modal, StyleSheet as SS } from "react-native";
import { MassPayoutTransaction } from "@/src/store/types";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { MaterialIcon } from "@/src/common/components/Icon";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { PaymentService } from "@/src/api/services/payment.service";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import { useTransactionContext } from "@/src/context/TransactionContext";
import { useQueryClient } from "@tanstack/react-query";
import { selectedUserUserID } from "@/src/store/slices/user.slice";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useLobbyService } from "@/src/store/hooks";

type Props = {
  item: MassPayoutTransaction;
  visible: boolean;
  onClose: () => void;
};

export default function CancelRequestConfirmation(props: Props) {
  const queryClient = useQueryClient();
  const { onUpdateWallet } = useLobbyService();
  const { category } = useTransactionContext();
  const userId = useAppSelector(selectedUserUserID);

  const closeSize = useBreakpoint({
    default: 30,
    large: 28,
    tablet: 25,
    mobile: 25,
  });

  const { mutate, isPending } = useMutationApi(PaymentService.payoutTransactionCancel, {
    onSuccess: () => {
      props.onClose();
      onUpdateWallet({ SILVER: 0, GOLD: Number(props.item.creditAmount), "GOLD BONUS": 0 });
      queryClient.invalidateQueries({
        queryKey: ["redeem-transactions", { userId, redeemStatusIDs: category.redeemStatusID }],
      });
    },
  });

  const handleCancelProceed = () => {
    mutate({ id: props.item.id });
  };

  return (
    <Modal visible={props.visible} transparent animationType="fade">
      <View backgroundColor="translucent" style={styles.modal_container}>
        <View
          backgroundColor="background"
          style={styles.container}
          dataSet={{ media: ids.container }}
        >
          <MaterialIcon
            name="close"
            onPress={props.onClose}
            size={closeSize}
            color={"closeColor"}
            style={styles.button_container}
          />
          <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
            <SVGIcon name="warning" />
            <Text
              fontFamily="Montserrat-Bold"
              color="yellowThick"
              style={styles.t_verify}
              dataSet={{ media: ids.t_verify }}
            >
              Cancel Request
            </Text>
            <Text
              fontFamily="Montserrat-Light"
              style={styles.t_description}
              dataSet={{ media: ids.t_description }}
            >
              This will cancel your redeem request. Are you sure you want to proceed?
            </Text>
            <Button
              disabled={isPending}
              onPress={handleCancelProceed}
              style={styles.button_style}
              dataSet={{ media: ids.button_style }}
            >
              {isPending ? (
                <ActivityIndicator animating size={"small"} color="textDark" />
              ) : (
                <Text
                  color="textDark"
                  fontFamily="Montserrat-SemiBold"
                  style={styles.button_label}
                  dataSet={{ media: ids.button_label }}
                >
                  Yes, Cancel Request
                </Text>
              )}
            </Button>
            <Button
              onPress={props.onClose}
              style={styles.button_cancel_style}
              dataSet={{ media: ids.button_cancel_style }}
            >
              <Text
                fontFamily="Montserrat-SemiBold"
                style={styles.button_label}
                dataSet={{ media: ids.button_label }}
              >
                Go Back
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { ids, styles } = StyleSheet.create({
  modal_container: {
    alignItems: "center",
    justifyContent: "center",
    ...SS.absoluteFill,
  },
  container: {
    width: "100%",
    maxWidth: 450,
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  button_container: {
    right: 19,
    top: 18,
    position: "absolute",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      paddingLeft: 32,
      paddingRight: 32,
    },
  },
  v_redeem_container: {
    gap: 22,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 25,
    marginRight: 25,
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
    "@media (max-width: 800px)": {
      gap: 21,
      marginBottom: 60,
      marginLeft: 25,
      marginRight: 25,
    },
  },
  t_verify: {
    fontSize: 25,
    textAlign: "center",
    lineHeight: 32,
    marginTop: 5,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 23,
      lineHeight: 29,
      marginTop: 4,
    },
    "@media (max-width: 768px)": {
      fontSize: 22,
      lineHeight: 25,
    },
  },
  t_description: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 15,
      lineHeight: 22,
    },
    "@media (max-width: 768px)": {
      fontSize: 14,
      lineHeight: 18,
    },
  },

  button_style: {
    width: "100%",
    height: 50,
    marginTop: 36,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    backgroundColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      width: 377,
      height: 45,
    },
    "@media (min-width: 800px)": {
      maxWidth: 377,
      height: 45,
    },
    "@media (max-width: 768px)": {
      height: 40,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 20,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 15,
      lineHeight: 18,
    },
    "@media (max-width: 768px)": {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  button_cancel_style: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      width: 377,
      height: 45,
    },
    "@media (min-width: 800px)": {
      maxWidth: 377,
      height: 45,
    },
    "@media (max-width: 768px)": {
      height: 40,
    },
  },
});
