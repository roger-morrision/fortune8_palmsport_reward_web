import ScreenTitle from "@/src/common/components/header/screen-title";
import Screen from "@/src/common/components/Screen";
import RaffleDrawPage from "@/src/features/raffle-draw";
import { useTranslation } from "react-i18next";
import StyleSheet from "react-native-media-query";

function RaffleDrawScreen() {
  const { t } = useTranslation();

  return (
    <Screen style={styles.container} dataSet={{ media: ids.container }}>
      <ScreenTitle options={{ title: t("raffle-draw.title") }} />
      <RaffleDrawPage />
    </Screen>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 8,
    gap: 11,
    alignSelf: "center",
    "@media (min-width: 800px)": {
      paddingTop: 21,
    },
  },
});

export default RaffleDrawScreen;
