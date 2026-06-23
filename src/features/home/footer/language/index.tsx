import BGButton from "@/src/common/components/BGButton";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { Languages } from "@/src/common/utils/options-holder";
import { ImageKey } from "@/src/constants/Images";
import { useSettingService } from "@/src/store/hooks";
import { selectedLangauge } from "@/src/store/slices/settings.slice";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.css";
import Dropdown from "./dropdown";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useAssetContext } from "@/src/context/AssetContext";
import { Image } from "react-native";

const Lang = () => {
  const { t } = useTranslation();
  const animated = useSharedValue(0);
  
  const { images } = useAssetContext();
  const lang = useAppSelector(selectedLangauge);
  const { changeLanguage } = useSettingService();

  const onPress = () => {
    if(animated.value === 0){
      animated.value = withTiming(1, { duration: 500});
    }else{
      animated.value = withTiming(0, { duration: 500});
    }
  };

  const onSelected = (value: "bg" | "en") => {
    changeLanguage(value);
    onPress();
  }

  const selected = useMemo(() => {
    const result = Languages.find(item => item.source === lang);

    return {
      ...result,
      source: images?.[result?.source as ImageKey]?.uri
    }
  },[lang, images]);

  return (
    <View style={styles.v_fbandsound}>
      <BGButton
        textColor="text"
        fontFamily="PoppinsMedium"
        bgLocations={[0, 0.95, 1]}
        borderRadius={11}
        label={t("settings.how-to-play")}
        style={[ { width: 70, height: 25}]}
        innerStart={{ x: 0, y: 1 }}
        innerEnd={{ x: 0, y: 0 }}
        strokeColors={["#ffffff", "#ffffff", "#ffffff"]}
        bgColors={["#2061AF", "#69BBFF", "#9ED3FF"]}
        onPress={onPress}
        outerLinearStyle={{
          paddingBottom: 0, paddingLeft: 0, paddingRight: 0, 
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 7 },
          shadowOpacity: 0.6,
          shadowRadius: 10,
        }}
        labelStyle={{fontSize: 12, lineHeight: 14 }}
      >
        <View style={styles.v_country}>
          <View style={styles.v_country}>
            <Image
              style={{ width: 14, marginTop: "2%", height: 14 }} 
              source={{uri: selected.source}} resizeMode="stretch" />
            <Text color="text" 
              fontFamily="PoppinsBold" 
              style={{fontSize: 10 }}
              >{selected?.short}
            </Text>
            <MaterialIcon disabled name="expand-more" size={14} />
          </View>
        </View>

        
      </BGButton>

      <Dropdown {...{baseWidth: 70, baseHeight: 25}} 
        animated={animated}
        onSelected={onSelected} />
    </View>
  );
};

export default Lang;
