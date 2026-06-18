import React, { useMemo, useState } from "react";
import moment from "moment";
import numeral from "numeral";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import Button from "@/src/common/components/Button";
import { MassPayoutTransaction } from "@/src/store/types";
import { Ionicon, MaterialIcon } from "@/src/common/components/Icon";
import CancelRequestConfirmation from "./cancel-request-confirmation";
import { redeemTypeName } from "@/src/common/utils/transform-helper";

type Props = {
  item: MassPayoutTransaction;
};

function DisplayItem(props: Props) {
  const { item } = props;
  const [showCancelConfirmation, setShowCancelConfirmation] = useState<boolean>(false);

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
            <Text style={styles.t_status} fontFamily="PoppinsBold" color="inProgress">
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
            <Text style={styles.t_status} fontFamily="PoppinsBold" color="green">
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
            <Text style={styles.t_status} fontFamily="PoppinsBold" color="red">
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
            <Text style={styles.t_status} fontFamily="PoppinsBold" color="red">
              Cancelled
            </Text>
          </View>
        );
    }
  }, [item.redeemStatusID]);

  const renderCancelButton = useMemo(() => {
    switch (item.redeemStatusID) {
      case 2:
        return (
          <Button
            onPress={() => setShowCancelConfirmation(true)}
            style={styles.button_style}
            dataSet={{ media: ids.button_style }}
          >
            <Text
              color="textDark"
              fontFamily="PoppinsSemiBold"
              style={styles.button_label}
              dataSet={{ media: ids.button_label }}
            >
              Cancel Request
            </Text>
          </Button>
        );
    }
  }, [item.redeemStatusID]);

  return (
    <View
      backgroundColor="primary"
      borderColor="blueBorder"
      style={styles.box_container}
      dataSet={{ media: ids.box_container }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 4 }}>
          <Text style={styles.t_label} color="textGray">
            Amount:{" "}
            <Text style={{ color: "#FBE18A" }} fontFamily="PoppinsBold">
              {numeral(item.creditAmount).format("0,000")}
            </Text>
          </Text>
          <Text style={styles.t_label} color="textGray">
            Transaction #:{" "}
            <Text color="text" fontFamily="PoppinsMedium">
              {item.id}
            </Text>
          </Text>
          <Text style={styles.t_label} color="textGray">
            Date Completed:{" "}
            <Text color="text" fontFamily="PoppinsMedium">
              {item.completedDate ? moment(item.completedDate).format("YYYY-MM-DD HH:mm") : ""}
            </Text>
          </Text>
        </View>

        {item.redeemTypeID && (
          <View
            backgroundColor="background"
            style={styles.v_box_payment}
            dataSet={{ media: ids.v_box_payment }}
          >
            <Text
              style={styles.t_status}
              dataSet={{ media: ids.t_status }}
              color="textGray"
              fontFamily="PoppinsBold"
            >
              {redeemTypeName(item.redeemTypeID)}
            </Text>
          </View>
        )}
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#192851" }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.t_label} color="textGray">
          {moment(item.lastUpdatedTime).format("YYYY-MM-DD HH:mm")}
        </Text>
        {renderStatus}
      </View>
      {renderCancelButton}
      <CancelRequestConfirmation
        item={item}
        visible={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
      />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  box_container: {
    gap: 20,
    maxWidth: 707,
    width: "100%",
    minHeight: 131,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 11,
    paddingBottom: 10,
    borderRadius: 9.13,
    borderWidth: 1.83,
    alignSelf: "center",
    justifyContent: "space-between",
    "@media (min-width: 1600px)": {
      paddingLeft: 83,
      paddingRight: 40,
    },
    "@media (min-width: 900px)": {
      paddingLeft: 70,
      paddingRight: 40,
    },
  },
  v_box_payment: {
    flexShrink: 1,
    height: 40,
    marginTop: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#2D4070",
    "@media (max-width: 800px)": {
      height: 30,
      borderRadius: 4,
    },
  },
  t_label: {
    fontSize: 14,
    lineHeight: 16,
  },
  t_status: {
    fontSize: 12,
    lineHeight: 12,
    "@media (max-width: 800px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },

  button_style: {
    width: "100%",
    height: 45,
    // marginTop: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    backgroundColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      height: 45,
    },
    "@media (max-width: 800px)": {
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
});

export default DisplayItem;
