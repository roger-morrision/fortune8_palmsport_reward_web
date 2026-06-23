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

  container_row: {
    gap: 15,
    zIndex: 2,
    width: "100%",
    maxWidth: 1083,
    marginTop: 22,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      width: "95%",
      marginTop: 20,
      flexDirection: "column",
    },
  },

  button_view_result: {
    width: 336, height: 55, alignSelf: 'center', marginTop: 20
  },
  label_view_result: { 
    fontSize: 16, lineHeight: 18 
  },

  // CATEGORIES
  item_container: {
    paddingHorizontal: 13,
    flexDirection: "row",
    gap: 11,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 56,
  },
  name_style: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 16,
  },
});

export { ids, styles };
