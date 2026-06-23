import React from "react";
import DataItem from "./data-item";
import DataTableHeader from "../header";
import { ids, styles } from "./styles.css"
import { DataRowItem, HeaderItem } from "./types";
import { FlatList, ListRenderItemInfo } from "react-native";


export const TABLE_HEAD_DASHBOARD_DOCUMENTS = [
  {
    id: "documentTitle",
    label: "Document Name",
    sortable: false,
    cellStyle: { flex: 1 },
  },
  {
    id: "notarialAct",
    label: "Document Type",
    sortable: false,
    cellStyle: { flex: 0.6 },
  },
  {
    id: "requestType",
    label: "Request Type",
    sortable: false,
    cellStyle: { flex: 0.6 },
  },
  {
    id: "date",
    label: "Date Notarized",
    sortable: false,
    cellStyle: { flex: 0.6 },
  },
  {
    id: "participants",
    label: "Participants",
    sortable: false,
    cellStyle: { flex: 0.6 },
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
    sortable: false,
    cellStyle: { flex: 0.6 },
  },
];

export const Promotion = [
  {
    name: "Test 1",
    description: "Description 1",
    numberOfEntries: "1",
    amount: 123,
    date: "1241",
    result: "success"
  },
  {
    name: "Test 2",
    description: "Description 2",
    numberOfEntries: "1",
    amount: 123,
    date: "1241",
    result: "success"
  }
]

const DataTableRow = () => {

  return (
    <FlatList
      data={Promotion}
      style={styles.flatlist}
      contentContainerStyle={{}}
      dataSet={{media: ids.flatlist}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <DataTableHeader
          headers={TABLE_HEAD_DASHBOARD_DOCUMENTS}
          // order={state.order}
          // orderBy={state.orderBy}
          // onRequestSort={handleRequestSort}
        />
      }
      keyExtractor={(_item, index) => `r_index${index}`}
      renderItem={({ item, index }: ListRenderItemInfo<DataRowItem>) => {
        const isfirst = index === 0;
        const islast = index === Promotion.length - 1;
        const isEven = index % 2 === 0;


        return (
          <DataItem
            item={item}
            isfirst={isfirst}
            islast={islast}
            isEven={isEven}
            headers={TABLE_HEAD_DASHBOARD_DOCUMENTS}
          />
        );
      }}
    />
  );
};

export default DataTableRow;
