import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useEffect, useRef, useState } from "react";
import StyleSheet from "react-native-media-query";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

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

type Props = {
  targetDate?: Date;
  totalEntries?: number;
};

export default function Countdown({ targetDate, totalEntries = 0 }: Props) {
  const targetRef = useRef<Date>(
    targetDate ?? new Date(Date.now() + 8 * 3600000 + 12 * 60000 + 44000 + 28000)
  );
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetRef.current.getTime()));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetRef.current.getTime())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text
        fontFamily="Montserrat-Bold"
        style={styles.t_title}
        dataSet={{ media: ids.t_title }}
      >
        NEXT DRAW STARTS IN...
      </Text>

      <View style={styles.v_time} dataSet={{ media: ids.v_time }}>
        {([
          [pad(time.days), "Days"],
          [pad(time.hours), "Hours"],
          [pad(time.minutes), "Minutes"],
          [pad(time.seconds), "Seconds"],
        ] as [string, string][]).map(([value, label], i) => (
          <>
            {i > 0 && (
              <Text
                key={`colon-${i}`}
                fontFamily="Montserrat-Bold"
                color="text"
                style={styles.t_colon}
                dataSet={{ media: ids.t_colon }}
              >
                {" : "}
              </Text>
            )}
            <View key={label} style={styles.v_segment}>
              <Text fontFamily="Montserrat" color="closeColor" style={styles.t_label} dataSet={{ media: ids.t_label }}>
                {label}
              </Text>
              <Text fontFamily="Montserrat-Bold" color="text" style={styles.t_time} dataSet={{ media: ids.t_time }}>
                {value}
              </Text>
            </View>
          </>
        ))}
      </View>

      <View style={styles.v_entries} dataSet={{ media: ids.v_entries }}>
        <Text fontFamily="Montserrat-SemiBold" color="button" style={styles.t_entries} dataSet={{ media: ids.t_entries }}>
          Total No. of Entries:{" "}
          <Text fontFamily="Montserrat-Bold" color="button" style={styles.t_entries}>
            {totalEntries}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "50%",
    padding: 24,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    borderColor: "#1C3470",
    backgroundColor: "#09183B",
    "@media (max-width: 800px)": {
      borderRadius: 8,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 21,
      paddingBottom: 31,
      width: "100%",
    },
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  t_title: {
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: "#5195FF",
    letterSpacing: 0.5,
    "@media (max-width: 800px)": {
      fontSize: 20,
      lineHeight: 26,
    },
  },
  v_time: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },

  v_segment: {
    alignItems: "center",
  },
  t_time: {
    fontSize: 40,
    lineHeight: 48,
    "@media (max-width: 800px)": {
      fontSize: 44,
      lineHeight: 52,
    },
  },

  t_colon: {
    fontSize: 40,
    lineHeight: 48,
    paddingTop: 12,
    "@media (max-width: 800px)": {
      fontSize: 44,
      lineHeight: 52,
      paddingTop: 18,
    },
  },
  t_label: {
    fontSize: 11,
    lineHeight: 14,
    textAlign: "center",
    "@media (max-width: 800px)": {
      fontSize: 12,
      lineHeight: 16,
    },
  },
  v_entries: {
    width: "60%",
    marginTop: 16,
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#21366E",
    backgroundColor: "#070B3A",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
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
