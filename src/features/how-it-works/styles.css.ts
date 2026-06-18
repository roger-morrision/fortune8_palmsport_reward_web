import { StyleSheet as SS } from "react-native";
import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  overlay: {
    flex: 1,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    ...SS.absoluteFill,
  },
  container: {
    gap: 15,
    zIndex: 1,
    padding: 25,
    width: 400,
    paddingTop: 30,
    paddingBottom: 40,
    borderWidth: 5,
    borderRadius: 10,
    "@media (max-width: 800px)": {
      // width: 600,
      width: "85%",
      paddingLeft: 25,
      paddingRight: 25,
    },
  },
  btn_close_style: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  gambly_logo_style: {
    width: 100,
    height: 60,
    "@media (max-width: 800px)": {
      width: 100,
      height: 60,
    },
  },
  text_title_style: {
    fontSize: 16.33,
    lineHeight: 23,
    fontFamily: "PoppinsBold",
    "@media (min-width: 800px)": {
      fontSize: 18.33,
      lineHeight: 25,
    },
  },
  text_description_style: {
    fontSize: 11,
    lineHeight: 15,
    "@media (min-width: 800px)": {
      fontSize: 12,
      lineHeight: 17,
    },
  },
  text_description_style2: {
    fontSize: 11,
    lineHeight: 22,
    "@media (min-width: 800px)": {
      fontSize: 12,
      lineHeight: 24,
    },
  },
  button_style: {
    width: "80%",
    height: 38,
    gap: 5,
    marginTop: 15,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 996px)": {
      minWidth: "20%",
      height: 43,
    },
    "@media (max-width: 800px)": {
      borderRadius: 5,
      height: 33.4,
    },
  },
  button_label_style: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 13,
    lineHeight: 15,
    "@media (min-width: 996px)": {
      fontSize: 15,
      lineHeight: 16,
    },
    "@media (max-width: 798px)": {
      fontSize: 12,
      lineHeight: 14,
    },
  },

  // ITEM
  item_container: {
    gap: 14,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 16,
  },
  item_t_title_style: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "PoppinsSemiBold",
    "@media (min-width: 800px)": {
      fontSize: 15,
      lineHeight: 17,
    },
  },
  item_t_subtitle_style: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "PoppinsRegular",
    "@media (min-width: 800px)": {
      fontSize: 14,
      lineHeight: 16,
    },
  },
});

export { ids, styles };
