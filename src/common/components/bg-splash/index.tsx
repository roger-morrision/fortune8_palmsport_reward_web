import React from "react";
import { useAssetContext } from "@/src/context/AssetContext";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { LinearGradient } from "expo-linear-gradient";
import View from "@/src/common/components/View";
import { ids, styles } from "./styles.css";
import { Image, useWindowDimensions } from "react-native";
import PackegeJson from "@/package.json";
import Text from "../Text";

interface BGSplashProps {
  children: React.ReactElement;
}

const BGSplash = (props: BGSplashProps) => {
  const { images } = useAssetContext();
  const { width } = useWindowDimensions();

  const colors = useBreakpoint({
    default: ["rgba(0, 4, 122, 0)", "rgba(0, 34, 96, 1)"],
    mobile: ["rgba(7, 30, 71, 0.02)", "rgba(7, 30, 71, 1)", "rgba(7, 30, 71, 1)"],
    tablet: ["rgba(7, 30, 71, 0.02)", "rgba(7, 30, 71, 1)", "rgba(7, 30, 71, 1)"],
  });

  const locations = useBreakpoint({
    default: [0, 1],
    mobile: [0, 0.2, 1],
    tablet: [0, 0.2, 1],
  });

  return (
    <View style={styles.container} dataSet={{media: ids.container}}>      
      <Image 
        style={styles.i_background} 
        dataSet={{media: ids.i_background}}
        source={{uri: images?.["bg-authentication"]?.uri}} 
        resizeMode="cover" />
      <LinearGradient
        colors={colors}
        locations={locations}
        style={styles.linear_container} 
        dataSet={{media: ids.linear_container}}/>
        <View style={styles.bodyStyle} dataSet={{media: ids.bodyStyle}}>
          {props.children}
        </View>
    </View>
  );
};

export default BGSplash;
