import ScreenTitle from "@/src/common/components/header/screen-title";
import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import Screen from "@/src/common/components/Screen";
import PromoEntriesPage from "@/src/features/promo-entries";
import { useTranslation } from "react-i18next";
import StyleSheet from "react-native-media-query";

function PromoEntriesScreen() {
  const { t } = useTranslation();

  return (
    <ProtectedScreen>
      <Screen style={styles.container} dataSet={{ media: ids.container }}>
        <ScreenTitle options={{ title: t("header.promo-entries")?.toUpperCase() }} />
        <PromoEntriesPage />
      </Screen>
    </ProtectedScreen>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 8,
    alignSelf: "center",
    "@media (min-width: 800px)": {
      paddingTop: 21,
    },
  },
});

export default PromoEntriesScreen;
