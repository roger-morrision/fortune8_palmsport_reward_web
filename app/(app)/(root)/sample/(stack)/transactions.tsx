import ScreenTitle from "@/src/common/components/header/screen-title";
import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import Screen from "@/src/common/components/Screen";
import TransactionPage from "@/src/features/transactions";
import { useRouter } from "expo-router";
import StyleSheet from "react-native-media-query";

function TransactionsScreen() {
  const router = useRouter();

  return (
    <ProtectedScreen>
      <Screen style={styles.container} dataSet={{ media: ids.container }}>
        <ScreenTitle options={{ title: "Transactions" }} onBack={() => router.replace("/")} />
        <TransactionPage />
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

export default TransactionsScreen;
