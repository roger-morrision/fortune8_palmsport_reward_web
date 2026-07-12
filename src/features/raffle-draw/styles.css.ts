import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    "@media (max-width: 800px)": {
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
  body_wrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    "@media (min-width: 996px)": {
      alignSelf: "center",
      maxWidth: 1124,
      paddingHorizontal: 20,
    },
    "@media (max-width: 800px)": {
      paddingHorizontal: 12,
    },
  },

  // Two-column row: countdown + ticket select
  v_panels: {
    zIndex: 2,
    flexDirection: "row",
    gap: 16,
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
    maxWidth: 1084,
    "@media (max-width: 800px)": {
      flexDirection: "column",
      gap: 24,
      marginTop: 20,
    },
  },

  // Enter Now button
  btn_enter: {
    alignSelf: "center",
    marginTop: 32,
    width: 336,
    height: 55,
    "@media (max-width: 800px)": {
      width: "100%",
      marginTop: 24,
      height: 55,
    },
  },
  label_enter: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 1,
  },

  footer: {
    gap: 10,
    marginTop: 60,
    width: "100%",
    "@media (min-width: 996px)": {
      gap: 0,
      marginTop: 80,
    },
    "@media (max-width: 768px)": {
      display: "none"
    },
  },
});

export { ids, styles };
