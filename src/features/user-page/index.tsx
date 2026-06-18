import View from "@/src/common/components/View";
import React from "react";
import { ScrollView } from "react-native";
import AccountDetails from "./account-details";
import KYCSection from "./kyc-section";
import { styles } from "./styles.css";
import GotoGambly from "../home/go-to-gambly";
import Footer from "../home/footer";
import ConnectUs from "../home/connect-with-us";

function UserPage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} backgroundColor="background">
        <View style={styles.container_flex}>
          <AccountDetails />
          <KYCSection />
          <View style={{ gap: 10 }}>
            <GotoGambly />
            <ConnectUs />
            <Footer />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UserPage;
