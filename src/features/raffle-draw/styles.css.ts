import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // maxWidth: 1280,
    "@media (min-width: 996px)": {
      alignSelf: "center",
    },
  },

  v_cashback_rewards: {
    // maxWidth: "80%",
    alignSelf: "center",
    flexDirection: "row",
    maxWidth: 1280,
    // marginHorizontal: 20,
    marginTop: 75,
    gap: 26,
    "@media (max-width: 800px)": {
      gap: 21,
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20,
      alignItems: "center",
      flexDirection: "column",
    },
  },

  v_howitworks: { alignItems: "center", justifyContent: "center", padding: 25 },
  t_howitworks: { fontSize: 22, lineHeight: 27, textAlign: "center" },
  t_hiw_description: { fontSize: 13.44, lineHeight: 15, textAlign: "center" },

  button_view_result: {
    width: 336, height: 55, alignSelf: 'center', marginTop: 20
  },
  label_view_result: { 
    fontSize: 16, lineHeight: 18 
  },

  footer: {
    gap: 10,
    marginTop: 157,
    width: "100%",
    "@media (min-width: 996px)": {
      gap: 0,
    },
  },
});

export { ids, styles };
