import { useMemo } from "react";
import Screen from "@/src/common/components/Screen";
import View from "@/src/common/components/View";
import { ABOUT_LIST } from "@/src/constants/Objects";
import { useLocalSearchParams } from "expo-router";
import StyleSheet from "react-native-media-query";
import SupportButton from "./support-button";
import { ScrollView } from "react-native";
import Footer from "../homepage/footer";
import Categories from "./categories";
import TierItem from "./display-item";
import FAQs from "./faqs";

function AboutPage() {
  const { page } = useLocalSearchParams();
  const itemSelected = useMemo(() => {
    return ABOUT_LIST.find((item) => item.route === page) || ABOUT_LIST[0];
  }, [page]);

  const RenderContent = useMemo(() => {
    if (itemSelected.title === "FAQs") {
      return <FAQs />;
    }

    return <TierItem title={itemSelected.pageTitle} description={itemSelected.description} />;
  }, [itemSelected]);

  return (
    <>
      <ScrollView style={styles.scroll_style} showsVerticalScrollIndicator={false}>
        <Screen style={styles.main} dataSet={{ media: ids.main }}>
          <Categories />
          <View style={styles.headerDivider} dataSet={{ media: ids.headerDivider }} />
          {RenderContent}
          <SupportButton />
        </Screen>
        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </ScrollView>
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  main: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "center",
    "@media (min-width: 996px)": {
      maxWidth: 974,
    },
  },
  scroll_style: {
    paddingVertical: 34,
  },
  headerDivider: {
    height: 74,
    "@media (max-width: 768px)": {
      height: 27,
    },
  },

  v_info_container: {
    gap: 7,
    marginTop: 17,
    width: "100%",
    maxWidth: 707,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  t_info_notes: {
    fontSize: 14,
    lineHeight: 17,
    fontStyle: "italic",
  },

  v_support: {
    width: "100%",
    marginTop: 36,
    maxWidth: 707,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  t_support_notes: {
    fontSize: 12,
    lineHeight: 15,
  },
  button_support: {
    width: "100%",
    height: 50,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  button_label: {
    fontSize: 18,
    lineHeight: 21,
  },

  footer: {
    gap: 10,
    width: "100%",
    marginTop: 54,
    "@media (min-width: 996px)": {
      gap: 0,
      marginTop: 125,
    },
  },
});

export default AboutPage;
