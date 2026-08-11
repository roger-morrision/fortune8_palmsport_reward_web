import React from "react";
import StyleSheet from "react-native-media-query";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useTranslation } from "react-i18next";
import moment from "moment";

const GeneralTerms = () => {
  const { t } = useTranslation();

  return (
    <View 
      backgroundColor="blueDark"
      borderColor="blueBorder"
      style={styles.box_container}
      dataSet={{ media: ids.box_container }} >
      <Description>
        <Text color="yellow" fontFamily="Montserrat-Bold" style={{  }}>
          {t("terms.title")}{"\n"}
        </Text>
        {t("terms.lastupdate")}{"\n\n"}
        {t("terms.desc1")}{"\n\n"}

        {t("terms.desc2")}{"\n"}
        {t("terms.desc3")}{"\n\n"}

        {t("terms.desc4")}{"\n"}
        {t("terms.desc5")}{"\n"}
        {t("terms.desc6")}{"\n"}
        {t("terms.desc7")}{"\n"}
        {t("terms.desc8")}{"\n\n"}

        {t("terms.desc9")}{"\n"}
        {t("terms.desc10")}{"\n\n"}

        {t("terms.desc11")}{"\n"}
        {t("terms.desc12")}{"\n"}
        {t("terms.desc13")}{"\n"}
        {t("terms.desc14")}{"\n"}
        {t("terms.desc15")}{"\n"}
        {t("terms.desc16")}{"\n\n"}

        {t("terms.desc17")}{"\n"}
        {t("terms.desc18")}{"\n"}
        {t("terms.desc19")}{"\n"}
        {t("terms.desc20")}{"\n"}
        {t("terms.desc21")}{"\n"}
        {t("terms.desc22")}{"\n\n"}

        {t("terms.desc23")}{"\n"}
        {t("terms.desc24")}{"\n"}
        {t("terms.desc25")}{"\n"}
        {t("terms.desc26")}{"\n"}
        {t("terms.desc27")}{"\n"}
        {t("terms.desc28")}{"\n\n"}

        {t("terms.desc29")}{"\n"}
        {t("terms.desc30")}{"\n"}
        {t("terms.desc31")}{"\n"}
        {t("terms.desc32")}{"\n\n"}

        {t("terms.desc33")}{"\n\n"}
        {t("terms.desc43")}{"\n\n"}
        {t("terms.desc50")}{"\n\n"}
        {t("terms.desc54")}{"\n\n"}
        {t("terms.desc57")}{"\n\n"}
        {t("terms.desc59")}{"\n\n"}
        {t("terms.desc62")}{"\n\n"}
        {t("terms.desc66")}{"\n\n"}
        {t("terms.desc68")}{"\n\n"}
        {t("terms.desc70")}{"\n\n"}
        {t("terms.desc72")}{"\n\n"}
        {t("terms.desc74")?.replace("2025", moment().format("YYYY"))}{"\n\n\n"}
      </Description>
    </View>
  );
};

const Description = ({ children }: { children: React.ReactNode }) => {
  const processChild = (child: React.ReactNode, key: string): React.ReactNode => {
    if (typeof child !== "string") return child;
    const parts = child.split(/\[T\](.*?)\[\/T\]/g);

    if (parts.length === 1) return child;
    return parts.map((part, i) => (
      <Text
        key={`${key}-${i}`}
        fontFamily={i % 2 === 1 ? "Montserrat-Bold" : "Montserrat"}
        // style={styles.title_style}
        style={i % 2 === 1 ? styles.description_header_style : styles.description_style}
        dataSet={{ media: i % 2 === 1 ? ids.description_header_style : ids.description_style }}
      >
        {part}
      </Text>
    ));
  };

  return (
    <Text color="text" fontFamily="Montserrat">
      {React.Children.map(children, (child, i) => processChild(child, String(i)))}
    </Text>
  );
};

const { ids, styles } = StyleSheet.create({
  box_container: {
    gap: 20,
    width: "100%",
    minHeight: 179,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 9.13,
    borderWidth: 1.83,
    "@media (min-width: 1600px)": {
      paddingLeft: 83,
      paddingRight: 83,
    },
    "@media (min-width: 900px)": {
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  title_style: {
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
  },
  description_header_style: {
    fontSize: 15,
    lineHeight: 23,
  },
  description_style: {
    fontSize: 13,
    lineHeight: 19,
  },
});

export default GeneralTerms;
