import Button from "@/src/common/components/Button";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import { useAssetContext } from "@/src/context/AssetContext";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  onVerify?: () => void;
  onCancel?: () => void;
};

export default function KYCVerification(props: Props) {
  const router = useRouter();
  const { images } = useAssetContext();
  const size = useBreakpoint({
    default: {
      width: 117,
      height: 77,
    },
    xlarge: {
      width: 122,
      height: 78,
    },
    large: {
      width: 140,
      height: 84,
    },
  });

  const handleVerify = () => {
    if (typeof props?.onVerify === "function") {
      props.onVerify();
      return;
    }

    router.push("/kyc-verification/start-process");
  };

  const handleCancel = () => {
    if (typeof props?.onCancel === "function") {
      props.onCancel();
      return;
    }

    router.back();
  };

  return (
    <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
      <Image style={{ ...size }} source={{ uri: images?.["kyc-icon"].uri }} resizeMode="contain" />
      <Text
        fontFamily="Montserrat-Bold"
        color="yellowThick"
        style={styles.t_verify}
        dataSet={{ media: ids.t_verify }}
      >
        KYC Verification Required
      </Text>
      <Text
        fontFamily="Montserrat-Light"
        style={styles.t_description}
        dataSet={{ media: ids.t_description }}
      >
        Before you can redeem your Sweeps Coins, we need to verify your identity.{"\n\n"}
        What you’ll need:
      </Text>
      <View style={{ gap: 17 }}>
        <ItemRequirement
          source="kyc-document"
          sourceWidth={21}
          sourceHeight={21}
          title="Enter your personal details"
          subtitle="to confirm your account information."
        />
        <ItemRequirement
          source="kyc-id"
          sourceWidth={22}
          sourceHeight={16}
          title="Take a picture of your valid ID"
          subtitle="to verify your identity"
        />
        <ItemRequirement
          source="kyc-camera"
          sourceWidth={22}
          sourceHeight={18}
          title="Take a selfie of yourself"
          subtitle="to confirm the ID belongs to you."
        />
      </View>
      <Button
        onPress={handleVerify}
        style={styles.button_style}
        dataSet={{ media: ids.button_style }}
      >
        <Text
          color="textDark"
          fontFamily="Montserrat-SemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Verify Now
        </Text>
      </Button>
      <Button
        onPress={handleCancel}
        style={styles.button_home_style}
        dataSet={{ media: ids.button_home_style }}
      >
        <Text
          fontFamily="Montserrat-SemiBold"
          style={styles.button_label}
          dataSet={{ media: ids.button_label }}
        >
          Cancel
        </Text>
      </Button>
    </View>
  );
}

type ItemProps = {
  source: SVGName;
  sourceWidth: number;
  sourceHeight: number;
  title: string;
  subtitle: string;
};

const ItemRequirement = (props: ItemProps) => {
  return (
    <View style={styles.item_container} dataSet={{ media: ids.item_container }}>
      <SVGIcon name={props.source} width={props.sourceWidth} height={props.sourceHeight} />
      <View>
        <Text style={styles.item_t_title} dataSet={{ media: ids.item_t_title }}>
          {props.title}
        </Text>
        <Text style={styles.item_t_subtitle} dataSet={{ media: ids.item_t_subtitle }}>
          {props.subtitle}
        </Text>
      </View>
    </View>
  );
};

const { ids, styles } = StyleSheet.create({
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
  button_home_style: {
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

  // ITEM
  item_container: { flexDirection: "row", gap: 11 },
  item_t_title: {
    fontSize: 14,
    lineHeight: 20,
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 22,
    },
  },
  item_t_subtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: "#5A6175",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 14,
      lineHeight: 21,
    },
  },
});
