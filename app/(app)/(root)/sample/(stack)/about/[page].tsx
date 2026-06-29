import ScreenTitle from "@/src/common/components/header/screen-title";
import Screen from "@/src/common/components/Screen";
import AboutPage from "@/src/features/about";
import StyleSheet from "react-native-media-query";

function AboutScreen() {
  return (
    <Screen style={styles.container} dataSet={{ media: ids.container }}>
      <ScreenTitle options={{ title: "Info Hub" }} />
      <AboutPage />
    </Screen>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 8,
    alignSelf: "center",

    "@media (min-width: 900px)": {
      paddingTop: 21,
    },
  },
});

export default AboutScreen;
