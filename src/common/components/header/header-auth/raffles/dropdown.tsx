
import View from "@/src/common/components/View";
import { Raffles } from "@/src/common/utils/options-holder";
import { useAssetContext } from "@/src/context/AssetContext";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import ItemGold from "./raffle-item";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  baseWidth: number;
  baseHeight: number;
  animated: SharedValue<number>;
  onSelected: (val: string) => void;
}

const Dropdown = ({ baseWidth, baseHeight, animated, onSelected }: Props) => {
  const { t } = useTranslation();
  const containerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animated.value,
      [0, 1],
      [0, baseHeight * 2.1],
      Extrapolation.CLAMP
    );

    return {
      overflow: "hidden",
      position: "absolute",
      borderWidth: animated.value,
      backgroundColor: "#070B3A",
      borderColor: "#1C3470",
      left: 0,
      // minWidth: 100,
      height: height,
      top: baseHeight,
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
      height: baseHeight * 2.1,
    };
  }, [baseWidth, baseHeight]);

  const bodyStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
      opacity: animated.value
    };
  }, [baseWidth, baseHeight]);

  return (
    <AnimatedView style={[containerStyle]}>
      <AnimatedView style={animateStyle}>
        <AnimatedView style={bodyStyle}>
          <ItemGold 
            label={t(`header.${Raffles[0].name}`)}
            route={Raffles[0].route}
            onPress={() => onSelected(Raffles[0].route)} />
          <ItemGold
            label={t(`header.${Raffles[1].name}`)}
            route={Raffles[1].route}
            onPress={() => onSelected(Raffles[1].route)} />
        </AnimatedView>
      </AnimatedView>
    </AnimatedView>
  );
};



export default Dropdown;


