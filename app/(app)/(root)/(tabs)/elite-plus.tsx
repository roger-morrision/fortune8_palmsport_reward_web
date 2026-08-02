import ScreenTitle from "@/src/common/components/header/screen-title";
import Screen from "@/src/common/components/Screen";
import ElitePlusPage from "@/src/features/elite-plus";
import { useTranslation } from "react-i18next";
import StyleSheet from "react-native-media-query";

function ElitePlusScreen() {
  const { t } = useTranslation();

  return (
    <Screen backgroundColor="#080810" style={styles.container} dataSet={{ media: ids.container }}>
      <ElitePlusPage />
    </Screen>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    gap: 11,
    alignSelf: "center",
    "@media (min-width: 800px)": {
    },
  },
});

export default ElitePlusScreen;
