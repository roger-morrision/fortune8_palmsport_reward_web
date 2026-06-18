import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  categories_container: {
    width: "100%",
    marginTop: 48,
    maxWidth: 1280,
    alignSelf: "center",
    justifyContent: "center",
    // '@media (min-width: 996px)': {
    //   maxWidth: "80%",
    // },
  },
  category_row: {
    gap: 9,
    "@media (max-width: 1920px) and (min-width: 800px)": {
      height: 11,
    },
  },

  flatlist: {
    paddingLeft: 17,
    "@media (min-width: 996px)": {
      paddingLeft: 0,
    },
  },

  header_title_style: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    lineHeight: 28,
  },

  v_controller: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingLeft: 17,
    paddingRight: 17,
    "@media (min-width: 996px)": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  v_row: { flexDirection: "row", alignItems: "center", gap: 10 },

  category_item_container: {
    width: 312,
    height: 287,
    gap: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    "@media (max-width: 800px)": {
      width: 292,
      height: 269,
      gap: 20,
      padding: 10,
      borderRadius: 9.23,
    },
  },
  image_banner: {
    width: "100%",
    height: 149,
    borderRadius: 11,
    "@media (max-width: 800px)": {
      height: 126,
      borderRadius: 7.22,
    },
  },
  title_style: {
    fontFamily: "PoppinsBold",
    fontSize: 22,
    lineHeight: 25,
    "@media (max-width: 800px)": {
      fontSize: 18.5,
      lineHeight: 20,
    },
  },
  description_style: {
    fontFamily: "PoppinsRegular",
    fontSize: 15,
    lineHeight: 20,
    "@media (max-width: 800px)": {
      fontSize: 12,
      lineHeight: 15,
    },
  },

  button_view_all_style: {
    paddingHorizontal: 13,
    borderWidth: 1,
    borderRadius: 5,
    height: 36,
    marginRight: 8,
  },
  btn_arrow_style: {
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { ids, styles };
