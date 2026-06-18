import View from "@/src/common/components/View";
import HowItWorksPage from "@/src/features/how-it-works";
import StyleSheet from "react-native-media-query";

function HowItWorksScreen() {
  return (
    <View style={styles.main}>
      <HowItWorksPage />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    maxWidth: 1280,
  },
});

export default HowItWorksScreen;
