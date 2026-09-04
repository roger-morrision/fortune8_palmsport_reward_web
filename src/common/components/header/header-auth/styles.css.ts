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
    maxWidth: 1213,
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
  elite_btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    backgroundColor: "transparent",
  },
  t_elite_label: {
    color: "#C9A84C",
  },
  t_elite_active: {
    color: "#E8C84A",
  },

  // BALANCE
  v_sweeps_balance: {
    minWidth: 170,
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 8,
    paddingRight: 10,
    paddingLeft: 10,
    gap: 8,
  },
  i_gold: {
    width: 32,
    height: 32,
  },
  t_balance: { fontSize: 14, lineHeight: 17 },
  t_balance_label: { fontSize: 10, lineHeight: 12, color: "#FFCF3D" },

  // LOGGED-IN ROW
  v_logged_in: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  // ACCOUNT DROPDOWN
  v_account_wrapper: {
    position: "relative",
  },
  btn_account: {
    borderWidth: 1,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    height: 50,
  },
  v_dropdown: {
    position: "absolute",
    top: 60,
    right: 0,
    minWidth: 160,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: "hidden",
  },
  dropdown_item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdown_divider: {
    height: 1,
    borderTopWidth: 1,
  },
  t_dropdown_item: {
    fontSize: 14,
    lineHeight: 18,
  },
  t_logout: {
    color: "#8A9AC0",
  },

  // BACKDROP
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },

});

export { ids, styles };
