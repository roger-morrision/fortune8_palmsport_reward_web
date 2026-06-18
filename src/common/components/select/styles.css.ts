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

    "@media (max-width: 800px)": {
      marginTop: 15,
    },
  },

  // RENDER BASE
  render_container: {
    justifyContent: "center",
  },
  input_style: {
    height: 51,
    borderRadius: 5,
    "@media (max-width: 800px)": {
      height: 48,
      borderRadius: 5.5,
    },
  },
  icon_style: {
    position: "absolute",
    right: 15,
  },
  icon_clear_style: {
    position: "absolute",
    right: 55,
  },

  // MENU LIST
  modal: {
    width: 500,
    height: 300,
    maxHeight: 300,
    position: "absolute",
  },
  dropdown: {
    width: "100%",
    minHeight: 200,
    maxHeight: 300,
    borderRadius: 4,
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  itemSeparator: {
    height: 1,
    marginHorizontal: 10,
  },
  v_item: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  v_item_active: { backgroundColor: "white" },
  v_circle: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: "black",
  },
  t_item: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 20,
    fontFamily: "PoppinsRegular",
  },
  t_item_active: {
    flex: 1,
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});

export { ids, styles };
