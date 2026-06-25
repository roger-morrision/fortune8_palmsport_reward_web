import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  input_container: {
    width: "100%",
    marginTop: 28,
    marginBottom: 98,
    gap: 16,
    zIndex: 1,
    alignSelf: "center",
    maxWidth: 974,
    "@media (min-width: 996px)": {
      marginTop: 35,
    },
    "@media (max-width: 768px)": {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  input_style: {
    height: 45,
    borderRadius: 5,
    "@media (min-width: 800px)": {
      height: 48,
      borderRadius: 5.5,
    },
  },
  input_error_style: {
    borderColor: "red",
  },
  text_error_bottom_style: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 13,
    color: "red",
    "@media (min-width: 800px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },

  login_button_style: {
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    lineHeight: 20,
    "@media (min-width: 800px)": {
      height: 53,
      borderRadius: 7,
      fontSize: 20,
      lineHeight: 22,
    },
  },
  login_label_style: {
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    lineHeight: 20,
    "@media (min-width: 800px)": {
      fontSize: 20,
      lineHeight: 22,
    },
  },
});

export { ids, styles };
