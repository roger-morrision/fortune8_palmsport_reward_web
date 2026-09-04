import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import StyleSheet from "react-native-media-query";
import Footer from "./footer";
import HomeBanner from "./banner";
import ExploreRewards from "./explore-rewards";
import FAQ from "./faq";
import MoreRewards from "./more-rewards";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useHomeContext } from "@/src/context/HomeContext";

export default function HomePage() {
  const router = useRouter();
  const { scrollRef, sectionY, pendingSection, scrollToSection } = useHomeContext();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  // Scroll to any section that was requested before this page mounted
  useEffect(() => {
    if (pendingSection.current) {
      const section = pendingSection.current;
      pendingSection.current = null;
      const timeout = setTimeout(() => scrollToSection(section), 100);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View backgroundColor="primary" style={styles.container} dataSet={{ media: ids.container }}>
        <HomeBanner />
        <View
          onLayout={(e) => { sectionY.current["benefits"] = e.nativeEvent.layout.y; }}
        >
          <MoreRewards />
        </View>
        <View
          onLayout={(e) => { sectionY.current["tiers"] = e.nativeEvent.layout.y; }}
        >
          <ExploreRewards onJoinNow={handleLogin} onGetStarted={handleLogin} onViewElite={handleLogin} />
        </View>
        <View
          onLayout={(e) => { sectionY.current["faq"] = e.nativeEvent.layout.y; }}
        >
          <FAQ />
        </View>
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
