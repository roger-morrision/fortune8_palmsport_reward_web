import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { MaterialIcon } from "@/src/common/components/Icon";
import { Pressable, ViewStyle } from "react-native";
import StyleSheet from "react-native-media-query";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

type Props = {
  variant?: "blue" | "gold";
};

const THEME = {
  blue: {
    container:   { borderColor: "#1C3470", backgroundColor: "#051338" },
    iconCircle:  { borderColor: "#1C3470", backgroundColor: "#07194A" },
    iconColor:   "#5195FF" as const,
    title:       "#FFFFFF",
    chevron:     "#FFFFFF",
    divider:     "#1C3470",
  },
  gold: {
    container:   { borderColor: "#3A2800", backgroundColor: "#0C0800" },
    iconCircle:  { borderColor: "#4A3800", backgroundColor: "#1A1000" },
    iconColor:   "#C9A84C" as const,
    title:       "#C9A84C",
    chevron:     "#C9A84C",
    divider:     "#3A2800",
  },
};

export default function DrawTerms({ variant = "blue" }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = THEME[variant];

  return (
    <View
      style={[styles.container, theme.container] as ViewStyle[]}
      dataSet={{ media: ids.container }}
    >
      <Pressable style={styles.header} onPress={() => router.push("/about/terms-and-conditions")}>
        {/* Icon badge */}
        <View style={[styles.icon_circle, theme.iconCircle] as ViewStyle[]}>
          <MaterialIcon
            disabled
            name="description"
            size={18}
            color={theme.iconColor as any}
          />
        </View>

        <Text
          fontFamily="Montserrat-Bold"
          style={[styles.t_title, { color: theme.title }]}
          dataSet={{ media: ids.t_title }}
        >
          {t("raffle-draw.draw-terms")}
        </Text>

        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text
            fontFamily="Montserrat-Bold"
            style={[styles.t_title, { color: theme.title }]}
            dataSet={{ media: ids.t_title }}
          >
            {t("raffle-draw.view-terms")}
          </Text>
          <MaterialIcon
            disabled
            name={"chevron-right"}
            size={24}
            color={theme.chevron as any}
          />
        </View>
       
      </Pressable>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    maxWidth: 1212,
    marginTop: 100,
    marginBottom: 25,
    borderWidth: 1,
    "@media (max-width: 800px)": {
      borderRadius: 8,
      marginTop: 70,
      marginBottom: 40,
    },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    "@media (max-width: 800px)": {
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
  },
  icon_circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  t_title: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1,
    flex: 1,
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
    },
  },
  divider: {
    height: 1,
    opacity: 0.4,
    marginHorizontal: 0,
  },
  v_content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 16,
    "@media (max-width: 800px)": {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 20,
      gap: 12,
    },
  },
  t_content: {
    fontSize: 14,
    lineHeight: 23,
    opacity: 0.85,
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 21,
    },
  },
});
