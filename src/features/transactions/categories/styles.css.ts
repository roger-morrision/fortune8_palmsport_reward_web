import Colors from "@/src/constants/Colors";
import StyleSheet from "react-native-media-query";

const { ids, styles } = StyleSheet.create({
  categories_container: {
    width: "100%",
    height: 57,
    marginTop: 20,
    maxWidth: 707,
    alignSelf: "center",
    "@media (min-width: 996px)": {
      height: 60,
    },
  },
  category_item_container: {
    height: 57,
    paddingHorizontal: 23,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1.49,
    borderBottomColor: "#314B61",
    "@media (max-width: 1920px) and (min-width: 800px)": {
      height: 60,
    },
    "@media (max-width: 800px)": {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  category_item_container_active: {
    borderBottomColor: Colors.dark.goldFlat,
  },
});

export { ids, styles };
