import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import { useLobbyService } from "@/src/store/hooks";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView } from "react-native";
import { ids, styles } from "./styles.css";
import { useAssetContext } from "@/src/context/AssetContext";

export default function HowItWorkPage() {
  const router = useRouter();
  const { images } = useAssetContext();

  const onClose = () => {
    return router.canGoBack() ? router.back() : router.replace("/");
  };

  return (
    <View backgroundColor="transparent" style={styles.overlay} dataSet={{ media: ids.overlay }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: 500,
          marginTop: "10%",
          marginBottom: "10%",
          alignItems: "center",
        }}
      >
        <View
          backgroundColor="background"
          borderColor="background"
          style={styles.container}
          dataSet={{ media: ids.container }}
        >
          <MaterialIcon
            color="closeColor"
            backgroundColor="transparent"
            onPress={onClose}
            asButton
            style={styles.btn_close_style}
            name="close"
          />
          <Image
            style={styles.gambly_logo_style}
            dataSet={{ media: ids.gambly_logo_style }}
            source={{ uri: images?.["palmsplay-rewards"].uri }}
            resizeMode="stretch"
          />
          <Text
            color="goldMatt"
            style={styles.text_title_style}
            dataSet={{ media: ids.text_title_style }}
          >
            How SweepsCoin Work
          </Text>
          <Text
            color="text"
            style={styles.text_description_style}
            dataSet={{ media: ids.text_description_style }}
          >
            Convert your free Bonus Gold coins into SweepsCoin by playing gold games in Gambly
            {"\n\n"}SweepsCoin are redeemable for real cash prizes in this rewards website.
            SweepsCoin do not have any real monetary value until redeemed.
          </Text>
          <Text
            color="goldMatt"
            style={styles.text_title_style}
            dataSet={{ media: ids.text_title_style }}
          >
            How PalmsPlay Rewards Work
          </Text>
          <Text
            color="text"
            style={styles.text_description_style2}
            dataSet={{ media: ids.text_description_style2 }}
          >
            1. Play and earn Gold Coins{"\n"}
            2. Gold Coins convert to SweepsCoin as you play{"\n"}
            3. Open the Redeem section{"\n"}
            4. Exchange available SweepsCoin for real cash rewards{"\n"}
            5. Enter your details and upload the required documents{"\n"}
            6. Select ACH as your payout method{"\n"}
            {"    "}(Crypto exchange will be supported soon.){"\n"}
            7. Wait for confirmation that your exchange request is approved{"\n"}
            8. Track your request in Transaction History
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
