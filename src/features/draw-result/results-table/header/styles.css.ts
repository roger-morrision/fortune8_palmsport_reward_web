import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1A4A",
    borderBottomWidth: 1,
    borderBottomColor: "#1C3470",
    paddingHorizontal: 16,
    minHeight: 48,
    "@media (max-width: 599px)": {
      display: "none",
    },
  },
  cell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  t_label: {
    fontSize: 12,
    lineHeight: 16,
    color: "#7791BA",
    letterSpacing: 0.3,
    "@media (max-width: 800px)": {
      fontSize: 11,
      lineHeight: 14,
    },
  },
});

export { ids, styles };
