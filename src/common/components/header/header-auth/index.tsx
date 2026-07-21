import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import { usePathname, useRouter } from "expo-router";
import { Image } from "react-native";
import Button from "../../Button";
import Text from "../../Text";
import View from "../../View";
import { ids, styles } from "./styles.css";
import Raffles from "./raffles";
import { routeToPathname } from "@/src/common/utils/transform-helper";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import { selectedUserCoins } from "@/src/store/slices/user.slice";
import BGButton from "../../BGButton";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";

function HeaderAuthScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();
  const { images } = useAssetContext();
  const balance = useAppSelector(selectedUserCoins);
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

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
            color={routeToPathname("/") === pathname ? "button" : "text"}
          >
            {t("header.home")}
          </Text>
          <Text
            suppressHighlighting
            fontFamily="Montserrat-Medium"
            onPress={() => router.navigate("/(tabs)/account")}
            style={[styles.t_center_menu]}
            dataSet={{ media: ids.t_center_menu }}
            color={routeToPathname("/(tabs)/account") === pathname ? "button" : "text"}
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
        {isLoggedIn ? <View borderColor="borderColor" backgroundColor="backgroundDark" style={styles.v_sweeps_balance}>
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
        </View> : 
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
        }
        </View>
      </View>
    </View>
  );
}

export default HeaderAuthScreen;
