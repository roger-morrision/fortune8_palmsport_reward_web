import { useAnimatedReaction, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { selectedLangauge } from "@/src/store/slices/settings.slice";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import { MaterialIcon } from "@/src/common/components/Icon";
import { useSettingService } from "@/src/store/hooks";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import styles from "./styles.css";
import Dropdown from "./dropdown";
import { useMemo, useState } from "react";
import { runOnJS } from "react-native-worklets";
import { usePathname, useRouter } from "expo-router";
import { Raffles as RaffleRoutes } from "@/src/common/utils/options-holder";
import { routeToPathname } from "@/src/common/utils/transform-helper";

const Raffles = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const animated = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

  const isActive = useMemo(() => {
    return RaffleRoutes.some((item) => routeToPathname(item.route) === pathname);
  }, [pathname]);

  useAnimatedReaction(
    () => animated.value === 1,
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setIsOpen)(current);
      }
    }
  );

  const onPress = () => {
    if(animated.value === 0){
      animated.value = withTiming(1, { duration: 500});
    }else{
      animated.value = withTiming(0, { duration: 500});
    }
  };

  const onSelected = (route: string) => {
    router.navigate(route);
    onPress();
  }

  return (
    <View style={styles.v_fbandsound}>
      <Pressable style={styles.v_country} onPress={onPress}>
        <View style={styles.v_country}>
          <Text color={isActive ? "button" : "text"}
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            style={styles.t_label}
            >
            {t("header.raffles")}
          </Text>
          <MaterialIcon 
            disabled 
            color={isActive ? "button" : "text"} 
            name={isOpen ? "expand-less" : "expand-more"} size={14} />
        </View>
      </Pressable>

      <Dropdown {...{baseWidth: 170, baseHeight: 32}} 
        animated={animated}
        onSelected={onSelected} />
    </View>
  );
};

export default Raffles;
