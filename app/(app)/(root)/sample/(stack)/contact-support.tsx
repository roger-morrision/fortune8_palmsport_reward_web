import ScreenTitle from "@/src/common/components/header/screen-title";
import Screen from "@/src/common/components/Screen";
import ContactSupportPage from "@/src/features/contact-us";
import StyleSheet from "react-native-media-query";

function ContactSupportScreen() {
  return (
    <Screen style={styles.container} dataSet={{ media: ids.container }}>
      <ScreenTitle options={{ title: "New Message" }} />
      <ContactSupportPage />
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

export default ContactSupportScreen;
