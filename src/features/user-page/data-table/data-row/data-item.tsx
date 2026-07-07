import React, { useMemo } from "react";
import { ids, styles } from "./styles.css";
import { DataRowItem, HeaderItem } from "./types";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import moment from "moment";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import numeral from "numeral";
import { Ionicon, MaterialIcon } from "@/src/common/components/Icon";

type DataItemProps = {
  item: DataRowItem;
  headers: HeaderItem[];
  isfirst: boolean;
  islast: boolean;
  isEven: boolean;
};

const DataItem = (props: DataItemProps) => {
  const { item, headers, isEven } = props;
  const isMobile = useBreakpoint({ mobile: true, default: false });
  const renderStatus = useMemo(() => {
    switch (item.redeemStatusID) {
      default:
      case 1:
      case 2:
      case 3:
      case 4:
      case 7:
      case 9:
      case 13:
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicon
              size={18}
              name="time-outline"
              backgroundColor="transparent"
              color="inProgress"
            />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="inProgress">
              In Progress
            </Text>
          </View>
        );
      case 5:
      case 12:
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <MaterialIcon
              name="check-circle-outline"
              backgroundColor="transparent"
              size={18}
              color="green"
            />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="green">
              Completed
            </Text>
          </View>
        );
      case 6:
      case 8:
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <MaterialIcon name="block" backgroundColor="transparent" size={18} color="red" />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="red">
              Rejected
            </Text>
          </View>
        );
      case 10:
      case 11:
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <MaterialIcon name="block" backgroundColor="transparent" size={18} color="red" />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="red">
              Cancelled
            </Text>
          </View>
        );
    }
  }, [item.redeemStatusID]);

  if (isMobile) {
   

    return (
      <View style={styles.card} dataSet={{ media: ids.card }}>
        <View style={{ gap: 4 }}>
          <Text style={styles.t_label} color="textGray">
            Entries:{" "}
            <Text style={{ color: "#FBE18A" }} fontFamily="Montserrat-Bold">
              {numeral(item.numberOfEntries).format("0,000")}
            </Text>
          </Text>
          <Text style={styles.t_label} color="textGray">
            Amount in PG:{" "}
            <Text fontFamily="Montserrat-Bold">
              {numeral(item.amount).format("0,000")}
            </Text>
          </Text>
          <Text style={styles.t_label} color="textGray">
            Promo:{" "}
            <Text color="text" fontFamily="Montserrat-Medium">
              {item.name as any}
            </Text>
          </Text>
          <Text style={styles.t_label} color="textGray">
            Description:{" "}
            <Text color="text" fontFamily="Montserrat-Medium">
              {item.description as any}
            </Text>
          </Text>
        </View>
        <View style={{ width: "100%", height: 1, marginVertical: 10, backgroundColor: "#1C3470" }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.t_label} color="textGray">
            {moment(item.date as any).format("YYYY-MM-DD | hh:mm:ss")}
          </Text>
          {renderStatus}
        </View>
      </View>
    );
  }

  return (
    <View
      pointerEvents="box-none"
      style={[styles.r_style, isEven && { backgroundColor: "transparent" }]}
      dataSet={{ media: ids.r_style }}
    >
      {headers.map((header) => (
        <View key={header.id} style={[styles.c_style, header.cellStyle]}>
          <Text
            style={[styles.text_style]}
            dataSet={{ media: ids.text_style }}
          >
            {item[header.id] != null ? String(item[header.id]) : "—"}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default DataItem;
