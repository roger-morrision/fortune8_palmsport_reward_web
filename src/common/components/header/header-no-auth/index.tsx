import { useAssetContext } from "@/src/context/AssetContext";
import { usePathname, useRouter } from "expo-router";
import { Image } from "react-native";
import Button from "../../Button";
import Text from "../../Text";
import View from "../../View";
import { ids, styles } from "./styles.css";
import { routeToPathname } from "@/src/common/utils/transform-helper";
import { useTranslation } from "react-i18next";
import BGButton from "../../BGButton";
import { useHomeContext, HomeSection } from "@/src/context/HomeContext";

function HeaderNoAuthScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();
  const { images } = useAssetContext();
  const { scrollToSection, pendingSection } = useHomeContext();

  const handleScrollNav = (section: HomeSection) => {
    const isHome = routeToPathname("/") === pathname;
    if (isHome) {
      scrollToSection(section);
    } else {
      pendingSection.current = section;
      router.navigate("/");
    }
  };

  return (
    <View
      style={styles.main_container}
      backgroundColor="primary"
      dataSet={{ media: ids.main_container }}
    >
      <View style={styles.container} backgroundColor="primary" dataSet={{ media: ids.container }}>
        <Button
          onPress={() => router.navigate("/")}
          style={styles.logo_container}
          dataSet={{ media: ids.logo_container }}
        >
          <Image
            style={styles.gambly_logo_style}
            dataSet={{ media: ids.gambly_logo_style }}
            source={{ uri: images?.["palmsplay-rewards"].uri }}
            resizeMode="contain"
          />
        </Button>

        <View style={styles.v_center_menu} dataSet={{ media: ids.v_center_menu }}>
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            style={styles.t_center_menu}
            onPress={() => handleScrollNav("home")}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/") === pathname ? "activeHeader" : "#8A9AC0"}
          >
            {t("header.home")}
          </Text>
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            style={styles.t_center_menu}
            onPress={() => handleScrollNav("benefits")}
            dataSet={{ media: ids.t_center_menu }}
            color="#8A9AC0"
          >
            {t("header.benefits")}
          </Text>
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            onPress={() => handleScrollNav("tiers")}
            style={[styles.t_center_menu]}
            dataSet={{ media: ids.t_center_menu }}
            color="#8A9AC0"
          >
            {t("header.tiers")}
          </Text>
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            onPress={() => handleScrollNav("faq")}
            style={[styles.t_center_menu]}
            dataSet={{ media: ids.t_center_menu }}
            color="#8A9AC0"
          >
            {t("header.faq")}
          </Text>
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            onPress={() => router.navigate("/(tabs)/raffle-draw")}
            style={[styles.t_center_menu]}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/(tabs)/raffle-draw") === pathname ? "activeHeader" : "#8A9AC0"}
          >
            {t("header.raffle")}
          </Text>
        </View>

        <View
          style={styles.right_container}
          backgroundColor="primary"
          dataSet={{ media: ids.right_container }}
        >
          <BGButton
            label={"Login"}
            textColor="textDark"
            onPress={() => router.push("/(modal)/auth/login")}
            style={styles.button_style}
            dataSet={{ media: ids.button_style }}
            fontFamily="Montserrat-Bold"
            labelStyle={styles.btn_login_label}
            bgColors={["#DF7B0B", "#E5D33D"]}
            strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
            borderWidth={1}
          />
        </View>
      </View>
    </View>
  );
}

export default HeaderNoAuthScreen;
