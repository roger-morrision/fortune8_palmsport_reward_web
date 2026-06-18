import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    minHeight: 50,
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // borderColor: colors.black4,
    // backgroundColor: colors.white,

    "@media (min-width: 800px)": {
      marginTop: 15,
    },
  },

  // RENDER BASE
  render_container: {
    justifyContent: "center",
  },
  labelStyle: {
    position: "absolute",
    left: 8,
  },
  input_style: {
    paddingLeft: "30%",
    paddingRight: "18%",
    height: 45,
    borderRadius: 5,
    textAlign: "left",
    "@media (min-width: 800px)": {
      height: 48,
      borderRadius: 5.5,
    },
  },
  icon_style: {
    position: "absolute",
    right: 15,
  },

  // MENU LIST
  modal: { flexGrow: 1 },
  dropdown: {
    width: 400,
    position: "absolute",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    paddingTop: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
});

export { ids, styles };
