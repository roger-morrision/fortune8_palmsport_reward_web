import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import Screen from "@/src/common/components/Screen";
import KYCRejectedPage from "@/src/features/kyc-verification/kyc-rejected";
import { useRouter } from "expo-router";
import StyleSheet from "react-native-media-query";

function KYCRejected() {
  const router = useRouter();

  return (
    <ProtectedScreen>
      <Screen style={styles.container} dataSet={{ media: ids.container }}>
        <KYCRejectedPage />
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

export default KYCRejected;
