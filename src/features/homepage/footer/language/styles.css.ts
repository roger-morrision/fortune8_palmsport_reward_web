import { StyleSheet } from "react-native";

const useStyles = StyleSheet.create(
  {
    v_fbandsound: {
      zIndex: 555,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      // overflow: "hidden"
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


    lang_container: {
      width: "100%",
      gap: "4%",
      paddingHorizontal: "4%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  },
);

export default useStyles;
