import React from "react";
import StyleSheet from "react-native-media-query";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useTranslation } from "react-i18next";

const Policy = () => {
  const { t } = useTranslation();

  return (
    <View
      backgroundColor="blueDark"
      borderColor="blueBorder"
      style={styles.box_container}
      dataSet={{ media: ids.box_container }} >
      <Description>
        <Text color="yellow" fontFamily="Montserrat-Bold">
          {t("policy.title")}{"\n"}
        </Text>
        {t("policy.lastupdate")}{"\n\n"}
        {t("policy.pol1")}{"\n"}
        {t("policy.pol2")}{"\n\n"}

        {t("policy.pol3")}{"\n"}
        {t("policy.pol4")}{"\n"}
        {t("policy.pol5")}{"\n"}
        {t("policy.pol6")}{"\n"}
        {t("policy.pol7")}{"\n"}

        {t("policy.pol9")}{"\n"}
        {t("policy.pol10")}{"\n\n"}

        {t("policy.pol11")}{"\n"}
        {t("policy.pol12")}{"\n"}
        {t("policy.pol13")}{"\n"}
        {t("policy.pol14")}{"\n"}
        {t("policy.pol15")}{"\n"}
        {t("policy.pol16")}{"\n"}
        {t("policy.pol17")}{"\n\n"}
        {t("policy.pol18")}{"\n"}
        {t("policy.pol19")}{"\n"}
        {t("policy.pol20")}{"\n"}
        {t("policy.pol21")}{"\n"}
        {t("policy.pol22")}{"\n"}

        {t("policy.pol23")}{"\n"}
        {t("policy.pol24")}{"\n"}
        {t("policy.pol25")}{"\n"}
        {t("policy.pol26")}{"\n\n"}
        {t("policy.pol27")}{"\n\n"}
      </Description>

      {<Table />}

      <Description>
        {"\n"}{t("policy.pol44")}{"\n\n"}
        {t("policy.pol45")}{"\n"}
        {t("policy.pol46")}{"\n"}
        {t("policy.pol47")}{"\n"}
        {t("policy.pol48")}{"\n"}
        {t("policy.pol49")}{"\n"}

        {t("policy.pol50")}{"\n"}
        {t("policy.pol51")}{"\n\n"}

        {t("policy.pol54")}{"\n"}
        {t("policy.pol55")}{"\n"}
        {t("policy.pol56")}{"\n"}
        {t("policy.pol57")}{"\n"}
        {t("policy.pol58")}{"\n"}
        {t("policy.pol59")}{"\n"}
        {t("policy.pol60")}{"\n"}
        {t("policy.pol61")}{"\n"}
        {t("policy.pol62")}{"\n"}
        {t("policy.pol63")}{"\n"}
        {t("policy.pol64")}{"\n"}
        {t("policy.pol65")}{"\n\n"}

        {t("policy.pol66")}{"\n"}
        {t("policy.pol67")}{"\n"}
        {t("policy.pol68")}{"\n"}
        {t("policy.pol69")}{"\n\n"}

        {t("policy.pol71")}{"\n\n"}

        {t("policy.pol79")}{"\n"}
        {t("policy.pol80")}{"\n\n"}

        {t("policy.pol81")}{"\n"}
        {t("policy.pol82")}{"\n"}
        {t("policy.pol83")}{"\n"}
        {t("policy.pol84")}{"\n"}
        {t("policy.pol85")}{"\n"}
        {t("policy.pol86")}{"\n"}
        {t("policy.pol87")}{"\n"}
        {t("policy.pol88")}{"\n"}
        {t("policy.pol89")}{"\n\n"}

        {t("policy.pol92")}{"\n"}
        {t("policy.pol93")}{"\n\n"}

        {t("policy.pol94")}{"\n"}
        {t("policy.pol95")}{"\n\n"}
        {t("policy.pol96")}{"\n"}
        {t("policy.pol97")}{"\n\n"}
        {t("policy.pol98")}{"\n"}
        {t("policy.pol99")}{"\n\n"}
        {t("policy.pol100")}{"\n"}
        {t("policy.pol101")}{"\n\n"}
        {t("policy.pol102")}{"\n"}
        {t("policy.pol103")}{"\n\n"}
        {t("policy.pol104")}{"\n"}
        {t("policy.pol105")}{"\n"}
        {t("policy.pol106")}{"\n"}
        {t("policy.pol107")}{"\n\n\n"}
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

function Table() {
  const { t } = useTranslation();

  const leftRows: string[] = [
    t("policy.pol29"),
    t("policy.pol30"),
    t("policy.pol31"),
    t("policy.pol32"),
    t("policy.pol33"),
    t("policy.pol34"),
    t("policy.pol35"),
  ];

  const rightRows: string[] = [
    t("policy.pol37"),
    `${t("policy.pol38")}; ${t("policy.pol39")}`,
    `${t("policy.pol40")}; ${t("policy.pol41")}`,
    t("policy.pol42"),
    t("policy.pol43"),
    "",
    "",
  ];

  return (
    <View style={tableStyles.container}>
      {/* Header row */}
      <View style={tableStyles.row}>
        <View style={tableStyles.leftCol}>
          <Text fontFamily="Montserrat-Bold" color="text" style={tableStyles.header}>
            {t("policy.pol28")}
          </Text>
        </View>
        <View style={tableStyles.rightCol}>
          <Text fontFamily="Montserrat-Bold" color="text" style={tableStyles.header}>
            {t("policy.pol36")}
          </Text>
        </View>
      </View>
      {/* Data rows */}
      {leftRows.map((left, i) => (
        <View key={i} style={tableStyles.row}>
          <View style={tableStyles.leftCol}>
            <Text fontFamily="Montserrat" color="text" style={tableStyles.cell}>
              {left}
            </Text>
          </View>
          <View style={tableStyles.rightCol}>
            <Text fontFamily="Montserrat-Bold" color="text" style={tableStyles.cell}>
              {rightRows[i]}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const tableStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  leftCol: {
    flex: 1,
    paddingRight: 16,
  },
  rightCol: {
    flex: 1,
  },
  header: {
    fontSize: 14,
    lineHeight: 20,
  },
  cell: {
    fontSize: 13,
    lineHeight: 20,
  },
}).styles;

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

export default Policy;
