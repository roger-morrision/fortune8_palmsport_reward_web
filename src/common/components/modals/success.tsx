import { useRootContext } from "@/src/context/RootContext";
import _ from "lodash";
import React, { useEffect } from "react";
import { Modal, Pressable } from "react-native";
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
import Text from "../Text";
import View from "../View";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Success = () => {
  const translateY = useSharedValue(-150);
  const { successMessage, setSuccessMessage } = useRootContext();

  useEffect(() => {
    if (!_.isEmpty(successMessage)) {
      translateY.value = withDelay(0, withTiming(0, { duration: 400 }));
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        handleClose();
      }, 3000);
    }
  }, [successMessage]);

  const handleClose = () => {
    translateY.value = withTiming(-150, { duration: 400 }, (finished) => {
      if (finished) {
        runOnJS(setSuccessMessage)("");
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackDrop = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [100, 0], [0, 1], Extrapolate.CLAMP);
    return {
      opacity,
    };
  });

  if (_.isEmpty(successMessage)) return null;

  return (
    <Modal transparent visible animationType={"none"} onRequestClose={handleClose}>
      <View style={styles.container}>
        <AnimatedView backgroundColor={"success"} style={[styles.message_container, animatedStyle]}>
          <Text color="text" style={styles.message_style}>
            {successMessage}
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
    alignItems: "center",
  },
  backdrop: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  message_container: {
    top: 50,
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

export default Success;
