import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  flatlist: {
    flex: 1,
    width: "100%",
    maxWidth: 1083,
    marginTop: 22,
    alignSelf: "center",
    "@media (max-width: 768px)": {
      width: "95%",
      marginTop: 20,
    },
  },

  // Desktop: horizontal table row
  r_style: {
    gap: 4,
    minHeight: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D1732",
  },
  c_style: {
    flex: 1,
    alignItems: "center",
  },
  text_style: {
    fontSize: 16,
    lineHeight: 20,
    color: "#D6D6D6",
    "@media (max-width: 1600px) and (min-width: 992px)": {
      fontSize: 14,
      lineHeight: 18,
    },
    "@media (max-width: 850px)": {
      fontSize: 14,
      lineHeight: 18,
    },
  },

  // Mobile: card layout
  card: {
    backgroundColor: "#0D1A4A",
    borderWidth: 1,
    borderColor: "#1C3470",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  card_row: {
    flexDirection: "row",
    marginTop: 10,
  },
  card_cell: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
  },
  card_label: {
    fontSize: 13,
    lineHeight: 18,
    color: "#7791BA",
    fontFamily: "Montserrat",
  },
  card_value: {
    fontSize: 13,
    lineHeight: 18,
    color: "#FFFFFF",
    fontFamily: "Montserrat-SemiBold",
  },

  // Kept for reference — unused
  pending_status: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  rejected_status: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  accepted_status: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  v_center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  row_last: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 5,
  },
});

export { ids, styles };
