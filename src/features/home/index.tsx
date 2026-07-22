import { RewardService } from "@/src/api/services/rewards.service";
import { useQueryApi } from "@/src/common/hooks/useQueryApi";
import { useHomeContext } from "@/src/context/HomeContext";
import BGButton from "@/src/common/components/BGButton";
import { Linking, ScrollView } from "react-native";
import View from "@/src/common/components/View";
import { ids, styles } from "./styles.css";
import HotDeals from "./containers";
import Banner from "./banner";
import Footer from "../homepage/footer";

export default function HomePage() {
  const { scrollRef, sectionY } = useHomeContext();
  const { data } = useQueryApi(["rewards-home-page"], RewardService.homePage, {}, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
