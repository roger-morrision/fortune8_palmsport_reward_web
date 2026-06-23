import Colors from "@/src/constants/Colors";
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
  c_text_style: {
    fontSize: 14,
    fontFamily: "IBMPlexSans",
    "@media (max-width: 768px)": {
      fontSize: 11,
      lineHeight: 12,
    },
  },
  v_center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actions_icon: {
    height: 18,
    width: 18,
    marginRight: 8,
    "@media (max-width: 768px)": {
      height: 12,
      width: 12,
    },
  },
  row_last: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 5,
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
});

export { ids, styles };
