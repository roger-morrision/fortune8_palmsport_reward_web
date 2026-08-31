import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import StyleSheet from "react-native-media-query";
import Footer from "./footer";
import HomeBanner from "./banner";
import ExploreRewards from "./explore-rewards";
import FAQ from "./faq";
import MoreRewards from "./more-rewards";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View backgroundColor="primary" style={styles.container} dataSet={{ media: ids.container }}>
        <HomeBanner />
        <MoreRewards />
        <ExploreRewards onJoinNow={handleLogin} onGetStarted={handleLogin} onViewElite={handleLogin} />
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
