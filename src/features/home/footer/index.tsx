import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useAssetContext } from "@/src/context/AssetContext";
import { useHomeContext } from "@/src/context/HomeContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";
import { ids, styles } from "./styles.css";
import moment from "moment";
import Lang from "./language";
import { useTranslation } from "react-i18next";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { useAuthService } from "@/src/store/hooks";

function Footer({ onLayout }: any) {
  const router = useRouter();
  const { t } = useTranslation();
  const { logout } = useAuthService();
  const { images } = useAssetContext();
  const { scrollToSection } = useHomeContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

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
      backgroundColor="primary"
      style={styles.container}
      dataSet={{ media: ids.container }}
      onLayout={onLayout}
    >
      <View style={styles.v_center} dataSet={{ media: ids.v_center }}>
        <Pressable 
          // onPress={() => router.navigate(isLoggedIn ? "Home" : "Welcome")}
          onPress={() => logout()}
          >
          <Image
            style={styles.reward_logo}
            dataSet={{ media: ids.reward_logo }}
            source={{ uri: images?.["palmsplay-rewards"].uri }}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.v_right_content} dataSet={{ media: ids.v_right_content }}>
          <View style={styles.v_row} dataSet={{ media: ids.v_row }}>
            <Text
              fontFamily="Montserrat-Bold"
              selectable={false}
              style={styles.t_note_title}
              dataSet={{ media: ids.t_note_title }}
            >
              {t("footer.policies")}
            </Text>
            <Text
              selectable={false}
              onPress={() => router.navigate("/about/terms-and-conditions")}
              style={styles.t_note_subtitle}
              dataSet={{ media: ids.t_note_subtitle }}
            >
              {t("footer.terms")}
            </Text>
            <Text
              selectable={false}
              onPress={() => router.navigate("/about/privacy-policy")}
              style={styles.t_note_subtitle}
              dataSet={{ media: ids.t_note_subtitle }}
            >
              {t("footer.privacy")}
            </Text>
            
          </View>
          <View style={styles.v_row} dataSet={{ media: ids.v_row }}>
            <Text
              fontFamily="Montserrat-Bold"
              style={styles.t_note_title}
              dataSet={{ media: ids.t_note_title }}
            >
              AZ CONSULTING EOOD
            </Text>
            <Text style={styles.t_note_subtitle} dataSet={{ media: ids.t_note_subtitle }}>
              7 Kukush Street
            </Text>
            <Text style={styles.t_note_subtitle} dataSet={{ media: ids.t_note_subtitle }}>
              Sofia 1345, Bulgaria{"\n\n"}
            </Text>
            
            <Lang />

          </View>
          <View style={styles.v_row} dataSet={{ media: ids.v_row }}>
            <Text
              fontFamily="Montserrat-Bold"
              style={styles.t_note_title}
              dataSet={{ media: ids.t_note_title }}
            >
              {t("footer.support")}
            </Text>
            <Text
              selectable={false}
              onPress={() => router.navigate("/contact-support")}
              style={styles.t_note_subtitle}
              dataSet={{ media: ids.t_note_subtitle }}
            >
              {t("footer.contact")}
            </Text>
            <Text selectable={false} onPress={() => router.navigate("/about/faqs")}
              style={styles.t_note_subtitle} dataSet={{media: ids.t_note_subtitle}}>
              {t("footer.faqs")}
            </Text>
          </View>
          
        </View>
      </View>
      <View style={styles.v_copyright} dataSet={{ media: ids.v_copyright }}>
        <Pressable onPress={() => router.navigate("/")}>
          <Image
            style={styles.reward_logo_below}
            dataSet={{ media: ids.reward_logo_below }}
            source={{ uri: images?.["palmsplay-rewards"].uri }}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.t_copyright} dataSet={{ media: ids.t_copyright }}>
          {t("footer.copyright")?.replace("2025", moment().format("YYYY"))}
        </Text>
      </View>
    </View>
  );
}

export default Footer;
