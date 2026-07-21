import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import BGButton from "@/src/common/components/BGButton";
import StyleSheet from "react-native-media-query";
import { CDNImageKey } from "@/src/constants/Images";
import { useAssetContext } from "@/src/context/AssetContext";
import { Image } from "react-native";
import { FontAwesomeIcon, MaterialIcon, MaterialSymbol } from "@/src/common/components/Icon";
import SVGIcon from "@/src/constants/SVGIcon";

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
            <View style={styles.v_tier_row}>
              {/* <MaterialIcon name="stadia_controller" /> */}
              <View borderColor="#CD7F3255" style={styles.v_icon}>
                <SVGIcon name="game-controller" />
              </View>
              <View>
                <Text fontFamily="Montserrat-Bold" color="#F5C842" style={styles.t_tier_key}>
                  GAME ACCESS
                </Text>
                <Text fontFamily="Montserrat" color="text" style={styles.t_tier_val}>
                  {tier.gameAccess}
                </Text>
              </View>
            </View>
            <View style={styles.v_tier_row}>
              <View borderColor="#CD7F3255" style={styles.v_icon}>
                <SVGIcon name="gift" width={15} height={15} />
              </View>
              <View>
                <Text fontFamily="Montserrat-Bold" color="#F5C842" style={styles.t_tier_key}>
                  BONUS
                </Text>
                <Text fontFamily="Montserrat" color="text" style={styles.t_tier_val}>
                  {tier.bonus}
                </Text>
              </View>
            </View>
            <BGButton
              label="Get Started"
              onPress={() => onGetStarted?.(tier)}
              style={styles.btn_start}
              dataSet={{ media: ids.btn_start }}
              fontFamily="Montserrat-SemiBold"
              labelStyle={styles.btn_start_label}
              bgColors={["#0D1A4A", "#0D1A4A"]}
              strokeColors={[tier.color, tier.color, tier.color]}
              borderWidth={1}
            />
          </View>
        ))}

        {/* Elite+ card */}
        <View style={styles.elite_card} dataSet={{ media: ids.elite_card }}>
          <View style={styles.elite_badge}>
            <Text fontFamily="Montserrat-Bold" style={styles.t_elite_badge}>Subscribe Now</Text>
          </View>
          <Text fontFamily="Montserrat-Bold" color="button" style={styles.t_elite_name}>
            ELITE+
          </Text>
          <View style={styles.v_tier_row}>
            <Text fontFamily="Montserrat-Bold" color="closeColor" style={styles.t_tier_key}>
              GAME ACCESS
            </Text>
            <Text fontFamily="Montserrat" color="text" style={styles.t_tier_val}>
              {ELITE_TIER.gameAccess}
            </Text>
          </View>
          <View style={styles.v_tier_row}>
            <Text fontFamily="Montserrat-SemiBold" color="closeColor" style={styles.t_tier_key}>
              DAILY REWARD
            </Text>
            <Text fontFamily="Montserrat" color="text" style={styles.t_tier_val}>
              {ELITE_TIER.dailyReward}
            </Text>
          </View>
          <View style={styles.v_tier_row}>
            <Text fontFamily="Montserrat-SemiBold" color="closeColor" style={styles.t_tier_key}>
              EXCLUSIVE PERKS
            </Text>
            <Text fontFamily="Montserrat" color="text" style={styles.t_tier_val}>
              {ELITE_TIER.exclusivePerks}
            </Text>
          </View>
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
    maxWidth: 180,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#07122E",
    borderColor: "#F5C8429E",
    padding: 16,
    gap: 10,
    "@media (max-width: 800px)": {
      minWidth: "45%",
      maxWidth: "48%",
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
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_start_label: {
    fontSize: 12,
    lineHeight: 14,
  },

  // Elite+
  elite_card: {
    flex: 1,
    minWidth: 160,
    maxWidth: 200,
    borderWidth: 1,
    borderColor: "#FFB019",
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
    backgroundColor: "#23C339",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  t_elite_badge: {
    fontSize: 10,
    lineHeight: 14,
    color: "#FFFFFF",
  },
  t_elite_name: {
    fontSize: 22,
    lineHeight: 28,
    marginTop: 8,
  },
  btn_elite: {
    height: 36,
    borderRadius: 6,
    marginTop: 8,
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
