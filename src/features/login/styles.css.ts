import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  button_style: {
    width: 92,
    height: 35,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    lineHeight: 16,
    "@media (min-width: 800px)": {
      width: 95,
      height: 40,
      borderRadius: 7,
      fontSize: 16,
      lineHeight: 20,
    },
  },

  error_style: {
    fontSize: 14,
    lineHeight: 16,
    color: "red",
    "@media (min-width: 800px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },

  input_container: {
    gap: 12,
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

  login_button_style: {
    marginTop: 27,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    lineHeight: 20,
    "@media (min-width: 800px)": {
      marginTop: 30,
      height: 53,
      borderRadius: 7,
      fontSize: 20,
      lineHeight: 22,
    },
  },
  resend_link_button_style: {
    marginTop: 11,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    lineHeight: 20,
    "@media (min-width: 800px)": {
      // marginTop: 30,
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

  forgot_password_style: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 25,
    "@media (min-width: 800px)": {
      marginTop: 27,
      fontSize: 17,
      lineHeight: 22,
    },
  },

  divider_style: {
    height: 2,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  continue_style: {
    position: "absolute",
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    lineHeight: 12,
    textAlign: "center",
    paddingHorizontal: 30,
    "@media (min-width: 800px)": {
      fontSize: 14,
      lineHeight: 14,
    },
  },

  action_container: {
    marginTop: 30,
    alignSelf: "center",
    gap: 25,
  },
});

export { ids, styles };
