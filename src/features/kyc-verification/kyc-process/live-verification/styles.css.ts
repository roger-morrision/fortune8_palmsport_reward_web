import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  input_container: {
    width: "100%",
    marginTop: 28,
    marginBottom: 98,
    gap: 16,
    zIndex: 1,
    alignSelf: "center",
    maxWidth: 974,
    "@media (min-width: 996px)": {
      marginTop: 35,
    },
    "@media (max-width: 768px)": {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  title_style: {
    fontSize: 22,
    lineHeight: 27,
  },
  description_style: {
    fontSize: 14,
    lineHeight: 18,
  },
  t_help_style: {
    fontSize: 12,
    lineHeight: 16,
    color: "#4C91FF",
    textAlign: "center",
    marginTop: 170,
    textDecorationLine: "underline",
    "@media (min-width: 800px)": {
      fontSize: 14,
      lineHeight: 20,
    },
  },
});

export { ids, styles };
