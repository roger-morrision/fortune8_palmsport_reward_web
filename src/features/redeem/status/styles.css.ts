import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    gap: 25,
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  circle_container: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#61F66B",
  },
  login_button_style: {
    width: "100%",
    marginTop: 27,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 800px)": {
      borderRadius: 7,
    },
  },
  login_label_style: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    lineHeight: 20,
    "@media (min-width: 800px)": {
      fontSize: 20,
      lineHeight: 22,
    },
  },

  title_style: {
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    lineHeight: 26,
    textAlign: "center",
    "@media (min-width: 800px)": {
      fontSize: 28,
      lineHeight: 30,
    },
  },
  text_style: {
    fontFamily: "PoppinsLight",
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 16,
      lineHeight: 24,
    },
  },

  indicator_style: {
    marginTop: 40,
  },

  v_items: {
    gap: 10,
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#192851",
    padding: 21,
    borderRadius: 8,
  },
  row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text_label: {
    width: "40%",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    lineHeight: 16,
    color: "#898989",
    "@media (max-width: 540px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },
  text_value: {
    width: "50%",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "right",
    "@media (max-width: 540px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },
});

export { ids, styles };
