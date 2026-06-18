import Colors from "@/src/constants/Colors";
import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  categories_container: {
    alignItems: "center",
    paddingLeft: 9,
    paddingRight: 9,
    height: 57,
    "@media (max-width: 1920px) and (min-width: 800px)": {
      height: 60,
    },
  },
  category_item_container: {
    height: 50,
    flexDirection: "column",
    paddingHorizontal: 23,
    alignItems: "center",
    justifyContent: "center",
    // borderBottomWidth: 4,
    // borderBottomColor: "#516A81",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      height: 55,
    },
  },
  category_item_indicator: {
    height: 4,
    width: "100%",
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#516A81",
  },
  category_item_container_active: {
    backgroundColor: Colors.dark.goldFlat,
  },
});

export { ids, styles };
