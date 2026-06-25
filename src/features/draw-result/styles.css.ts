import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    "@media (min-width: 996px)": {
      alignSelf: "center",
      // maxWidth: 1124,
      paddingHorizontal: 20,
    },
    "@media (max-width: 800px)": {
      paddingLeft: 17,
      paddingRight: 17,
    },
  },

  btn_cta: {
    alignSelf: "center",
    marginTop: 40,
    width: 400,
    height: 55,
    "@media (max-width: 800px)": {
      width: "100%",
      marginTop: 28,
      height: 52,
    },
  },
  label_cta: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 1,
  },

  footer: {
    marginTop: 60,
    width: "100%",
    "@media (min-width: 996px)": {
      marginTop: 80,
    },
    "@media (max-width: 768px)": {
      display: "none"
    },
  },
});

export { ids, styles };
