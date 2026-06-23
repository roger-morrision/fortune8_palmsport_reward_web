import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    "@media (min-width: 996px)": {
      paddingLeft: 50,
      paddingRight: 50,
    },
  },
  v_center: {
    flex: 1,
    flexDirection: "row",
    gap: 118,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    "@media (max-width: 768px)": {
      gap: 0,
    },
  },
  reward_logo: {
    width: 200,
    height: 140,
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  v_right_content: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 100,
    "@media (max-width: 768px)": {
      gap: 20,
    },
  },
  v_row: {
    flexShrink: 1,
  },
  v_copyright: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    gap: 15,
  },
  reward_logo_below: {
    width: 72,
    height: 43,
    display: "none",
    "@media (max-width: 768px)": {
      display: "flex",
    },
  },
  t_copyright: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Inter",
    "@media (max-width: 768px)": {
      fontSize: 10,
    },
  },
  t_note_title: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 15,
    "@media (max-width: 768px)": {
      fontSize: 11.2,
      lineHeight: 15,
    },
  },
  t_note_subtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "PoppinsRegular",
    "@media (max-width: 768px)": {
      fontSize: 13,
      lineHeight: 20,
    },
  },
});

export { ids, styles };
