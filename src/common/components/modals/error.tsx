import { useRootContext } from "@/src/context/RootContext";
import _ from "lodash";
import React, { useEffect } from "react";
import { Modal, useWindowDimensions } from "react-native";
import StyleSheet from "react-native-media-query";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Button from "../Button";
import Text from "../Text";
import View from "../View";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Button);

const Error = () => {
  const SCREEN_WIDTH = useWindowDimensions().width;
  const translateX = useSharedValue(SCREEN_WIDTH);
  const { errorMessage, handleResetError } = useRootContext();

  useEffect(() => {
    if (!_.isEmpty(errorMessage)) {
      translateX.value = withDelay(0, withTiming(0, { duration: 300 }));
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        handleClose();
      }, 3000);
    }
  }, [errorMessage]);

  const handleClose = () => {
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(handleResetError)();
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedBackDrop = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [100, 0], [0, 1], Extrapolate.CLAMP);
    return {
      opacity,
    };
  });

  if (_.isEmpty(errorMessage)) return null;

  return (
    <Modal transparent visible animationType={"none"} onRequestClose={handleClose}>
      <View style={styles.container}>
        <AnimatedView backgroundColor={"error"} style={[styles.message_container, animatedStyle]}>
          <Text color="text" style={styles.message_style}>
            {errorMessage}
          </Text>
        </AnimatedView>
        <AnimatedPressable
          style={[styles.backdrop, animatedBackDrop]}
          onPress={() => handleClose()}
        />
      </View>
    </Modal>
  );
};

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
  },
  backdrop: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  message_container: {
    top: 20,
    right: 20,
    maxWidth: "80%",
    minHeight: 50,
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  message_style: {
    fontFamily: "PoppinRegular",
    fontSize: 15,
    lineHeight: 17,
    textAlign: "center",
  },
});

export default Error;
