import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  main_container: {
    width: "100%",
    maxWidth: 1084,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 61,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 1600px)": {
      width: "100%",
      height: 61,
      paddingLeft: 0,
      paddingRight: 0,
    },
    "@media (max-width: 1600px) and (min-width: 800px)": {
      width: "100%",
      height: 61,
      paddingLeft: 20,
      paddingRight: 20,
    },
    "@media (max-width: 768px)": {
      height: 45,
    },
  },
  container2: {
    width: "100%",
    height: 63,
    paddingHorizontal: 29,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      height: 70,
      width: 800,
      paddingHorizontal: 32,
    },
  },
  button_container: {
    left: 21,
    position: "absolute",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      paddingLeft: 32,
      paddingRight: 32,
    },
  },
  text: {
    width: "60%",
    textAlign: "center",
    fontFamily: "PoppinsBold",
    fontSize: 18,
    lineHeight: 20,
    "@media (max-width: 1920px) and (min-width: 800px)": {
      fontSize: 20,
      lineHeight: 22,
    },
  },
});

export { ids, styles };
