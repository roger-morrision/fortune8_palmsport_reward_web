import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import { useTranslation } from "react-i18next";

type Benefit = {
  icon: SVGName;
  titleKey: string;
  descKey: string;
};

const BENEFITS: Benefit[] = [
  { icon: "earn",      titleKey: "homepage.benefit-1-title", descKey: "homepage.benefit-1-desc" },
  { icon: "unlock",    titleKey: "homepage.benefit-2-title", descKey: "homepage.benefit-2-desc" },
  { icon: "exclusive", titleKey: "homepage.benefit-3-title", descKey: "homepage.benefit-3-desc" },
  { icon: "elite",     titleKey: "homepage.benefit-4-title", descKey: "homepage.benefit-4-desc" },
];

export default function MoreRewards() {
  const { t } = useTranslation();

  return (
    <View backgroundColor="#0A1220" style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_title} dataSet={{ media: ids.t_title }}>
        {t("homepage.more-title")}{" "}
        <Text fontFamily="Montserrat-Bold" color="button" style={styles.t_title} dataSet={{ media: ids.t_title }}>
          {t("homepage.more-highlight")}
        </Text>
      </Text>
      <Text fontFamily="Montserrat" color="closeColor" style={styles.t_subtitle} dataSet={{ media: ids.t_subtitle }}>
        {t("homepage.more-subtitle")}
      </Text>

      <View style={styles.v_cards} dataSet={{ media: ids.v_cards }}>
        {BENEFITS.map((item, i) => (
          <View borderColor="#F5C8421F" key={i} style={styles.card} dataSet={{ media: ids.card }}>
            <SVGIcon name={item.icon} />
            <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_card_title} dataSet={{ media: ids.t_card_title }}>
              {t(item.titleKey)}
            </Text>
            <Text fontFamily="Montserrat" color="closeColor" style={styles.t_card_desc} dataSet={{ media: ids.t_card_desc }}>
              {t(item.descKey)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 80,
    alignSelf: "center",
    alignItems: "center",
    paddingBottom: 40,
    "@media (max-width: 800px)": {
      paddingTop: 40,
      paddingBottom: 30,
    },
  },
  t_title: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 22,
      lineHeight: 28,
    },
  },
  t_subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 520,
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
      maxWidth: "80%",
    },
  },
  v_cards: {
    gap: 16,
    marginTop: 32,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      gap: 12,
      marginTop: 20,
    },
  },
  card: {
    gap: 10,
    width: 218,
    padding: 20,
    minWidth: 209,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#0D1628",
    "@media (max-width: 800px)": {
      width: "44%",
      minWidth: 0,
      padding: 16,
      gap: 8,
    },
  },
  t_card_title: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 16,
    },
  },
  t_card_desc: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 11,
      lineHeight: 15,
    },
  },
});
