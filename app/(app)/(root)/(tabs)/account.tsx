import ScreenTitle from "@/src/common/components/header/screen-title";
import InteractionManagerScreenWrapper from "@/src/common/components/InteractiveManager";
import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import Screen from "@/src/common/components/Screen";
import UserProfilePage from "@/src/features/user-page";
import { useTranslation } from "react-i18next";
import StyleSheet from "react-native-media-query";

function UserProfileScreen() {
  const { t } = useTranslation();

  return (
    <ProtectedScreen>
      <InteractionManagerScreenWrapper>
        <Screen style={styles.container} dataSet={{ media: ids.container }}>
          <ScreenTitle options={{ title: t("account.title") }} />
          <UserProfilePage />
        </Screen>
      </InteractionManagerScreenWrapper>
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

export default UserProfileScreen;
