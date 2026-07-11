import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { FlatList, ListRenderItemInfo, ScrollView } from "react-native";
import { DrawTableColumn } from "../types";
import DrawTableHeader from "../header";
import DataItem from "./data-item";
import { ids, styles } from "./styles.css";
import { Raffle } from "@/src/store/types";

type Props = {
  columns: DrawTableColumn[];
  raffle: Raffle;
  data: Record<string, unknown>[];
};

export default function DataTableRow({ columns, raffle, data }: Props) {
  return (
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.wrapper as any} dataSet={{ media: ids.wrapper }}>
        <FlatList
          data={data}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<DrawTableHeader columns={columns} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text fontFamily="Montserrat" color="closeColor" style={styles.t_empty}>
                No results available
              </Text>
            </View>
          }
          keyExtractor={(_item, index) => `row_${index}`}
          renderItem={({ item, index }: ListRenderItemInfo<Record<string, unknown>>) => (
            <DataItem
              item={{
                ...raffle,
                ...item,
              }}
              raffle={raffle}
              columns={columns}
              isEven={index % 2 !== 0}
            />
          )}
        />
      </View>
    // </ScrollView>
  );
}
