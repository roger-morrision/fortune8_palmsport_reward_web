import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import BGButton from "@/src/common/components/BGButton";
import StyleSheet from "react-native-media-query";
import { CDNImageKey } from "@/src/constants/Images";
import { useAssetContext } from "@/src/context/AssetContext";
import { Image } from "react-native";
import { FontAwesomeIcon, MaterialIcon, MaterialSymbol } from "@/src/common/components/Icon";
import SVGIcon, { SVGName } from "@/src/constants/SVGIcon";
import Button from "@/src/common/components/Button";

type Tier = {
  name: string;
  gameAccess: string;
  bonus: string;
  color: string;
  icon: CDNImageKey;
  isElite?: boolean;
};

type Props = {
  label?: string;
  title?: string;
  subtitle?: string;
  tiers?: Tier[];
  onGetStarted?: (tier: Tier) => void;
  onViewElite?: () => void;
  onJoinNow?: () => void;
};

const DEFAULT_TIERS: Tier[] = [
  { name: "Copper",  gameAccess: "Entry Level",        bonus: "None",                   color: "#C65918",   icon: "tier-cup-copper"},
  { name: "Bronze",  gameAccess: "Prime Games",        bonus: "3,000,000 Silver Coins",  color: "#CF7D0C",  icon: "tier-cup-bronze" },
  { name: "Silver",  gameAccess: "Premium Games",      bonus: "10,000,000 Silver Coins", color: "#8197BB",  icon: "tier-cup-silver" },
  { name: "Gold",    gameAccess: "VIP Games",          bonus: "17,000,000 Silver Coins", color: "#FFB019",  icon: "tier-cup-gold" },
];

const ELITE_TIER = {
  name: "ELITE+",
  gameAccess: "All Games Unlocked",
  dailyReward: "up to 2,500,000",
  exclusivePerks: "VIP Draws & Tournaments",
};

export default function ExploreRewards({
  label = "PALMS TIERS",
  title = "Explore Your Rewards",
  subtitle = "Progress through the Palms Tiers or unlock more with Elite+",
  tiers = DEFAULT_TIERS,
  onGetStarted,
  onViewElite,
  onJoinNow,
}: Props) {
  const { images } = useAssetContext();

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="Montserrat-Bold" color="button" style={styles.t_label} dataSet={{ media: ids.t_label }}>
        {label}
      </Text>
      <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_title} dataSet={{ media: ids.t_title }}>
        {title}
      </Text>
      <Text fontFamily="Montserrat" color="closeColor" style={styles.t_subtitle} dataSet={{ media: ids.t_subtitle }}>
        {subtitle}
      </Text>

      <View style={styles.v_tiers} dataSet={{ media: ids.v_tiers }}>
        {tiers.map((tier, i) => (
          <View
            key={i}
            style={styles.tier_card}
            dataSet={{ media: ids.tier_card }}
          >
            <Image style={styles.i_tier_cup} source={{ uri: images?.[tier.icon] }} resizeMode="contain" />
            <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_tier_name} dataSet={{ media: ids.t_tier_name }}>
              {tier.name}
            </Text>
            <Item svg="game-controller" label="GAME ACCESS" description={tier.gameAccess} />
            <Item svg="gift" label="BONUS" description={tier.bonus} />

            <Button
              style={styles.btn_start}
              borderColor="#CD7F3255"
              backgroundColor="#CD7F3233"
              onPress={() => onGetStarted?.(tier)}
              dataSet={{ media: ids.btn_start }}>
              <Text 
                color="#F5C842"
                fontFamily="Montserrat-Bold"
                style={styles.btn_start_label} >
                Get Started
              </Text>
            </Button>
          </View>
        ))}

        {/* Elite+ card */}
        <View style={styles.elite_card} dataSet={{ media: ids.elite_card }}>
          <View backgroundColor="#F5C842" style={styles.elite_badge}>
            <Text fontFamily="Montserrat-Bold" color="textDark" style={styles.t_elite_badge}>Subscribe Now</Text>
          </View>
          <Image style={styles.i_tier_elite} source={{ uri: images?.["elite"] }} resizeMode="contain" />
          <Item svg="game-controller" label="GAME ACCESS" description={ELITE_TIER.gameAccess} />
          <Item svg="gift" label="DAILY REWARD" description={ELITE_TIER.dailyReward} />
          <Item svg="diamond" label="EXCLUSIVE PERKS" description={ELITE_TIER.exclusivePerks} />
          <BGButton
            label="View Elite+"
            onPress={onViewElite}
            style={styles.btn_elite}
            dataSet={{ media: ids.btn_elite }}
            fontFamily="Montserrat-Bold"
            labelStyle={styles.btn_start_label}
            bgColors={["#23C339", "#1AA82E"]}
            strokeColors={["#23C339", "#1AA82E", "#23C339"]}
            borderWidth={1}
          />
        </View>
      </View>

      <BGButton
        label="JOIN NOW"
        onPress={onJoinNow}
        style={styles.btn_join}
        dataSet={{ media: ids.btn_join }}
        fontFamily="Montserrat-Bold"
        labelStyle={styles.btn_join_label}
        bgColors={["#DF7B0B", "#E5D33D"]}
        strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
        borderWidth={1}
      />
      <Text fontFamily="Montserrat" color="closeColor" style={styles.t_disclaimer}>
        Elite+ is a paid subscription. You can manage or cancel anything in your user profile settings.
      </Text>
    </View>
  );
}

type PropsItem = {
  label: string;
  description: string;
  svg: SVGName;
  svgWidth?: number;
  svgHeight?: number;
}

const Item = ({label, description, svg}: PropsItem) => {
  return (
    <View style={styles.v_tier_row}>
      <View borderColor="#CD7F3255" style={styles.v_icon}>
        <SVGIcon name={svg} />
      </View>
      <View>
        <Text fontFamily="Montserrat-Bold" color="#F5C842" style={styles.t_tier_key}>
          {label}
        </Text>
        <Text fontFamily="Montserrat" color="text" style={styles.t_tier_val}>
          {description}
        </Text>
      </View>
    </View>
  )
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 1084,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 64,
    "@media (max-width: 800px)": {
      marginTop: 40,
    },
  },
  t_label: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  t_title: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
    marginTop: 8,
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
    "@media (max-width: 800px)": {
      fontSize: 13,
      lineHeight: 18,
    },
  },
  v_tiers: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 33,
    marginTop: 32,
    justifyContent: "center",
    width: "100%",
    "@media (max-width: 800px)": {
      gap: 10,
      marginTop: 20,
    },
  },
  v_icon: {
    width: 23, height: 23, borderRadius: 10,
    borderWidth: 1, alignItems: "center",
    justifyContent: "center",
  },
  tier_card: {
    flex: 1,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#07122E",
    borderColor: "#F5C8429E",
    padding: 16,
    gap: 10,
    "@media (max-width: 800px)": {
      minWidth: "46%",
      maxWidth: "46%",
    },
  },
  v_tier_dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  i_tier_cup: {
    width: 56,
    height: 68,
  },
  i_tier_elite: {
    width: 106,
    height: 67,
  },
  t_tier_name: {
    fontSize: 16,
    lineHeight: 20,
  },
  v_tier_row: {
    gap: 8,
    flexDirection: "row",
  },
  t_tier_key: {
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.5,
  },
  t_tier_val: {
    fontSize: 11,
    lineHeight: 14,
  },
  btn_start: {
    height: 36,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_start_label: {
    fontSize: 14,
    lineHeight: 16,
  },

  // Elite+
  elite_card: {
    flex: 1,
    minWidth: 160,
    maxWidth: 200,
    borderWidth: 1,
    borderColor: "#16D03E",
    borderRadius: 10,
    backgroundColor: "#07122E",
    padding: 16,
    gap: 10,
    "@media (max-width: 800px)": {
      minWidth: "92%",
      maxWidth: "100%",
    },
  },
  elite_badge: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  t_elite_badge: {
    fontSize: 10,
    lineHeight: 14,
  },
  t_elite_name: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 8,
  },
  btn_elite: {
    height: 36,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  btn_join: {
    height: 50,
    width: 220,
    marginTop: 28,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      height: 44,
      width: 180,
    },
  },
  btn_join_label: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 1,
  },
  t_disclaimer: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 480,
  },
});
