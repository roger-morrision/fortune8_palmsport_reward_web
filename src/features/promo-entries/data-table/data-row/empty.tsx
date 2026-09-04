
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";
import { SvgXml } from "react-native-svg";
import StyleSheet from "react-native-media-query";
import { useAssetContext } from "@/src/context/AssetContext";
import { Image } from "react-native";

const TICKET_SVG = `<svg viewBox="0 0 180 130" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00000055"/>
    </filter>
  </defs>
  <g transform="rotate(-20 90 65)" filter="url(#shadow)">
    <!-- ticket body -->
    <rect x="10" y="22" width="160" height="86" rx="14" ry="14" fill="#0D1A4A" stroke="#1C3470" stroke-width="2"/>
    <!-- left notch -->
    <circle cx="10" cy="65" r="10" fill="#091426"/>
    <!-- right notch -->
    <circle cx="170" cy="65" r="10" fill="#091426"/>
    <!-- dashed divider -->
    <line x1="20" y1="65" x2="160" y2="65" stroke="#1C3470" stroke-width="2" stroke-dasharray="6,5"/>
    <!-- palm tree icon centred -->
    <g transform="translate(72, 36) scale(0.6)">
      <!-- trunk -->
      <path d="M30 60 Q28 40 32 20" stroke="#F5C842" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- left leaf -->
      <path d="M32 20 Q10 10 2 22 Q16 18 32 28" fill="#F5C842"/>
      <!-- right leaf -->
      <path d="M32 20 Q54 10 60 24 Q46 18 32 28" fill="#F5C842"/>
      <!-- top leaf -->
      <path d="M32 20 Q32 0 44 4 Q36 14 32 26" fill="#F5C842"/>
    </g>
  </g>
</svg>`;

const EmptyState = () => {
  const { images } = useAssetContext();

  return (
    <View style={styles.container} backgroundColor="#111F36" borderColor="#1A2D5E">
      <Image style={{width: 200, height: 173}} source={{uri: images?.["promo-entries-empty"]?.uri}} resizeMode="contain" />
      {/* <SvgXml xml={TICKET_SVG} width={160} height={120} /> */}
      <Text fontFamily="Montserrat-Bold" style={styles.t_title}>
        You Haven't Submitted Any Promo Entries Yet. Join A Raffle To Get Started.
      </Text>
    </View>
  );
}


const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 21,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 60,
    gap: 12,
    borderWidth: 2,
  },
  t_title: {
    fontSize: 20,
    lineHeight: 25,
    color: "#FFFFFF",
    textAlign: "center" as const,
    maxWidth: 500,
  },
  t_subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    textAlign: "center" as const,
  },
});


export default EmptyState;
