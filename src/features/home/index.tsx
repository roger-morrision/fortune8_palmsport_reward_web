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
import Banner from "./banner";
import BGButton from "@/src/common/components/BGButton";

export default function HomePage() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const { scrollRef, sectionY } = useHomeContext();

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Banner />
        <View
          onLayout={(e) => {
            sectionY.current.hotDeals = e.nativeEvent.layout.y;
          }}
        >
          <HotDeals />
        </View>
        <BGButton
          // onPress={() => setTab(tab === "silver" ? "gold" : "silver")}
          borderWidth={2}
          fontFamily="PoppinsBold"
          label={"ENTER NOW"}
          style={styles.button_view_result}
          labelStyle={styles.label_view_result}
        />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
