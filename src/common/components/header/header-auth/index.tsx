import useAppSelector from "@/src/common/hooks/useAppSelector";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import { useAssetContext } from "@/src/context/AssetContext";
import { usePathname, useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
import { useState } from "react";
import Button from "../../Button";
import Text from "../../Text";
import View from "../../View";
import { ids, styles } from "./styles.css";
import Raffles from "./raffles";
import { routeToPathname } from "@/src/common/utils/transform-helper";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import { selectedUserCoins } from "@/src/store/slices/user.slice";
import { Ionicon, MaterialCommunityIcon } from "../../Icon";
import { authActions } from "@/src/store/slices/auth.slice";

function HeaderAuthScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const pathname = usePathname();
  const { images } = useAssetContext();
  const balance = useAppSelector(selectedUserCoins);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(authActions.logout());
  };

  const handleMyAccount = () => {
    setDropdownOpen(false);
    router.navigate("/(tabs)/account");
  };

  console.log("dropdownOpendropdownOpen", dropdownOpen)

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
            onPress={() => router.navigate("/")}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/") === pathname ? "activeHeader" : "#8A9AC0"}
          >
            {t("header.home")}
          </Text>
          <Raffles />
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            onPress={() => router.navigate("/(tabs)/promo-entries")}
            style={[styles.t_center_menu]}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/(tabs)/promo-entries") === pathname ? "activeHeader" : "#8A9AC0"}
          >
            {t("header.promo-entries")}
          </Text>
          <Button
            onPress={() => router.navigate("/(tabs)/elite-plus")}
            style={styles.elite_btn}
            dataSet={{ media: ids.elite_btn }}
          >
            <MaterialCommunityIcon
              disabled
              name="crown"
              size={20}
              color={"#F5C842" as any}
            />
            <Text
              fontFamily="Montserrat-Medium"
              style={styles.t_center_menu}
              dataSet={{ media: ids.t_center_menu }}
              color={routeToPathname("/(tabs)/elite-plus") === pathname ? "activeHeader" : "#8A9AC0"}
            >
              {t("header.elite")}
            </Text>
          </Button>
        </View>

        <View
          style={styles.right_container}
          backgroundColor="primary"
          dataSet={{ media: ids.right_container }}
        >
          <View style={styles.v_logged_in}>
            <View borderColor="borderColor" style={styles.v_sweeps_balance}>
              <Image
                style={styles.i_gold}
                dataSet={{ media: ids.i_gold }}
                source={{ uri: images?.["gold"].uri }}
                resizeMode="contain"
              />
              <View>
                <Text fontFamily="Montserrat-Bold" style={styles.t_balance}>
                  {numeral(balance.GOLD).format("0,000.00")}
                </Text>
                <Text fontFamily="Montserrat-Bold" style={styles.t_balance_label}>
                  {t("header.palms-gold")}
                </Text>
              </View>
            </View>

            <View style={styles.v_account_wrapper}>
              <Button
                borderColor="borderColor" 
                onPress={() => setDropdownOpen((prev) => !prev)}
                style={styles.btn_account}
              >
                <Ionicon disabled name="person-circle-outline" size={28} color={"#8A9AC0" as any} />
                <MaterialCommunityIcon disabled
                  name={dropdownOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={"#8A9AC0" as any}
                />
              </Button>

              {dropdownOpen && (
                <View style={styles.v_dropdown} backgroundColor="#091426" borderColor="borderColor">
                  <Pressable onPress={handleMyAccount} style={styles.dropdown_item}>
                    <MaterialCommunityIcon name="account" size={18}
                      color={routeToPathname("/(tabs)/account") === pathname ? "activeHeader" : "#8A9AC0"} />
                    <Text fontFamily="Montserrat-Medium" style={styles.t_dropdown_item}
                      color={routeToPathname("/(tabs)/account") === pathname ? "activeHeader" : "#8A9AC0"}>
                      {t("header.myaccount")}
                    </Text>
                  </Pressable>
                  <View style={styles.dropdown_divider} borderColor="borderColor" />
                  <Pressable onPress={handleLogout} style={styles.dropdown_item}>
                    <MaterialCommunityIcon name="logout" size={18} color={"#8A9AC0" as any} />
                    <Text fontFamily="Montserrat-Medium" style={[styles.t_dropdown_item, styles.t_logout]}>
                      {t("header.logout")}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {dropdownOpen && (
        <Pressable
          onPress={() => setDropdownOpen(false)}
          style={styles.backdrop}
        />
      )}
    </View>
  );
}

export default HeaderAuthScreen;
