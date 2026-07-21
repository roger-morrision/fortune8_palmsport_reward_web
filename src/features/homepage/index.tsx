import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import StyleSheet from "react-native-media-query";
import Footer from "../home/footer";
import HomeBanner from "./banner";
import ExploreRewards from "./explore-rewards";
import FAQ from "./faq";
import MoreRewards from "./more-rewards";

export default function HomePage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View backgroundColor="primary" style={styles.container} dataSet={{ media: ids.container }}>
        <HomeBanner />
        <MoreRewards />
        <ExploreRewards />
        <FAQ />
        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  footer: {
    gap: 10,
    marginTop: 80,
    width: "100%",
  },
});
