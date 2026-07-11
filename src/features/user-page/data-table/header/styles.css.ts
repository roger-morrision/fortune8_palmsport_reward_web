import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  datatable: {
    height: 59,
    justifyContent: "center",
    backgroundColor: "#1C2A4E",
    borderTopColor: "#000000",
  },
  dt_header: {
    gap: 4,
    flexDirection: "row",
    borderBottomColor: "transparent",
  },
  h_style: {
    flex: 1,
  },
  t_style: {
    marginLeft: 0,
    marginRight: 7,
    fontSize: 16,
    lineHeight: 19,
    color: "#7791BA",
    textAlign: "center",
    "@media (max-width: 768px)": {
      fontSize: 15,
      lineHeight: 18,
    },
  },
  t_with_icon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 75,
  },
});

export { ids, styles };
