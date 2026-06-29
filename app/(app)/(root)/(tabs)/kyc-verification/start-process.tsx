import ScreenTitle from "@/src/common/components/header/screen-title";
import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import Screen from "@/src/common/components/Screen";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import StartProcessPage from "@/src/features/kyc-verification/kyc-process";
import { useLobbyService } from "@/src/store/hooks";
import { selectedKYCCurrentScreen, selectedKYCLoading } from "@/src/store/slices/lobby.slice";
import { useRouter } from "expo-router";
import StyleSheet from "react-native-media-query";

function StartProcessScreen() {
  const router = useRouter();
  const { onKYCInputUpdate } = useLobbyService();
  const isLoading = useAppSelector(selectedKYCLoading);
  const currentScreen = useAppSelector(selectedKYCCurrentScreen);

  const handleBack = () => {
    if (currentScreen > 0) {
      onKYCInputUpdate("currentScreen")(currentScreen - 1);
      return;
    }

    router.navigate("/redeem");
  };

  return (
    <ProtectedScreen>
      <Screen style={styles.container} dataSet={{ media: ids.container }}>
        {isLoading ? null : (
          <ScreenTitle onBack={handleBack} options={{ title: "KYC Verification" }} />
        )}
        <StartProcessPage />
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

export default StartProcessScreen;
