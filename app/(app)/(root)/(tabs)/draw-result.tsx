import ScreenTitle from "@/src/common/components/header/screen-title";
import Screen from "@/src/common/components/Screen";
import DrawResultPage from "@/src/features/draw-result";
import { useTranslation } from "react-i18next";
import StyleSheet from "react-native-media-query";

function DrawResultScreen() {
  const { t } = useTranslation();
  
  return (
    <Screen style={styles.container} dataSet={{ media: ids.container }}>
      <ScreenTitle options={{ title: t("draw-result.title") }} />
      <DrawResultPage />
    </Screen>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 8,
    // maxWidth: 800,
    gap: 11,
    alignSelf: "center",
    "@media (min-width: 800px)": {
      paddingTop: 21,
    },
  },
});

export default DrawResultScreen;
