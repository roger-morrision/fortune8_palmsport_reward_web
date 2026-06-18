import Colors from "@/src/constants/Colors";
import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  v_redeem_container: {
    gap: 22,
    marginTop: 39,
    marginBottom: 143,
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
    "@media (max-width: 800px)": {
      gap: 21,
      marginBottom: 150,
      marginLeft: 25,
      marginRight: 25,
    },
  },
  t_verify: {
    fontSize: 28,
    textAlign: "center",
    lineHeight: 35,
    marginTop: 5,
    "@media (max-width: 768px)": {
      fontSize: 20,
      lineHeight: 24,
    },
  },
  t_description: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },
  cell: {
    width: 88,
    height: 88,
    marginRight: 20,
    fontSize: 50,
    lineHeight: 80,
    borderRadius: 18,
    borderWidth: 4.72,
    textAlign: "center",
    borderColor: "#19284E",
    "@media (max-width: 768px)": {
      width: 47,
      height: 47,
      marginRight: 12,
      fontSize: 25,
      lineHeight: 46,
      borderRadius: 8,
      borderWidth: 2,
    },
  },
  cell_error: {
    borderColor: Colors.dark.error,
  },
  focusCell: {
    borderColor: Colors.dark.text,
  },
  t_notes: {
    marginTop: 61,
    fontSize: 22,
    lineHeight: 25,
    "@media (max-width: 768px)": {
      marginTop: 57,
      fontSize: 16,
      lineHeight: 20,
    },
  },

  t_didnt_received: {
    marginTop: 31,
    fontSize: 18,
    lineHeight: 20,
    "@media (max-width: 768px)": {
      fontSize: 16,
      lineHeight: 20,
      marginTop: 20,
    },
  },

  button_style: {
    width: "100%",
    height: 65,
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#EABC34",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 800px)": {
      maxWidth: 521,
    },
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 20,
  },
});

export { ids, styles };
