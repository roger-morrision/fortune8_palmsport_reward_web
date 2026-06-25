import React from "react";
import { ids, styles } from "./styles.css";
import { DataRowItem, HeaderItem } from "./types";
import { Text, View } from "react-native";
import { useBreakpoint } from "@/src/constants/BreakPoint";

type DataItemProps = {
  item: DataRowItem;
  headers: HeaderItem[];
  isfirst: boolean;
  islast: boolean;
  isEven: boolean;
};

const DataItem = (props: DataItemProps) => {
  const { item, headers, isEven } = props;
  const isMobile = useBreakpoint({ mobile: true, default: false });

  if (isMobile) {
    // Pair headers into rows of 2
    const pairs: [HeaderItem, HeaderItem | null][] = [];
    for (let i = 0; i < headers.length; i += 2) {
      pairs.push([headers[i], headers[i + 1] ?? null]);
    }

    return (
      <View style={styles.card} dataSet={{ media: ids.card }}>
        {pairs.map(([left, right], i) => (
          <View key={i} style={styles.card_row}>
            <View style={styles.card_cell}>
              <Text style={styles.card_label}>{left.label}</Text>
              <Text style={styles.card_value}>
                {item[left.id] != null ? String(item[left.id]) : "—"}
              </Text>
            </View>
            {right && (
              <View style={styles.card_cell}>
                <Text style={styles.card_label}>{right.label}</Text>
                <Text style={styles.card_value}>
                  {item[right.id] != null ? String(item[right.id]) : "—"}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }

  return (
    <View
      pointerEvents="box-none"
      style={[styles.r_style, isEven && { backgroundColor: "transparent" }]}
      dataSet={{ media: ids.r_style }}
    >
      {headers.map((header) => (
        <View key={header.id} style={[styles.c_style, header.cellStyle]}>
          <Text
            style={[styles.text_style]}
            dataSet={{ media: ids.text_style }}
          >
            {item[header.id] != null ? String(item[header.id]) : "—"}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default DataItem;
