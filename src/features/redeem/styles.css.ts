import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 8,
    // maxWidth: 1280,
    "@media (min-width: 996px)": {
      alignSelf: "center",
    },
  },

  v_redeem_container: {
    gap: 22,
    marginTop: 20,
    marginBottom: 143,
    marginLeft: 25,
    marginRight: 25,
    "@media (max-width: 800px)": {
      gap: 21,
      marginTop: 19,
      marginBottom: 150,
      marginLeft: 25,
      marginRight: 25,
    },
  },

  footer: {
    gap: 10,
    width: "100%",
    "@media (min-width: 996px)": {
      gap: 0,
    },
  },
});

export { ids, styles };
