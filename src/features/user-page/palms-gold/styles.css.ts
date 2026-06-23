import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    gap: 15,
    minHeight: 208,
    width: "48.5%",
    alignSelf: "center",
    paddingTop: 30,
    borderRadius: 8,
    paddingBottom: 30,
    paddingHorizontal: 15,
    borderWidth: 1.82,
    borderColor: "#1C3470",
    backgroundColor: "#09183B",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  button_edit: {
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text_style: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    lineHeight: 16,
    "@media (max-width: 1920px) and (min-width: 800px)": {},
    "@media (max-width: 540px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },

  row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
    width: "35%",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 16,
    "@media (max-width: 540px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },
  input_style: {
    borderWidth: 1,
    width: "35%",
    height: 45,
    borderRadius: 5,
    textAlign: "left",
    "@media (min-width: 800px)": {
      height: 48,
      borderRadius: 5.5,
    },
  },
  input_error_style: {
    borderColor: "red",
  },
  ti_border: { borderWidth: 0 },

  divider_container: {
    width: "100%",
    height: 1,
    backgroundColor: "#FFFFFF25",
  },

  text_title: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    lineHeight: 22,
    "@media (max-width: 540px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },
  text_description: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    lineHeight: 18,
    color: "#7F8CA1",
    "@media (max-width: 540px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },


  v_sweeps_balance: {
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 5,
    paddingLeft: 10,
    gap: 10,
    width: "60%",
    borderColor: "#304C95",
    backgroundColor: "#182852",
  },
  i_gold: {
    width: 60,
    height: 60,
  },
  t_redemption: { fontSize: 15, lineHeight: 19  },
});

export { ids, styles };
