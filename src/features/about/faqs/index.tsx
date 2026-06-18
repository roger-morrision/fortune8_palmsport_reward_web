import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { ids, styles } from "./styles.css";
import FAQList from "./faq.json";
import FAQItem from "./faq-item";
import View from "@/src/common/components/View";
import TextInput from "@/src/common/components/TextInput";
import { FeatherIcon, MaterialIcon } from "@/src/common/components/Icon";

const FAQs = () => {
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
