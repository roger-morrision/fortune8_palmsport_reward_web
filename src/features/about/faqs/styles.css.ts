import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: { flex: 1, marginTop: 0 },
  cardContainer: {
    minHeight: 51,
    justifyContent: "center",
  },
  cardHeader: {
    minHeight: 61,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
  },
  v_info: {
    minHeight: 94,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 10,
  },
  v_separator: {
    height: 1,
    backgroundColor: "#192851",
  },

  ti_style: {
    borderRadius: 6,
    height: 50,
    paddingLeft: 15,
  },
});

export { ids, styles };
