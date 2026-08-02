import BGButton from "@/src/common/components/BGButton";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useMemo, useState } from "react";
import { Pressable } from "react-native";
import { MaterialIcon } from "@/src/common/components/Icon";
import StyleSheet from "react-native-media-query";
import Select from "@/src/common/components/select";
import ConfirmTicketModal from "@/src/features/raffle-draw/ticket-select/confirm-modal";
import Button from "@/src/common/components/Button";

type Props = {
  raffleId?: number;
  ticketLimit?: number;
  ticketPrice?: number;
};

export default function EliteTicketSelect({ raffleId = 0, ticketLimit = 0, ticketPrice = 0 }: Props) {
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
          <View style={styles.v_col} dataSet={{ media: ids.v_col }}>
            <Text
              fontFamily="Montserrat-SemiBold"
              color="text"
              style={styles.t_label}
              dataSet={{ media: ids.t_label }}
            >
              NUMBER OF PG REQUIRED
            </Text>
            <View style={styles.pg_input} dataSet={{ media: ids.pg_input }}>
              <Text fontFamily="Montserrat" color="closeColor" style={styles.t_dropdown_val}>
                {pgRequired ?? "-"}
              </Text>
            </View>
          </View>

          <Select
            ids={3}
            style={styles.v_col}
            keys={"elite-ticket"}
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
                  SELECT NUMBER OF TICKETS
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
        </View>

        {/* Elite+ hint */}
        <View style={styles.v_hint}>
          <Text fontFamily="Montserrat" style={styles.t_hint}>
            <Text fontFamily="Montserrat-SemiBold" style={styles.t_hint_gold}>
              ★ Elite+ members
            </Text>
            {" get priority access and exclusive ticket discounts on premium draws. No VIP pass required for this draw."}
          </Text>
        </View>

        <Button
          backgroundColor={tickets != null ? "#C9A84C1F" : "#3A3A3A"}
          borderColor={tickets != null ? "#8A6A1E" : "#555"}
          disabled={tickets == null}
          onPress={() => tickets != null && setShowConfirm(true)}
          style={styles.btn_confirm}
          dataSet={{ media: ids.btn_confirm }}
        >
          <Text
            color="#C9A84C"
            style={styles.label_confirm}
            dataSet={{ media: ids.label_confirm }}
          >
            CONFIRM
          </Text>
        </Button>
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
    justifyContent: "center",
    borderRadius: 10,
    overflow: "visible",
    padding: 24,
    borderWidth: 2,
    borderColor: "#3A2800",
    backgroundColor: "#1A1000",
    "@media (max-width: 800px)": {
      borderRadius: 8,
      padding: 20,
      width: "100%",
    },
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
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
    color: "#C9A84C",
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
    },
  },
  dropdown_btn: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#3A2800",
    borderRadius: 6,
    paddingLeft: 14,
    backgroundColor: "#0D0800",
  },
  dropdown_arrow: {
    width: 50,
    borderRadius: 6,
    borderWidth: 1,
    height: "100%",
    borderColor: "#3A2800",
    backgroundColor: "#1A1000",
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
    borderColor: "#3A2800",
    borderRadius: 6,
    paddingHorizontal: 14,
    backgroundColor: "#0D0800",
  },
  v_hint: {
    marginTop: 16,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "rgba(201,168,76,0.08)",
    borderWidth: 1,
    borderColor: "rgba(201,168,76,0.2)",
  },
  t_hint: {
    fontSize: 12,
    lineHeight: 18,
    color: "#C9A84C",
    opacity: 0.9,
  },
  t_hint_gold: {
    color: "#E8C84A",
  },
  btn_confirm: {
    marginTop: 20,
    height: 41,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      height: 48,
    },
  },
  label_confirm: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1,
  },
});
