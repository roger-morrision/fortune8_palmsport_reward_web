import Colors from "@/src/constants/Colors";
import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "flex-start",
    // '@media (min-width: 800px)': {
    //   width: 650,
    // }
  },
  container_flex: {
    flex: 1,
    gap: 20,
  },

  v_message_container: {
    gap: 21,
    width: "100%",
    maxWidth: 1084,
    alignSelf: "center",
    "@media (max-width: 800px)": {
      paddingLeft: 25,
      paddingRight: 25,
    },
  },

  t_error_style: {
    width: "80%",
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    "@media (max-width: 768px)": {
      fontSize: 10,
      lineHeight: 15,
    },
  },

  input_style: {
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    textAlign: "left",
    "@media (min-width: 800px)": {
      height: 48,
      borderRadius: 5.5,
    },
  },
  input_message_style: {
    borderWidth: 1,
    height: 280,
    paddingTop: 16,
    borderRadius: 5,
    textAlign: "left",
    "@media (min-width: 800px)": {
      height: 280,
      borderRadius: 5.5,
    },
  },
  input_error: {
    borderColor: Colors.dark.error,
  },

  button_submit: {
    height: 60,
    marginTop: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      height: 50,
    },
  },
  button_label: {
    fontSize: 18,
    lineHeight: 21,
    "@media (max-width: 540px)": {
      fontSize: 16,
      lineHeight: 20,
    },
  },

  footer: {
    gap: 10,
    width: "100%",
    marginTop: 125,
    "@media (min-width: 996px)": {
      gap: 0,
    },
  },

  v_notes_container: {
    width: "100%",
    paddingVertical: 22,
    marginTop: 45,
    marginBottom: 33,
    borderRadius: 6,
    borderWidth: 1.19,
    paddingHorizontal: 34,
    borderColor: "#1C2C55",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      gap: 10,
      marginTop: 3,
      marginBottom: 32,
      paddingLeft: 14,
      paddingRight: 23,
      flexDirection: "column",
    },
  },

  t_notes: {
    width: "69%",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
    color: "#ACB9D2",
    "@media (max-width: 768px)": {
      width: "85%",
      fontSize: 12,
      lineHeight: 20,
      textAlign: "center",
    },
  },

  v_contact_container: {
    flexDirection: "column",
    width: "23%",
    gap: 19,
    "@media (max-width: 768px)": {
      width: "100%",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  divider: {
    width: 2,
    height: "100%",
    backgroundColor: "#192851",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  divider2: {
    display: "none",
    width: 2,
    height: "100%",
    backgroundColor: "#192851",
    "@media (max-width: 768px)": {
      display: "flex",
    },
  },
  v_item_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    "@media (max-width: 768px)": {
      gap: 7,
      flex: 0.6,
    },
  },
  v_item_container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    "@media (max-width: 768px)": {
      gap: 7,
      flex: 1,
    },
  },
  t_contact_label: {
    fontSize: 14,
    lineHeight: 16,
    color: "#ACB9D2",
    "@media (max-width: 768px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },
});

export { ids, styles };
