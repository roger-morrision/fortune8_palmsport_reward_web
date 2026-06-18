import View from "@/src/common/components/View";
import RedeemVerificationRequirePage from "@/src/features/kyc-verification/kyc-verification-require";
import StyleSheet from "react-native-media-query";

function RedeemVerificationRequireScreen() {
  return (
    <View style={styles.main}>
      <RedeemVerificationRequirePage />
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

export default RedeemVerificationRequireScreen;
