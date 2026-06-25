import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#1C3470",
  },
  empty: {
    paddingVertical: 32,
    alignItems: "center",
    backgroundColor: "#07122E",
  },
  t_empty: {
    fontSize: 14,
    lineHeight: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    minHeight: 52,
    backgroundColor: "#07122E",
    borderBottomWidth: 1,
    borderBottomColor: "#1C3470",
    "@media (max-width: 800px)": {
      minHeight: 48,
    },
  },
  row_even: {
    backgroundColor: "#09183B",
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  t_cell: {
    fontSize: 13,
    lineHeight: 18,
    color: "#D6D6D6",
    "@media (max-width: 800px)": {
      fontSize: 12,
      lineHeight: 16,
    },
  },
});

export { ids, styles };
