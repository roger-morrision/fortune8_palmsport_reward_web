import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import { useHomeContext } from "@/src/context/HomeContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { selectNotificationUnreadCount } from "@/src/store/slices/notification.slice";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, usePathname, useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import Button from "../../Button";
import Text from "../../Text";
import View from "../../View";
import { ids, styles } from "./styles.css";
import Raffles from "./raffles";
import { routeToPathname } from "@/src/common/utils/transform-helper";
import { useTranslation } from "react-i18next";

function HeaderAuthScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();
  const navigation = useNavigation();
  const { images } = useAssetContext();
  const { scrollToSection } = useHomeContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const unreadCount = useAppSelector(selectNotificationUnreadCount);

  const onScroll = (view: any) => {
    if (view === "howItWorks") {
      router.push("/(modal)/how-it-works");
    } else {
      router.replace("/");
    }

    setTimeout(() => {
      scrollToSection(view);
    }, 10);
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
            fontFamily="PoppinsMedium"
            style={styles.t_center_menu}
            onPress={() => router.navigate("/")}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/") === pathname ? "button" : "text"}
          >
            {t("header.home")}
          </Text>
          <Text
            suppressHighlighting
            fontFamily="PoppinsMedium"
            onPress={() => router.navigate("/(stack)/user-profile")}
            style={[styles.t_center_menu]}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/(stack)/user-profile") === pathname ? "button" : "text"}
          >
            {t("header.myaccount")}
          </Text>
          <Raffles />
        </View>

        <View
          style={styles.right_container}
          backgroundColor="primary"
          dataSet={{ media: ids.right_container }}
        >
          {isLoggedIn ? (
            <Button style={{ marginRight: 10 }} onPress={() => router.navigate("/(modal)/inbox")}>
              <MaterialIcons name="notifications" size={28} color="white" />
              {unreadCount > 0 && (
                <View backgroundColor="blue" style={styles.v_bell}>
                  <Text color="text" style={styles.t_bell_number}>
                    {unreadCount}
                  </Text>
                </View>
              )}
            </Button>
          ) : (
            <Button
              borderColor="button"
              onPress={() => router.push("/(modal)/auth/login")}
              style={styles.button_style}
              dataSet={{ media: ids.button_style }}
            >
              <Text fontFamily="PoppinsMedium">Log in</Text>
            </Button>
          )}
          <Button onPress={() => (navigation as any).openDrawer()}>
            <MaterialIcons name="list" size={35} color="white" />
          </Button>
        </View>
      </View>
    </View>
  );
}

export default HeaderAuthScreen;
