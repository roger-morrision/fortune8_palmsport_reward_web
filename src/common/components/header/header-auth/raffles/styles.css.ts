import { StyleSheet } from "react-native";

const useStyles = StyleSheet.create(
  {
    v_fbandsound: {
      zIndex: 5,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    row_container: {
      flexDirection: "row", marginLeft: "4%", gap: "9%", 
      alignItems: "center", justifyContent: "center"
    },
    v_country: {
      width: "100%",
      gap: "3%",
      paddingLeft: "4%",
      paddingRight: "2%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    t_label: {
      fontSize: 16,
      lineHeight: 20,
    },


    lang_container: {
      paddingHorizontal: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    text_label: {fontSize: 14, lineHeight: 16 }
  },
);

export default useStyles;
