import React from "react";
import DataItem from "./data-item";
import DataTableHeader from "../header";
import { ids, styles } from "./styles.css";
import { DataRowItem, HeaderItem } from "./types";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";

export const TABLE_HEAD_DASHBOARD_DOCUMENTS: HeaderItem[] = [
  { id: "name",             label: "Promotion",      sortable: false, cellStyle: { flex: 1 } },
  { id: "description",      label: "Description",    sortable: false, cellStyle: { flex: 0.6 } },
  { id: "numberOfEntries",  label: "No. of Entries", sortable: false, cellStyle: { flex: 0.6 } },
  { id: "amount",           label: "Amount PG",      sortable: false, cellStyle: { flex: 0.6 } },
  { id: "date",             label: "Date",           sortable: false, cellStyle: { flex: 0.6 } },
  { id: "result",           label: "Result",         sortable: false, cellStyle: { flex: 0.6 } },
];

export const Promotion: DataRowItem[] = [
  { name: "Test 1", description: "Description 1", numberOfEntries: "1", amount: 123, date: "1241", result: "success" },
  { name: "Test 2", description: "Description 2", numberOfEntries: "1", amount: 123, date: "1241", result: "success" },
];

const DataTableRow = () => {
  const isMobile = useBreakpoint({ mobile: true, default: false });

  return (
    <FlatList
      data={Promotion}
      style={styles.flatlist}
      contentContainerStyle={isMobile ? { paddingBottom: 12 } : {}}
      dataSet={{ media: ids.flatlist }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        !isMobile ? (
          <DataTableHeader headers={TABLE_HEAD_DASHBOARD_DOCUMENTS} />
        ) : <Text fontFamily="Montserrat-SemiBold" style={styles.t_title} dataSet={{ media: ids.t_title }}>Promo Entries</Text>
      }
      ItemSeparatorComponent={<View style={styles.v_seperator} dataSet={{ media: ids.v_seperator }}/>}
      keyExtractor={(_item, index) => `r_index${index}`}
      renderItem={({ item, index }: ListRenderItemInfo<DataRowItem>) => (
        <DataItem
          item={item}
          isfirst={index === 0}
          islast={index === Promotion.length - 1}
          isEven={index % 2 === 0}
          headers={TABLE_HEAD_DASHBOARD_DOCUMENTS}
        />
      )}
    />
  );
};

export default DataTableRow;
