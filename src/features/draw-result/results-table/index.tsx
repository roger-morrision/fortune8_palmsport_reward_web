import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { DrawTableColumn } from "./types";
import DataTableRow from "./data-row";
import StyleSheet from "react-native-media-query";

export type { DrawTableColumn };

type Props = {
  title: string;
  columns: DrawTableColumn[];
  data: Record<string, unknown>[];
};

export default function ResultsTable({ title, columns, data }: Props) {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text
        fontFamily="Montserrat-Bold"
        color="text"
        style={styles.t_title}
        dataSet={{ media: ids.t_title }}
      >
        {title}
      </Text>

      <DataTableRow columns={columns} data={data} />
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 1084,
    alignSelf: "center",
    marginTop: 40,
    "@media (max-width: 800px)": {
      marginTop: 28,
    },
  },
  t_title: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 16,
    "@media (max-width: 800px)": {
      fontSize: 17,
      lineHeight: 22,
      marginBottom: 12,
    },
  },
});
