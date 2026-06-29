import { filterTabRoutes } from "@/src/common/utils/transform-helper";
import SVGIcon from "@/src/constants/SVGIcon";
import { TouchableOpacity } from "react-native";
import StyleSheet from "react-native-media-query";
import Text from "../Text";
import View from "../View";

type CustomTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export default function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  return (
    <View
      backgroundColor="backgroundDark"
      style={styles.container}
      dataSet={{ media: ids.container }}
    >
      {filterTabRoutes(state.routes).map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const iconName = route.name === "index" ? "home" : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab}>
            <SVGIcon
              name={iconName}
              fill={isFocused ? options.tabBarActiveTintColor : "#98A7B5"}
              {...{ width: 24, height: 24 }}
            />
            <Text
              style={[
                styles.label_style,
                { color: isFocused ? options.tabBarActiveTintColor : "#98A7B5" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    "@media (min-width: 800px)": {
      display: "none",
    },
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 5,
    height: 68,
  },
  tab_home: {
    gap: 1,
    flex: 1,
    height: 68,
    top: "-23%",
    alignItems: "center",
    justifyContent: "center",
  },
  label_style: {
    textTransform: "capitalize",
    fontFamily: "Montserrat",
    fontSize: 12,
    lineHeight: 15,
    color: "#98A7B5",
  },
});
