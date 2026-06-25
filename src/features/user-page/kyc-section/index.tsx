import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import SVGIcon from "@/src/constants/SVGIcon";
import { selectedKYCStatus } from "@/src/store/slices/user.slice";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ids, styles } from "./styles.css";

export type Props = { handleClose: () => void };

function KYCSection() {
  const router = useRouter();
  const kycStatus = useAppSelector(selectedKYCStatus);

  const KYCStatusComponent = useMemo(() => {
    switch (kycStatus) {
      case "PENDING":
        return (
          <View style={[styles.row_container, { gap: 10 }]}>
            <SVGIcon name="time" width={18} height={18} />
            <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
              Pending
            </Text>
          </View>
        );
      case "REJECTED":
        return (
          <View style={[styles.row_container, { gap: 10 }]}>
            <SVGIcon name="failed" width={18} height={18} />
            <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
              Rejected
            </Text>
          </View>
        );
      case "VERIFIED":
        return (
          <View style={[styles.row_container, { gap: 10 }]}>
            <SVGIcon name="kyc-verified" />
            <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
              Verified
            </Text>
          </View>
        );
      default:
        return (
          <View style={[styles.row_container, { gap: 10 }]}>
            <SVGIcon name="time" width={18} height={18} />
            <Text color="text" style={styles.text_title} dataSet={{ media: ids.text_title }}>
              Not verified
            </Text>
          </View>
        );
    }
  }, [kycStatus]);

  const handlePress = () => {
    if (kycStatus === "PENDING") {
      router.push("/kyc-verification/pending");
    } else if (kycStatus === "REJECTED") {
      router.push("/kyc-verification/rejected");
    } else if (kycStatus === "VERIFIED") {
      router.push("/kyc-verification/rejected");
    } else {
      router.push("/kyc-verification");
    }
  };

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={[styles.row_container, { justifyContent: "space-between" }]}>
        <View>
          <Text
            color="text"
            fontFamily="Montserrat-SemiBold"
            style={styles.text_title}
            dataSet={{ media: ids.text_title }}
          >
            KYC status
          </Text>
        </View>
        {KYCStatusComponent}
      </View>
      <View style={styles.divider_containera} />
      {kycStatus === "VERIFIED" ? null : (
        <Button
          onPress={handlePress}
          disabled={kycStatus === "VERIFIED"}
          style={[styles.button_kyc, kycStatus === "VERIFIED" && styles.button_kyc_verified]}
          dataSet={{ media: ids.button_kyc }}
        >
          <Text
            color={"textDark"}
            fontFamily="Montserrat-SemiBold"
            style={styles.text_style}
            dataSet={{ media: ids.text_style }}
          >
            {kycStatus === "VERIFIED" ? "View Information" : "Verify Account"}
          </Text>
        </Button>
      )}
    </View>
  );
}

export default KYCSection;
