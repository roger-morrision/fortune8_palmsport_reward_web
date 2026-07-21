import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { MaterialIcon } from "@/src/common/components/Icon";
import StyleSheet from "react-native-media-query";

type Benefit = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  title?: string;
  highlight?: string;
  subtitle?: string;
  benefits?: Benefit[];
};

const DEFAULT_BENEFITS: Benefit[] = [
  { icon: "stars", title: "Earn Palms Gold", description: "Collect through eligible gameplay and activities." },
  { icon: "emoji-events", title: "Unlock Rewards", description: "Move through the tiers to access valuable benefits." },
  { icon: "card-giftcard", title: "Exclusive Draw Entries", description: "Use your rewards access to enter selected VP and member draws." },
  { icon: "workspace-premium", title: "Elite+ Benefits", description: "Unlock extra perks, exclusive games, and subscriber-only rewards." },
];

export default function MoreRewards({
  title = "More Rewards.",
  highlight = "More Benefits.",
  subtitle = "Earn more as you play, unlock better rewards, and access exclusive member benefits.",
  benefits = DEFAULT_BENEFITS,
}: Props) {
  return (
    <View backgroundColor="#0A1220" style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_title} dataSet={{ media: ids.t_title }}>
        {title}{" "}
        <Text fontFamily="Montserrat-Bold" color="button" style={styles.t_title} dataSet={{ media: ids.t_title }}>
          {highlight}
        </Text>
      </Text>
      <Text fontFamily="Montserrat" color="closeColor" style={styles.t_subtitle} dataSet={{ media: ids.t_subtitle }}>
        {subtitle}
      </Text>

      <View style={styles.v_cards} dataSet={{ media: ids.v_cards }}>
        {benefits.map((item, i) => (
          <View borderColor="#F5C8421F" key={i} style={styles.card} dataSet={{ media: ids.card }}>
            <MaterialIcon name={item.icon as any} size={36} color="button" backgroundColor="transparent" />
            <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_card_title} dataSet={{ media: ids.t_card_title }}>
              {item.title}
            </Text>
            <Text fontFamily="Montserrat" color="closeColor" style={styles.t_card_desc} dataSet={{ media: ids.t_card_desc }}>
              {item.description}
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
