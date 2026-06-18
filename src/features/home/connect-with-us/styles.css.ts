import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    paddingVertical: 25,
    alignItems: "center",
    height: 144,
    "@media (min-width: 996px)": {
      height: 281,
      justifyContent: "center",
    },
  },
  t_title: {
    fontSize: 17,
    lineHeight: 20,
    textAlign: "center",
    "@media (min-width: 996px)": {
      fontSize: 28,
      lineHeight: 31,
    },
  },
  v_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
    gap: 50,
    "@media (max-width: 776px)": {
      gap: 20,
    },
  },
  imageStyle: {
    width: 37,
    height: 37,
    "@media (max-width: 768px)": {
      width: 37,
      height: 37,
    },
  },
  imageFb: {
    width: 17,
    height: 37,
    "@media (max-width: 768px)": {
      width: 17,
      height: 37,
    },
  },
  imageYoutube: {
    width: 36,
    height: 25,
    "@media (max-width: 768px)": {
      width: 36,
      height: 25,
    },
  },
});

export { ids, styles };
