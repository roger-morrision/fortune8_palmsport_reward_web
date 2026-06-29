import ScreenTitle from "@/src/common/components/header/screen-title";
import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import Screen from "@/src/common/components/Screen";
import UserProfilePage from "@/src/features/user-page";
import StyleSheet from "react-native-media-query";

function UserProfileScreen() {
  return (
    // <ProtectedScreen>
      <Screen style={styles.container} dataSet={{ media: ids.container }}>
        <ScreenTitle options={{ title: "My Account" }} />
        <UserProfilePage />
      </Screen>
    // </ProtectedScreen>
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
