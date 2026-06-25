import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { DrawTableColumn } from "../types";
import { ids, styles } from "./styles.css";

type Props = {
  columns: DrawTableColumn[];
};

export default function DrawTableHeader({ columns }: Props) {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      {columns.map((col, i) => (
        <View
          key={`h_${col.id}_${i}`}
          style={[
            styles.cell,
            col.cellStyle,
            col.flex != null ? { flex: col.flex } : undefined,
            col.width != null ? { width: col.width, flex: 0 } : undefined,
          ]}
        >
          <Text
            fontFamily="Montserrat-SemiBold"
            style={[styles.t_label, { textAlign: col.align ?? "left" }, col.labelStyle]}
          >
            {col.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
