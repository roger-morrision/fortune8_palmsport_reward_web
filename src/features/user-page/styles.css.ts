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
