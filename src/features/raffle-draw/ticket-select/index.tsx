import BGButton from "@/src/common/components/BGButton";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useMemo, useState } from "react";
import { Pressable } from "react-native";
import { MaterialIcon } from "@/src/common/components/Icon";
import StyleSheet from "react-native-media-query";
import Select from "@/src/common/components/select";
import ConfirmTicketModal from "./confirm-modal";

type Props = {
  raffleId?: number;
  ticketLimit?: number;
  ticketPrice?: number;
};

export default function TicketSelect({ raffleId = 0, ticketLimit = 0, ticketPrice = 0 }: Props) {
  const [tickets, setTickets] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const ticketOptions = useMemo(
    () => Array.from({ length: ticketLimit }, (_, i) => i + 1),
    [ticketLimit],
  );

  const pgRequired = tickets != null ? tickets * ticketPrice : null;


  return (
    <>
      <View style={styles.container as any} dataSet={{ media: ids.container }}>
        <View style={styles.v_row} dataSet={{ media: ids.v_row }}>
          <Select
            ids={2}
            keys={"ticket"}
            selectedKey={"dropdownKey"}
            options={ticketOptions}
            value={tickets ?? "-"}
            labelKey="name"
            onSelected={setTickets}
            onSelectedKeys={() => {}}
            renderBase={(props) => (
              <View style={styles.v_col} dataSet={{ media: ids.v_col }}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  color="text"
                  style={styles.t_label}
                  dataSet={{ media: ids.t_label }}
                >
                  Select No. Of Tickets
                </Text>
                <Pressable
                  style={styles.dropdown_btn}
                  dataSet={{ media: ids.dropdown_btn }}
                  onPress={() => {
                    props.setVisible(!props.isVisible);
                    props.setFocus(false);
                  }}
                >
                  <Text fontFamily="Montserrat" color="text" style={styles.t_dropdown_val}>
                    {tickets ?? "-"}
                  </Text>
                  <MaterialIcon
                    disabled
                    name={props.isVisible ? "expand-less" : "expand-more"}
                    style={styles.dropdown_arrow}
                    size={22}
                    color="closeColor"
                  />
                </Pressable>
              </View>
            )}
          />

          <View style={styles.v_col} dataSet={{ media: ids.v_col }}>
            <Text
              fontFamily="Montserrat-SemiBold"
              color="text"
              style={styles.t_label}
              dataSet={{ media: ids.t_label }}
            >
              No. Of PG Required
            </Text>
            <View style={styles.pg_input} dataSet={{ media: ids.pg_input }}>
              <Text fontFamily="Montserrat" color="closeColor" style={styles.t_dropdown_val}>
                {pgRequired ?? "-"}
              </Text>
            </View>
          </View>
        </View>

        <BGButton
          label="CONFIRM"
          disabled={tickets == null}
          onPress={() => tickets != null && setShowConfirm(true)}
          style={styles.btn_confirm}
          dataSet={{ media: ids.btn_confirm }}
          fontFamily="Montserrat-SemiBold"
          labelStyle={styles.label_confirm}
          bgColors={tickets != null ? ["#DF7B0B", "#E5D33D"] : ["#3A3A3A", "#3A3A3A"]}
          strokeColors={
            tickets != null
              ? ["#E4C234", "#FFFFAAE3", "#E08A14"]
              : ["#555", "#555", "#555"]
          }
        />
      </View>

      {tickets != null && pgRequired != null && (
        <ConfirmTicketModal
          visible={showConfirm}
          raffleId={raffleId}
          tickets={tickets}
          pgRequired={pgRequired}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: "visible",
    padding: 24,
    borderWidth: 2,
    borderColor: "#1C3470",
    backgroundColor: "#09183B",
    "@media (max-width: 800px)": {
      borderRadius: 8,
      padding: 20,
      width: "100%",
    },
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  v_row: {
    gap: 16,
    zIndex: 11,
    flexDirection: "row",
    "@media (max-width: 800px)": {
      flexDirection: "column",
      gap: 0,
      width: "50%",
      alignSelf: "center",
    },
  },
  v_col: {
    flex: 1,
    "@media (max-width: 800px)": {
      marginTop: 16,
    },
  },
  t_label: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
    "@media (max-width: 800px)": {
      fontSize: 15,
      lineHeight: 20,
    },
  },
  dropdown_btn: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#21366E",
    borderRadius: 6,
    paddingLeft: 14,
    backgroundColor: "#0D1A3F",
  },
  dropdown_arrow: {
    width: 50,
    borderRadius: 6,
    borderWidth: 1,
    height: "100%",
    borderColor: "#1C3470",
    backgroundColor: "#0B1053",
    alignItems: "center",
    justifyContent: "center",
  },
  t_dropdown_val: {
    width: "70%",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 20,
  },
  pg_input: {
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#21366E",
    borderRadius: 6,
    paddingHorizontal: 14,
    backgroundColor: "#0D1A3F",
    "@media (max-width: 800px)": {
      paddingVertical: 12,
    },
  },
  btn_confirm: {
    marginTop: 20,
    height: 44,
    width: "100%",
    "@media (max-width: 800px)": {
      height: 48,
    },
  },
  label_confirm: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1,
  },
});
