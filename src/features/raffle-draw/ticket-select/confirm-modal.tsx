import React, { useState } from "react";
import { useRouter } from "expo-router";
import SVGIcon from "@/src/constants/SVGIcon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import Button from "@/src/common/components/Button";
import BGButton from "@/src/common/components/BGButton";
import { Modal, StyleSheet as SS } from "react-native";
import { MaterialIcon } from "@/src/common/components/Icon";
import { useMutationApi } from "@/src/common/hooks/useMutationApi";
import { RaffleService } from "@/src/api/services/raffles.service";
import { useQueryClient } from "@tanstack/react-query";
import StyleSheet from "react-native-media-query";
import { useRootContext } from "@/src/context/RootContext";

type Props = {
  visible: boolean;
  raffleId: number;
  tickets: number;
  pgRequired: number;
  onClose: () => void;
};

export default function ConfirmTicketModal({ visible, raffleId, tickets, pgRequired, onClose }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const { setErrorMessage } = useRootContext();

  const { mutate, isPending } = useMutationApi(RaffleService.redeem, {
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["ongoing-raffle"] });
    },
    onError: (error) => {
      onClose();
      setErrorMessage(error.message);
    }
  });

  const handleConfirm = () => {
    mutate({ id: raffleId, numTickets: tickets } as any);
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  const handleBackToHome = () => {
    setSuccess(false);
    onClose();
    router.replace("/");
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View backgroundColor="translucent" style={styles.modal_container}>
        <View backgroundColor="background" style={styles.container} dataSet={{ media: ids.container }}>
          <MaterialIcon
            asButton
            size={28}
            name="close"
            onPress={handleClose}
            color="closeColor"
            style={styles.btn_close}
          />

          {success ? (
            // ── Success view ──────────────────────────────────────────
            <View style={styles.v_content} dataSet={{ media: ids.v_content }}>
              <View style={styles.v_check}>
                <MaterialIcon name="check" size={60} color="background"/>
              </View>
              <Text
                fontFamily="Montserrat-Bold"
                color="text"
                style={styles.t_title}
                dataSet={{ media: ids.t_title }}
              >
                Your entries are successful.{"\n"}Good luck!
              </Text>
              <BGButton
                borderWidth={1}
                label="BACK TO HOME"
                onPress={handleBackToHome}
                style={styles.btn_confirm}
                dataSet={{ media: ids.btn_confirm }}
                fontFamily="Montserrat-Bold"
                labelStyle={styles.label_confirm}
                bgColors={["#DF7B0B", "#E5D33D"]}
                strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
              />
            </View>
          ) : (
            // ── Confirm view ──────────────────────────────────────────
            <View style={styles.v_content} dataSet={{ media: ids.v_content }}>
              <SVGIcon name="warning" fill="#E4BD30" />
              <Text
                fontFamily="Montserrat-Bold"
                color="text"
                style={styles.t_title}
                dataSet={{ media: ids.t_title }}
              >
                You are about to use {pgRequired} PG{" "}
                for {tickets} {tickets === 1 ? "ticket" : "tickets"}
              </Text>

              <BGButton
                borderWidth={1}
                label="CONFIRM"
                isLoading={isPending}
                onPress={handleConfirm}
                style={styles.btn_confirm}
                dataSet={{ media: ids.btn_confirm }}
                fontFamily="Montserrat-Bold"
                labelStyle={styles.label_confirm}
                bgColors={["#DF7B0B", "#E5D33D"]}
                strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
              />

              <Button disabled={isPending} onPress={handleClose} style={styles.btn_cancel}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  color="text"
                  style={styles.label_confirm}
                  dataSet={{ media: ids.label_confirm }}
                >
                  No, I changed my mind
                </Text>
              </Button>
            </View>
          )}
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
    borderRadius: 12,
    overflow: "hidden",
    "@media (max-width: 768px)": {
      width: "90%",
    },
  },
  btn_close: {
    zIndex: 3,
    right: 16,
    top: 16,
    position: "absolute",
  },
  v_content: {
    gap: 16,
    paddingTop: 87,
    paddingBottom: 40,
    alignItems: "center",
    paddingHorizontal: 32,
    "@media (max-width: 768px)": {
      paddingHorizontal: 24,
      paddingTop: 77,
      paddingBottom: 36,
    },
  },
  v_check: {
    width: 109,
    height: 109,
    borderRadius: 109 / 2,
    backgroundColor: "#4CD964",
    alignItems: "center",
    justifyContent: "center",
  },
  t_title: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    marginTop: 8,
    "@media (max-width: 768px)": {
      fontSize: 18,
      lineHeight: 26,
    },
  },
  btn_confirm: {
    width: "100%",
    height: 50,
    marginTop: 12,
    borderRadius: 6,
    backgroundColor: "#EABC34",
    borderColor: "#EABC34",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      height: 44,
    },
  },
  btn_cancel: {
    width: "100%",
    height: 50,
    borderRadius: 6,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      height: 44,
    },
  },
  label_confirm: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.5,
    "@media (max-width: 768px)": {
      fontSize: 13,
      lineHeight: 16,
    },
  },
});
