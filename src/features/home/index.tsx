import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useHomeContext } from "@/src/context/HomeContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import React from "react";
import { ScrollView } from "react-native";
import CashBack from "./cash-back";
import HotDeals from "./feature-games";
import Footer from "./footer";
import PalmsPlayRewards from "./palmsplay-rewards";
import GotoGambly from "./go-to-gambly";
import HowItWorks from "./how-it-works";
import { ids, styles } from "./styles.css";
import Welcome from "./welcome";
import Sweepscoin from "./sweepscoin";

export default function HomePage() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const { scrollRef, sectionY } = useHomeContext();

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <View style={{ gap: 22 }}>
          <>
            {isLoggedIn ? <Sweepscoin /> : <Welcome />}
            <View
              onLayout={(e) => {
                sectionY.current.howItWorks = e.nativeEvent.layout.y;
              }}
            >
              <HowItWorks />
            </View>
          </>
        </View>
        <View
          onLayout={(e) => {
            sectionY.current.rewards = e.nativeEvent.layout.y;
          }}
        >
          <View style={styles.v_cashback_rewards} dataSet={{ media: ids.v_cashback_rewards }}>
            <PalmsPlayRewards />
            <CashBack />
          </View>
        </View>

        <View
          onLayout={(e) => {
            sectionY.current.hotDeals = e.nativeEvent.layout.y;
          }}
        >
          <HotDeals />
        </View>

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <GotoGambly />
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
