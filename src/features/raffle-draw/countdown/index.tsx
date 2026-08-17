import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { OngoingRaffle } from "@/src/store/types";
import { useEffect, useRef, useState } from "react";
import { ViewStyle } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  raffle?: OngoingRaffle;
  variant?: "blue" | "gold";
};

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const THEME = {
  blue: {
    container:  { borderColor: "#1C3470", backgroundColor: "#09183B" },
    title:      "#5195FF",
    digitBox:   { borderColor: "#1C3470", backgroundColor: "#070B3A" },
    time:       "#FFFFFF",
    colon:      "#FFFFFF",
    label:      "#8DA4C8",
    star:       "#5195FF",
    divider:    "#1C3470",
    entries:    { borderColor: "#21366E", backgroundColor: "#070B3A" },
    entriesLabel: "#5195FF",
  },
  gold: {
    container:  { borderColor: "#3A2800", backgroundColor: "#120C00" },
    title:      "#C9A84C",
    digitBox:   { borderColor: "#4A3800", backgroundColor: "#0D0800" },
    time:       "#E8C84A",
    colon:      "#E8C84A",
    label:      "#8A7040",
    star:       "#E8C84A",
    divider:    "#3A2800",
    entries:    { borderColor: "#3A2800", backgroundColor: "#0D0800" },
    entriesLabel: "#C9A84C",
  },
};

export default function Countdown({ raffle, variant = "blue" }: Props) {
  const targetMs = raffle ? new Date(raffle.drawDate).getTime() : 0;
  const targetRef = useRef<number>(targetMs);
  const [time, setTime] = useState<TimeLeft>(raffle ? getTimeLeft(targetMs) : ZERO);

  const theme = THEME[variant];

  useEffect(() => {
    if (!raffle) {
      targetRef.current = 0;
      setTime(ZERO);
      return;
    }
    targetRef.current = new Date(raffle.drawDate).getTime();
    setTime(getTimeLeft(targetRef.current));
  }, [raffle?.drawDate]);

  useEffect(() => {
    if (!raffle) return;
    const id = setInterval(() => setTime(getTimeLeft(targetRef.current)), 1000);
    return () => clearInterval(id);
  }, [!!raffle]);

  const segments: [string, string][] = [
    [pad(time.hours),   "HOURS"],
    [pad(time.minutes), "MINS"],
    [pad(time.seconds), "SECS"],
    [pad(time.days),    "MS"],
  ];

  return (
    <View
      style={[styles.container, theme.container] as ViewStyle[]}
      dataSet={{ media: ids.container }}
    >
      {/* Title */}
      <Text
        fontFamily="Montserrat-SemiBold"
        style={[styles.t_title, { color: theme.title }]}
        dataSet={{ media: ids.t_title }}
      >
        NEXT DRAW STARTS IN
      </Text>

      {/* Digit boxes */}
      <View style={styles.v_time} dataSet={{ media: ids.v_time }}>
        {segments.map(([value, label], index) => (
          <View key={label} style={{ flexDirection: "row", alignItems: "center" }}>
            {index > 0 && (
              <Text
                fontFamily="Montserrat-Bold"
                style={[styles.t_colon, { color: theme.colon }]}
                dataSet={{ media: ids.t_colon }}
              >
                {":"}
              </Text>
            )}
            <View style={styles.v_segment}>
              <Text
                fontFamily="Montserrat"
                style={[styles.t_label, { color: theme.label }]}
                dataSet={{ media: ids.t_label }}
              >
                {label}
              </Text>
              <View style={[styles.digit_box, theme.digitBox] as ViewStyle[]}>
                <Text
                  fontFamily="Montserrat-Bold"
                  style={[styles.t_time, { color: theme.time }]}
                  dataSet={{ media: ids.t_time }}
                >
                  {value}
                </Text>
              </View>
              
            </View>
          </View>
        ))}
      </View>

      {/* Entries */}
      <View
        backgroundColor="#091B38"
        borderColor="#2D508B"
        style={[styles.v_entries] as ViewStyle[]}
        dataSet={{ media: ids.v_entries }}
      >
        <Text
          fontFamily="Montserrat-SemiBold"
          color="button"
          style={[styles.t_entries]}
          dataSet={{ media: ids.t_entries }}
        >
          Total No. of Entries:{" "}
          <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_entries}>
            {raffle?.totalRedeemedTickets ?? 0}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "50%",
    padding: 28,
    borderWidth: 2,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    "@media (max-width: 800px)": {
      borderRadius: 12,
      padding: 20,
      width: "100%",
    },
  },
  t_title: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    letterSpacing: 1.5,
    "@media (max-width: 800px)": {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  v_time: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 4,
    "@media (max-width: 800px)": {
      marginTop: 16,
    },
  },
  v_segment: {
    alignItems: "center",
    gap: 6,
  },
  digit_box: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 800px)": {
      width: 62,
      height: 62,
      borderRadius: 10,
    },
  },
  t_time: {
    fontSize: 36,
    lineHeight: 42,
    "@media (max-width: 800px)": {
      fontSize: 30,
      lineHeight: 36,
    },
  },
  t_colon: {
    fontSize: 28,
    lineHeight: 36,
    marginHorizontal: 4,
    marginTop: 18,
    "@media (max-width: 800px)": {
      fontSize: 22,
    },
  },
  t_label: {
    fontSize: 10,
    lineHeight: 13,
    textAlign: "center",
    letterSpacing: 0.8,
    "@media (max-width: 800px)": {
      fontSize: 9,
    },
  },
  v_divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 4,
    width: "80%",
    gap: 8,
    "@media (max-width: 800px)": {
      marginTop: 16,
      width: "90%",
    },
  },
  divider_line: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  t_star: {
    fontSize: 14,
    lineHeight: 18,
  },
  v_entries: {
    width: "90%",
    marginTop: 12,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  t_entries: {
    fontSize: 13,
    lineHeight: 18,
    "@media (max-width: 800px)": {
      fontSize: 14,
      lineHeight: 20,
    },
  },
});
