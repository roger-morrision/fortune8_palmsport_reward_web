import ScreenTitle from "@/src/common/components/header/screen-title";
import ContactSupportPage from "@/src/features/contact-us";
import Screen from "@/src/common/components/Screen";
import StyleSheet from "react-native-media-query";

function ContactSupportScreen() {
  return (
    <Screen style={styles.container} dataSet={{ media: ids.container }}>
      <ScreenTitle options={{ title: "NEW MESSAGE" }} />
      <ContactSupportPage />
    </Screen>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    gap: 11,
    width: "100%",
    paddingTop: 8,
    alignSelf: "center",
    "@media (min-width: 800px)": {
      paddingTop: 21,
    },
  },
});

export default ContactSupportScreen;
