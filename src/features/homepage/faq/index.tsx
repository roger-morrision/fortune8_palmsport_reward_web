import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { MaterialIcon } from "@/src/common/components/Icon";
import { useState } from "react";
import { Pressable } from "react-native";
import StyleSheet from "react-native-media-query";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title?: string;
  highlight?: string;
  items?: FaqItem[];
};

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "Are rewards available to all Palms Play members?",
    answer: "Yes, rewards are available to all registered Palms Play members. Simply sign up and start earning Palms Gold through eligible activities.",
  },
  {
    question: "How do I earn Palms Gold?",
    answer: "You can earn Palms Gold by participating in eligible gameplay, completing daily activities, and reaching milestones within the platform.",
  },
  {
    question: "How do I enter a rewards draw?",
    answer: "Use your accumulated Palms Gold to purchase tickets for available raffle draws. Go to the Raffle Draw section and select the number of tickets you wish to enter.",
  },
  {
    question: "When are draw winners announced?",
    answer: "Draw winners are announced shortly after each draw closes. Results are published in the Draw Results section and winners are notified via email.",
  },
  {
    question: "Are some draws exclusive to Elite+ members?",
    answer: "Yes, certain VIP draws and exclusive tournaments are reserved for Elite+ subscribers. Upgrade to Elite+ to access these premium draws.",
  },
];

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <View backgroundColor="#0A1220" style={styles.faq_item} dataSet={{ media: ids.faq_item }}>
      <Pressable style={styles.faq_header} onPress={() => setOpen((v) => !v)}>
        <Text
          fontFamily="Montserrat-SemiBold"
          color="text"
          style={styles.t_question}
          dataSet={{ media: ids.t_question }}
        >
          {item.question}
        </Text>
        <MaterialIcon
          name={open ? "expand-less" : "expand-more"}
          size={24}
          color="closeColor"
          backgroundColor="transparent"
        />
      </Pressable>
      {open && (
        <Text
          fontFamily="Montserrat"
          color="closeColor"
          style={styles.t_answer}
          dataSet={{ media: ids.t_answer }}
        >
          {item.answer}
        </Text>
      )}
    </View>
  );
}

export default function FAQ({
  title = "Frequently Asked",
  highlight = "Questions",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <View backgroundColor="#0A1220" style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.center} dataSet={{ media: ids.center }}>
        <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_title} dataSet={{ media: ids.t_title }}>
          {title}{" "}
          <Text fontFamily="Montserrat-Bold" color="button" style={styles.t_title} dataSet={{ media: ids.t_title }}>
            {highlight}
          </Text>
        </Text>

        <View style={styles.v_list} dataSet={{ media: ids.v_list }}>
          {items.map((item, i) => (
            <FaqRow key={i} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 64,
    paddingVertical: 80,
    "@media (max-width: 800px)": {
      marginTop: 40,
      paddingLeft: 16,
      paddingRight: 16
    },
  },
  center: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    alignItems: "center",
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
  v_list: {
    width: "100%",
    marginTop: 28,
    gap: 0,
    "@media (max-width: 800px)": {
      marginTop: 16,
    },
  },
  faq_item: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#21366E",
    paddingVertical: 16,
  },
  faq_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  t_question: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
    },
  },
  t_answer: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    "@media (max-width: 800px)": {
      fontSize: 12,
      lineHeight: 18,
    },
  },
});
