import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { Raffle } from "@/src/store/types";
import { DrawTableColumn } from "../types";
import { ids, styles } from "./styles.css";

type Props = {
  item: Record<string, unknown>;
  columns: DrawTableColumn[];
  isEven: boolean;
  raffle: Raffle;
};

// Supports dot-notation paths like "user.id" → item.user.id
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc != null && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export default function DataItem({ item, columns, isEven }: Props) {
  const isMobile = useBreakpoint({ mobile: true, default: false });

  if (isMobile) {
    return (
      <View style={styles.card} dataSet={{ media: ids.card }}>
        {columns.map((col, i) => {
          const value = getNestedValue(item, col.id);
          return (
            <View key={`card_${col.id}_${i}`} style={styles.card_row}>
              <Text style={styles.card_label}>{col.label}: </Text>
              {col.renderCell ? (
                col.renderCell(value, item)
              ) : (
                <Text style={styles.card_value}>
                  {value != null ? String(value) : "—"}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View
      style={[styles.row, isEven && styles.row_even] as any}
      dataSet={{ media: ids.row }}
    >
      {columns.map((col, i) => {
        const value = getNestedValue(item, col.id);
        return (
          <View
            key={`c_${col.id}_${i}`}
            style={[
              styles.cell,
              col.cellStyle,
              col.flex != null ? { flex: col.flex } : undefined,
              col.width != null ? { width: col.width, flex: 0 } : undefined,
            ]}
          >
            {col.renderCell ? (
              col.renderCell(value, item)
            ) : (
              <Text
                fontFamily="Montserrat"
                style={[styles.t_cell, { textAlign: col.align ?? "left" }]}
              >
                {value != null ? String(value) : "—"}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}
