import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import { Ionicon, MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { redeemStatusName, redeemTypeName } from "@/src/common/utils/transform-helper";
import { useAssetContext } from "@/src/context/AssetContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import moment from "moment";
import numeral from "numeral";
import React, { useCallback, useMemo } from "react";
import { Image, Pressable } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  item: any;
};

function DisplayItem(props: Props) {
  const { item } = props;
  const router = useRouter();

  const renderStatus = useMemo(() => {
    switch (item?.extras?.status) {
      default:
      case 1:
      case 2:
      case 3:
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicon
              name="time-outline"
              backgroundColor="transparent"
              size={18}
              color="inProgress"
            />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="inProgress">
              {redeemStatusName(item?.extras?.status)}
            </Text>
          </View>
        );
      case 5:
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
              {redeemStatusName(item?.extras?.status)}
            </Text>
          </View>
        );
      case 6:
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <MaterialIcon name="block" backgroundColor="transparent" size={18} color="red" />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="red">
              {redeemStatusName(item?.extras?.status)}
            </Text>
          </View>
        );
    }
  }, [item?.extras?.status]);

  const handlePressItem = useCallback(() => {
    if (item.notificationTypeId === 6) {
      router.push({
        pathname: "/(modal)/kyc-verification-result",
        params: {
          id: item.id,
          kycStatus: item?.extras?.kycStatus,
        },
      });
      return;
    }
    router.navigate("/transactions");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.notificationTypeId]);

  if (item.notificationTypeId === 6) {
    return <KYCItem {...props} onPress={handlePressItem} />;
  }

  return (
    <Pressable onPress={handlePressItem}>
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
              <Text style={{ color: "#FBE18A" }} fontFamily="Montserrat-Bold">
                {numeral(item?.extras?.goldAmount).format("$0,000")}
              </Text>
            </Text>
            <Text style={styles.t_label} color="textGray">
              Transaction #:{" "}
              <Text color="text" fontFamily="Montserrat-Medium">
                {item?.extras?.transactionNo}
              </Text>
            </Text>
            <Text style={styles.t_label} color="textGray">
              Date Completed:{" "}
              <Text color="text" fontFamily="Montserrat-Medium">
                {item?.extras?.completedDate
                  ? moment(item?.extras?.completedDate).format("YYYY-MM-DD HH:mm")
                  : ""}
              </Text>
            </Text>
          </View>
          <View backgroundColor="background" style={styles.v_box_payment}>
            <Text style={styles.t_type} color="textGray" fontFamily="Montserrat-Bold">
              {redeemTypeName(item?.extras.type)}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", height: 1, backgroundColor: "#192851" }} />
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={styles.t_label} color="textGray">
            {moment(item.enrollmentDate).format("YYYY-MM-DD HH:mm")}
          </Text>
          {renderStatus}
        </View>
      </View>
    </Pressable>
  );
}

type KYCItemProps = {
  onPress: () => void;
} & Props;

function KYCItem(props: KYCItemProps) {
  const { item } = props;
  const { images } = useAssetContext();

  const renderStatus = useMemo(() => {
    switch (item?.extras?.kycStatus) {
      case "REJECTED":
        return (
          <View
            style={{ flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" }}
          >
            <MaterialIcon name="block" backgroundColor="transparent" size={18} color="red" />
            <Text style={styles.t_status} fontFamily="Montserrat-Bold" color="inProgress">
              {redeemStatusName(item?.extras?.status)}
            </Text>
          </View>
        );
      case "VERIFIED":
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
              {redeemStatusName(item?.extras?.status)}
            </Text>
          </View>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.extras?.kycStatus]);

  const thumbnail = useMemo(() => {
    const parsedExtras = parseExtras(item.extras);
    const kycStatus = parsedExtras?.kycStatus ?? "";
    const notificationTypeId = item.notificationTypeId;

    if (notificationTypeId === 6 && kycStatus === "VERIFIED") {
      return { uri: images?.["kyc-verified"].uri };
    } else if (notificationTypeId === 6 && kycStatus === "REJECTED") {
      return { uri: images?.["kyc-failed"].uri };
    }
  }, [item, images]);

  return (
    <Pressable onPress={props.onPress}>
      <View
        backgroundColor="primary"
        borderColor="blueBorder"
        style={styles.box_container}
        dataSet={{ media: ids.box_container }}
      >
        <View style={styles.kyc_row_container} dataSet={{ media: ids.kyc_row_container }}>
          <View style={styles.banner_container} dataSet={{ media: ids.banner_container }}>
            <LinearGradient colors={["#FADD23", "#9D8804"]} style={styles.linear_container}>
              <ActivityIndicator
                size="small"
                animating
                color="background"
                style={{ position: "absolute" }}
              />
              <Image style={styles.image_style} source={thumbnail} resizeMode="stretch" />
            </LinearGradient>
          </View>
          <View style={styles.description_container} dataSet={{ media: ids.description_container }}>
            <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
              {item.subject}
            </Text>
            <Text
              color="textGray"
              style={styles.text_description}
              dataSet={{ media: ids.text_description }}
            >
              {item?.extras?.kycStatus === "VERIFIED"
                ? "Your submitted documents have been approved and your account is now verified."
                : "Your verification was unsuccessful. Please review your details and try again."}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", height: 1, backgroundColor: "#192851" }} />
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={styles.t_label} color="textGray">
            {moment(item.enrollmentDate).format("YYYY-MM-DD HH:mm")}
          </Text>
          {renderStatus}
        </View>
      </View>
    </Pressable>
  );
}

const parseExtras = (extras: unknown): Record<string, any> => {
  if (typeof extras === "string") {
    try {
      return JSON.parse(extras);
    } catch {
      return {};
    }
  }

  if (typeof extras === "object" && extras !== null) {
    return extras as Record<string, any>;
  }

  return {};
};

const { ids, styles } = StyleSheet.create({
  box_container: {
    gap: 20,
    maxWidth: 707,
    width: "100%",
    minHeight: 131,
    paddingTop: 17,
    paddingLeft: 17,
    paddingRight: 13,
    paddingBottom: 12,
    borderRadius: 9.13,
    borderWidth: 1.83,
    alignSelf: "center",
    justifyContent: "space-between",
    "@media (min-width: 1600px)": {},
    "@media (min-width: 900px)": {},
  },
  kyc_row_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  v_box_payment: {
    width: 53,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#2D4070",
  },
  t_label: {
    fontSize: 14,
    lineHeight: 16,
  },
  t_type: {
    fontSize: 9.66,
    lineHeight: 13,
  },
  t_status: {
    fontSize: 12,
    lineHeight: 14,
  },

  banner_container: {
    width: 100,
    height: 75,
    "@media (max-width: 800px)": {
      width: 130,
      height: 98,
    },
  },
  linear_container: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image_style: { width: "100%", height: "100%", borderRadius: 6 },
  description_container: {
    gap: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 400px)": {
      gap: 5,
    },
  },
  text_title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    "@media (max-width: 400px)": {
      fontSize: 13,
      lineHeight: 15,
    },
  },
  text_description: {
    fontFamily: "Montserrat-Light",
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
    "@media (max-width: 400px)": {
      fontSize: 9,
      lineHeight: 11,
    },
  },
});

export default DisplayItem;
