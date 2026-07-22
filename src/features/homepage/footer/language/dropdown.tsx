
import View from "@/src/common/components/View";
import { Languages } from "@/src/common/utils/options-holder";
import { useAssetContext } from "@/src/context/AssetContext";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import ItemGold from "./lang-item";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  baseWidth: number;
  baseHeight: number;
  animated: SharedValue<number>;
  onSelected: (val: "bg" | "en") => void;
}

const Dropdown = ({ baseWidth, baseHeight, animated, onSelected }: Props) => {
  const { images } = useAssetContext();

  const containerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animated.value,
      [0, 1],
      [0, baseHeight * 2.2],
      Extrapolation.CLAMP
    );

    return {
      overflow: "hidden",
      position: "absolute",
      left: 0,
      width: baseWidth, 
      height: height,
      top: baseHeight * 1.1,
    };
  }, [baseWidth, baseHeight]);

  const animateStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animated.value,
      [0, 1],
      [-(baseHeight * 0.18), 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{translateY}],
      paddingTop: baseHeight * 0.01,
      width: 70, 
      height: 25,
    };
  }, [baseWidth, baseHeight]);

  const bodyStyle = useAnimatedStyle(() => {
    return {
      gap: "1%",
      alignItems: "center",
      opacity: animated.value
    };
  }, [baseWidth, baseHeight]);

  return (
    <AnimatedView style={[containerStyle]}>
      <AnimatedView style={animateStyle}>
        <AnimatedView style={bodyStyle}>
          <ItemGold 
            label={Languages[0].name}
            {...{baseWidth, baseHeight}}
            onPress={() => onSelected(Languages[0].source)}
            source={{uri: images?.["en"].uri}} />
          <ItemGold 
            label={Languages[1].name}
            {...{baseWidth, baseHeight}}
            onPress={() => onSelected(Languages[1].source)}
            source={{uri: images?.["bg"].uri}} />
        </AnimatedView>
      </AnimatedView>
    </AnimatedView>
  );
};



export default Dropdown;


