import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    gap: 11,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "@media (max-width: 1920px) and (min-width: 800px)": {},
  },
  text_name_style: {
    fontSize: 16,
    lineHeight: 18,
    color: "white",
    fontFamily: "Montserrat-Medium",
    "@media (max-width: 1920px) and (min-width: 800px)": {},
  },
  text_sweep_label_style: {
    fontSize: 12,
    lineHeight: 14,
    color: "#40517C",
    fontFamily: "Montserrat",
    "@media (max-width: 1920px) and (min-width: 800px)": {},
  },
  text_balance_style: {
    fontSize: 16,
    lineHeight: 18,
    color: "#FFDF83",
    fontFamily: "Montserrat-Bold",
    "@media (max-width: 1920px) and (min-width: 800px)": {},
  },
});

export { ids, styles };
