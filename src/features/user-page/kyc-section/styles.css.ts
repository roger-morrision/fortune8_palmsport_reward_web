import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    zIndex: 2,
    gap: 15,
    width: "100%",
    maxWidth: 974,
    marginTop: 33,
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 30,
    borderRadius: 8,
    paddingBottom: 30,
    marginBottom: 36,
    paddingHorizontal: 20,
    borderWidth: 1.82,
    borderColor: "#192851",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      marginTop: 33,
      marginBottom: 86,
    },
    "@media (max-width: 768px)": {
      width: "90%",
    },
  },
  button_kyc: {
    width: "100%",
    height: 45,
    marginTop: 15,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EABC34",
  },
  button_kyc_verified: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EABC34",
    backgroundColor: "transparent",
  },
  text_style: {
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

  divider_containera: {
    width: "100%",
    height: 1,
    backgroundColor: "#FFFFFF25",
  },

  text_title: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: "PoppinsSemiBold",
    "@media (max-width: 1600px) and (min-width: 996px)": {
      fontSize: 16,
      lineHeight: 20,
    },
    "@media (max-width: 768px)": {
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
});

export { ids, styles };
