import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { DrawTableColumn } from "../types";
import { ids, styles } from "./styles.css";

type Props = {
  item: Record<string, unknown>;
  columns: DrawTableColumn[];
  isEven: boolean;
};

export default function DataItem({ item, columns, isEven }: Props) {
  return (
    <View
      style={[styles.row, isEven && styles.row_even] as any}
      dataSet={{ media: ids.row }}
    >
      {columns.map((col, i) => {
        const value = item[col.id];

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
