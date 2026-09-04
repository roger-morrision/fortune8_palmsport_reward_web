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
    maxWidth: 1212,
    alignSelf: "center",
    paddingHorizontal: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (min-width: 1600px)": {
      height: 108,
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: "space-between",
    },
    "@media (max-width: 1600px) and (min-width: 800px)": {
      height: 90,
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
    width: 90,
    height: 65,
    "@media (max-width: 800px)": {
      width: 78,
      height: 47,
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
    height: 36,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Medium",
    "@media (max-width: 800px)": {
      width: 84,
      height: 37,
    },
  },
  btn_login_label: {
    fontSize: 14,
    lineHeight: 18
  },
  
  v_center_menu: {
    gap: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      display: "none",
    },
  },
  t_center_menu: {
    fontSize: 14,
    lineHeight: 18,
  },

});

export { ids, styles };
