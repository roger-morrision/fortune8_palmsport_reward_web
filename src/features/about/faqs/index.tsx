import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { ids, styles } from "./styles.css";
import FAQList from "./faq.json";
import FAQItem from "./faq-item";
import View from "@/src/common/components/View";
import TextInput from "@/src/common/components/TextInput";
import { FeatherIcon, MaterialIcon } from "@/src/common/components/Icon";
import { useTranslation } from "react-i18next";

type FaqItem = {
  questionKey: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    questionKey: "homepage.faq-q1",
    answer: "homepage.faq-q1-answer",
  },
  {
    questionKey: "homepage.faq-q2",
    answer: "homepage.faq-q2-answer",
  },
  {
    questionKey: "homepage.faq-q3",
    answer: "homepage.faq-q3-answer",
  },
  {
    questionKey: "homepage.faq-q4",
    answer: "homepage.faq-q4-answer",
  },
  {
    questionKey: "homepage.faq-q5",
    answer: "homepage.faq-q5-answer",
  },
  {
    questionKey: "homepage.faq-q6",
    answer: "homepage.faq-q6-answer",
  },
  {
    questionKey: "homepage.faq-q7",
    answer: "homepage.faq-q7-answer",
  },
  {
    questionKey: "homepage.faq-q8",
    answer: "homepage.faq-q8-answer",
  },
  {
    questionKey: "homepage.faq-q9",
    answer: "homepage.faq-q9-answer",
  },
];

const FAQs = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");

  const faqList = useMemo(() => {
    if (search) {
      return FAQList.filter((item) => item.title?.toLowerCase().includes(search.toLowerCase()));
    }

    return FAQList;
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", marginBottom: 15 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.ti_style}
          placeholder="SEARCH FOR KEYWORDS"
          backgroundColor="secondary"
        />
        {search && (
          <MaterialIcon
            asButton
            onPress={() => setSearch("")}
            name="close"
            backgroundColor="transparent"
            color="textGray"
            size={22}
            style={{ position: "absolute", right: 51 }}
          />
        )}
        <FeatherIcon
          disabled
          name="search"
          backgroundColor="transparent"
          color="textGray"
          size={25}
          style={{ position: "absolute", right: 10 }}
        />
      </View>
      <FlatList
        data={faqList}
        keyExtractor={(item, index) => `faq_idx${index}`}
        ItemSeparatorComponent={() => <View style={styles.v_separator} />}
        renderItem={({ item, index }) => {
          return <FAQItem key={`faq_idx${index}`} item={item} />;
        }}
      />
    </View>
  );
};

export default FAQs;
