import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // maxWidth: 1280,
    "@media (min-width: 996px)": {
      alignSelf: "center",
    },
  },
  footer: {
    gap: 10,
    marginTop: 100,
    width: "100%",
    "@media (min-width: 996px)": {
      gap: 0,
    },
  },
});

export { ids, styles };
