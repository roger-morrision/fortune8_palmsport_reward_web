import { useAssetContext } from "@/src/context/AssetContext";
import BGSplash from "@/src/common/components/bg-splash";
import SVGText from "@/src/common/components/SVGText";
import StyleSheet from "react-native-media-query";
import View from "@/src/common/components/View";
import { Image } from "react-native";
import _ from "lodash";

function LeftContent() {
  const { images } = useAssetContext();

  return (
    
    <View style={styles.v_left} dataSet={{ media: ids.v_left }}>
      <BGSplash>
        <View style={styles.v_brand}>
          <Image
            source={{ uri: images?.["palmsplay-rewards"]?.uri }}
            style={styles.i_logo}
            dataSet={{ media: ids.i_logo }}
            resizeMode="stretch"
          />
          
          <SVGText
            text={`COLLECT ALL OF YOUR \n BONUSES EVERYDAY!`}
            strokeWidth={3}
            fontSize={23} 
            strokeColors={["#9E0974", "#9E0974"]}
            fillColors={["#F69166", "#F6DF66", "#F9EC97", "#E8DA54", "#F69166"]}
            offsetFillColors={[0.04, 0.25, 0.57, 0.77, 0.98]}
          />

          <Image
            source={{ uri: images?.["bonus-rewards"]?.uri }}
            style={styles.i_bonus_rewards}
            dataSet={{ media: ids.i_bonus_rewards }}
            resizeMode="contain"
          />
        </View>
      </BGSplash>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  
  // ── Left panel ──────────────────────────────────────
  i_background: {
    width: "120%",
    height: "100%",
    position: "absolute",
    "@media (max-width: 800px)": {
      minWidth: 900,
      top: "-20%",
      alignSelf: "center",
      width: "100%",
      height: "100%",
    },
  },

  i_logo: {
    width: 185,
    height: 141,
    "@media (max-width: 1600px) and (min-width: 801px)": {
      width: 185,
      height: 141,
    },
    "@media (max-width: 800px)": {
      position: "absolute",
      top: "10%",
      width: 185,
      height: 141,
    },
  },
  i_bonus_rewards: {
    width: "85%",
    height: 90,
    marginTop: "5%",
    "@media (max-width: 800px)": {
      // top: "10%",
      // width: 185,
      // height: 141,
    },
  },
  v_left: {
    gap: 20,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      display: "none",
    },
  },
  v_brand: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  t_brand: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 2,
    "@media (max-width: 600px)": {
      fontSize: 22,
      lineHeight: 28,
    },
  },
  t_promo: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
    "@media (max-width: 600px)": {
      fontSize: 16,
      lineHeight: 22,
    },
  },
});

export default LeftContent;
