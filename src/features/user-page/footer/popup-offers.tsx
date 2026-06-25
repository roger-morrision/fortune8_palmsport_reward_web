import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useSettingService } from "@/src/store/hooks";
import { selectedTheme } from "@/src/store/slices/settings.slice";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import StyleSheet from "react-native-media-query";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const size = 16;
const PopupOffer = () => {
  const animated = useSharedValue(0);
  const [width, setWidth] = useState(0);
  const theme = useAppSelector(selectedTheme);
  const isDarkmode = theme === "dark";
  const { updateTheme } = useSettingService();
  const onPress = () => {
    updateTheme(isDarkmode ? "light" : "dark");
  };

  const onLayout = (e: any) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const animateSound = () => {
    if (!width) return null;

    const toValue = isDarkmode ? 0 : -(width - size - 6);
    animated.value = withTiming(toValue, { duration: 300 });
  };

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animated.value,
        [-(width - size), 0],
        ["#213250", "#172752"],
      ),
    };
  }, [width, size]);

  const animateStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animated.value,
        [-(width - size), 0],
        ["#8197BB", "#17C15E"],
      ),
      transform: [{ translateX: animated.value }],
    };
  }, [width, size]);

  useEffect(() => {
    animateSound();
  }, [isDarkmode, width]);

  return (
    <View style={styles.row_container} dataSet={{ media: ids.row_container }}>
      <Text style={styles.text_style}>Show Pop-up offers</Text>
      <Pressable onPress={onPress}>
        <Animated.View onLayout={onLayout} style={[styles.container, backgroundStyle]}>
          <Animated.View
            style={[styles.circleStyle, { width: size, height: size }, animateStyle]}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const { ids, styles } = StyleSheet.create({
  row_container: {
    gap: 21,
    borderTopWidth: 2,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingHorizontal: 17,
    borderTopColor: "#0C193A",
    justifyContent: "flex-start",
    borderBottomColor: "#0C193A",
  },
  container: {
    width: 51,
    height: 20,
    paddingHorizontal: 2,
    borderRadius: 25,
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#3A2602",
    borderWidth: 1,
    borderColor: "#172752",
  },
  circleStyle: {
    width: "50%",
    height: "120%",
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "#F7A60B",
  },
  text_style: {
    fontFamily: "Montserrat",
    fontSize: 14,
    lineHeight: 16,
  },
});

export default PopupOffer;
