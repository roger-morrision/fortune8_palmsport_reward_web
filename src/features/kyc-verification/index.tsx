import View from "@/src/common/components/View";
import ConnectUs from "@/src/features/home/connect-with-us";
import Footer from "@/src/features/home/footer";
import GotoGambly from "@/src/features/home/go-to-gambly";
import React from "react";
import { ScrollView } from "react-native";
import KYCVerification from "./kyc-verification";
import { ids, styles } from "./styles.css";

export default function KYCVerificationPage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <KYCVerification />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <GotoGambly />
          <ConnectUs />
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
