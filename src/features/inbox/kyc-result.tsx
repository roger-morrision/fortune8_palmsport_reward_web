import { MaterialIcon } from "@/src/common/components/Icon";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet as SS } from "react-native";
import StyleSheet from "react-native-media-query";
import Text from "@/src/common/components/Text";
import { useAssetContext } from "@/src/context/AssetContext";
import Button from "@/src/common/components/Button";
import { useApi } from "@/src/common/hooks/useApi";
import { NotificationService } from "@/src/api/services/notification.service";

export default function KYCResult() {
  const router = useRouter();
  const { images } = useAssetContext();
  const { id, kycStatus = "" } = useLocalSearchParams();

  const { execute, abort } = useApi(NotificationService.read, {
    onSuccess: ({ data }: any) => {},
    onError: (e) => {
      console.log("error", e);
    },
  });

  const size = useBreakpoint({
    default: {
      width: 158,
      height: 102,
    },
    xlarge: {
      width: 200,
      height: 110,
    },
    large: {
      width: 200,
      height: 110,
    },
  });

  const closeSize = useBreakpoint({
    default: 30,
    large: 28,
    tablet: 25,
    mobile: 25,
  });

  const onClose = () => {
    router.navigate("/");
  };

  const handleVerifyAgain = () => {
    if (kycStatus === "VERIFIED") {
      router.navigate("/");
    } else {
      router.push("/kyc-verification/start-process");
    }
  };

  useEffect(() => {
    if (id) {
      execute(id);
    }

    return () => abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <View style={styles.modal_container}>
      <View
        backgroundColor="background"
        style={styles.container}
        dataSet={{ media: ids.container }}
      >
        <MaterialIcon
          name="close"
          onPress={onClose}
          size={closeSize}
          color={"closeColor"}
          style={styles.button_container}
        />
        <Image
          style={{ ...size }}
          source={{
            uri:
              kycStatus === "VERIFIED"
                ? images?.["kyc-verification-verified"].uri
                : images?.["kyc-verification-failed"].uri,
          }}
          resizeMode="contain"
        />
        <Text
          fontFamily="Montserrat-Bold"
          color="yellowThick"
          style={styles.t_verify}
          dataSet={{ media: ids.t_verify }}
        >
          {kycStatus === "VERIFIED" ? "KYC Verified!" : "KYC Verification Failed!"}
        </Text>
        <Text
          fontFamily="Montserrat-Light"
          style={styles.t_description}
          dataSet={{ media: ids.t_description }}
        >
          {kycStatus === "VERIFIED"
            ? "Your submitted documents have been approved and your account is now verified."
            : "Your verification was unsuccessful. Please review your details and try again."}
        </Text>
        <Button
          onPress={handleVerifyAgain}
          style={styles.button_style}
          dataSet={{ media: ids.button_style }}
        >
          <Text
            color="textDark"
            fontFamily="Montserrat-SemiBold"
            style={styles.button_label}
            dataSet={{ media: ids.button_label }}
          >
            {kycStatus === "VERIFIED" ? "OKAY" : "Verify Again"}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  modal_container: {
    alignItems: "center",
    justifyContent: "center",
    ...SS.absoluteFill,
  },
  container: {
    gap: 22,
    paddingTop: 60,
    paddingBottom: 40,
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

  button_container: {
    right: 19,
    top: 18,
    position: "absolute",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      paddingLeft: 32,
      paddingRight: 32,
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
    width: "85%",
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
    width: "90%",
    height: 50,
    marginTop: 15,
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
      width: "90%",
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
