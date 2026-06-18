import View from "@/src/common/components/View";
import ConnectUs from "@/src/features/home/connect-with-us";
import Footer from "@/src/features/home/footer";
import GotoGambly from "@/src/features/home/go-to-gambly";
import Guide from "./guide";
import React, { useEffect, useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import RedeemYourRewards from "./redeem-your-rewards";
import Requirements from "./requirements";
import { ids, styles } from "./styles.css";
import BankInput from "./bank-input";
import BankReview from "./bank-review";
import PaypalInput from "./paypal-input";
import PaypalReview from "./paypal-review";
import RequestPending from "./status/pending";
import RequestFailed from "./status/failed";
import OTPVerification from "./otp-verification";
import RedeemProvider, { useRedeemContext } from "./provider";

export default function RedeemPage() {
  return (
    <RedeemProvider>
      <Components />
    </RedeemProvider>
  );
}

function Components() {
  const scrollRef = useRef<ScrollView>(null);
  const { screen, error } = useRedeemContext();

  const renderScreen = useMemo(() => {
    switch (screen) {
      case "MAIN":
        return (
          <>
            <Guide />
            <View style={styles.v_redeem_container} dataSet={{ media: ids.v_redeem_container }}>
              <Requirements />
              <RedeemYourRewards />
            </View>
          </>
        );
      case "BANK-INPUT":
        return <BankInput />;
      case "BANK-DETAILS":
        return <BankReview />;
      case "PAYPAL-INPUT":
        return <PaypalInput />;
      case "PAYPAL-DETAILS":
        return <PaypalReview />;
      case "OTP-VERIFICATION":
        return <OTPVerification />;
      case "REQUEST-PENDING":
        return <RequestPending />;
      case "REQUEST-FAILED":
        return <RequestFailed />;
    }
  }, [screen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [screen]);

  useEffect(() => {
    if (error.goldAmount) {
      scrollRef.current?.scrollTo({
        y: 150,
        animated: true,
      });
    }
  }, [error.goldAmount]);

  return (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "#040E28" }}
    >
      <View
        backgroundColor="background"
        style={styles.container}
        dataSet={{ media: ids.container }}
      >
        {renderScreen}

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <GotoGambly />
          <ConnectUs />
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
