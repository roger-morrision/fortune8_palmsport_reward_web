import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useHomeContext } from "@/src/context/HomeContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import React from "react";
import { Linking, ScrollView } from "react-native";
import CashBack from "./cash-back";
import HotDeals from "./containers";
import Footer from "./footer";
import GotoGambly from "./go-to-gambly";
import HowItWorks from "./how-it-works";
import { ids, styles } from "./styles.css";
import Welcome from "./welcome";
import Sweepscoin from "./sweepscoin";
import Banner from "./banner";
import BGButton from "@/src/common/components/BGButton";
import { useQueryApi } from "@/src/common/hooks/useQueryApi";
import { RewardService } from "@/src/api/services/rewards.service";

export default function HomePage() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const { scrollRef, sectionY } = useHomeContext();
  const { data } = useQueryApi(["rewards-home-page"], RewardService.homePage, {}, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("datadata", data)

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Banner {...data} />
        <View
          onLayout={(e) => {
            sectionY.current.hotDeals = e.nativeEvent.layout.y;
          }}
        >
          <HotDeals {...data} />
        </View>
        <BGButton
          // onPress={() => setTab(tab === "silver" ? "gold" : "silver")}
          borderWidth={2}
          onPress={() => Linking.openURL(data?.cta?.link)}
          fontFamily="Montserrat-Bold"
          label={data?.cta?.text ?? "ENTER NOW"}
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
