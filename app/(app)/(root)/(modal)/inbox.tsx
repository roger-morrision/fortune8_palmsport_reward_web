import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import View from "@/src/common/components/View";
import InboxPage from "@/src/features/inbox";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet as SS } from "react-native";
import StyleSheet from "react-native-media-query";

function InboxScreen() {
  const router = useRouter();

  return (
    <ProtectedScreen>
      <View style={styles.main}>
        <Pressable style={SS.absoluteFill} onPress={() => router.back()} />
        <View
          pointerEvents="box-none"
          borderColor="borderColor"
          backgroundColor="background"
          style={styles.container}
          dataSet={{ media: ids.container }}
        >
          <InboxPage />
        </View>
      </View>
    </ProtectedScreen>
  );
}

const { ids, styles } = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    maxWidth: 1280,
  },

  container: {
    zIndex: 8,
    width: 351,
    height: 395,
    borderWidth: 1.61,
    padding: 13,
    paddingTop: 21,
    borderRadius: 13,
    top: 80,
    right: 0,
    position: "absolute",
  },
});

export default InboxScreen;
