import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  main_container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    gap: 10,
    height: 80,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (min-width: 1600px)": {
      maxWidth: 1280,
      height: 80,
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: "space-between",
    },
    "@media (max-width: 1600px) and (min-width: 800px)": {
      maxWidth: 1280,
      height: 80,
      paddingLeft: 21,
      paddingRight: 21,
      justifyContent: "space-between",
    },
  },
  logo_container: {
    "@media (min-width: 800px)": {
      // position: "absolute",
      // width: "100%", alignItems: "center",
    },
  },
  gambly_logo_style: {
    width: 71,
    height: 43,
    "@media (max-width: 800px)": {
      width: 78,
      height: 47,
    },
  },
  menu_style: {
    right: 62,
    // display: "none",
    position: "absolute",
    alignSelf: "center",
    "@media (max-width: 800px)": {
      display: "none",
    },
  },
  right_container: {
    gap: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  button_style: {
    width: 85,
    height: 30,
    borderWidth: 1,
    borderRadius: 6.27,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 16,
    "@media (min-width: 800px)": {
      width: 84,
      height: 37,
      borderRadius: 7.27,
      fontSize: 15,
      lineHeight: 20,
    },
  },
  button_style_login: {
    color: "white",
  },

  v_bell: {
    position: "absolute",
    width: 13,
    height: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13 / 2,
    right: 2,
    top: 4,
    backgroundColor: "#17C15E",
  },
  t_bell_number: { fontSize: 8, lineHeight: 10 },

  v_center_menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      display: "none",
    },
  },
  t_center_menu: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});

export { ids, styles };
