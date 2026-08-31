import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import BGButton from "@/src/common/components/BGButton";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import StyleSheet from "react-native-media-query";
import { useAssetContext } from "@/src/context/AssetContext";
import { useTranslation } from "react-i18next";
import { PALMSPLAY_GAME_URL } from "@/src/constants/Config";

export default function HomeBanner() {
  const { images } = useAssetContext();
  const { t } = useTranslation();

  const gotoGame = () => {
    window.location.href = PALMSPLAY_GAME_URL;
  };

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Image
        source={{ uri: images?.["home-banner"].uri }}
        style={styles.img}
        dataSet={{ media: ids.img }}
        resizeMode="stretch"
      />
      <LinearGradient
        colors={["#000D3000", "#000D30"]}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
        dataSet={{ media: ids.gradient }}
      />
      <View style={styles.v_left} dataSet={{ media: ids.v_left }}>
        <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_title} dataSet={{ media: ids.t_title }}>
          {t("homepage.banner-title")}
        </Text>
        <Text fontFamily="Montserrat" color="text" style={styles.t_desc} dataSet={{ media: ids.t_desc }}>
          {t("homepage.banner-desc")}
        </Text>
        <BGButton
          label={t("homepage.banner-btn")}
          style={styles.btn}
          borderRadius={4}
          onPress={gotoGame}
          dataSet={{ media: ids.btn }}
          fontFamily="Montserrat-Bold"
          labelStyle={styles.btn_label}
          bgColors={["#DF7B0B", "#E5D33D"]}
          strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
          borderWidth={1}
        />
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    height: 382,
    alignSelf: "center",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 800px)": {
      height: 450,
    },
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
    "@media (max-width: 800px)": {
      width: "200%",
      height: "80%",
      top: 0,
      right: 0,
      left: undefined,
    },
  },
  gradient: {
    bottom: 0,
    width: "100%",
    height: "70%",
    display: "none",
    position: "absolute",
    "@media (max-width: 800px)": {
      display: "flex",
    },
  },
  v_left: {
    gap: 14,
    width: "50%",
    alignItems: "center",
    "@media (max-width: 800px)": {
      width: "100%",
      bottom: 0,
      height: "90%",
      justifyContent: "flex-end",
    },
  },
  t_title: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0.5,
    color: "#FFCF3D",
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 22,
      lineHeight: 28,
      textAlign: "center",
    },
  },
  t_desc: {
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 380,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
      textAlign: "center",
    },
  },
  btn: {
    height: 44,
    width: 160,
    marginTop: 8,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      width: 140,
      height: 40,
    },
  },
  btn_label: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
});
