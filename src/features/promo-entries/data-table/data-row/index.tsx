import React from "react";
import DataItem from "./data-item";
import DataTableHeader from "../header";
import { ids, styles } from "./styles.css";
import { DataRowItem } from "./types";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";
import { useQueryApi } from "@/src/common/hooks/useQueryApi";
import EmptyState from "./empty";
import { RaffleService } from "@/src/api/services/raffles.service";
import { PROMO_ENTRIES_TABLE_HEADERS } from "@/src/constants/TableHeaders";


const DataTableRow = () => {
  const isMobile = useBreakpoint({ mobile: true, default: false });

  const { data: apiData } = useQueryApi(["my-redemptions"], RaffleService.redemptions, {}, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const rows: DataRowItem[] = apiData?.items ?? [];

  return (
    <FlatList
      data={rows}
      style={styles.flatlist}
      contentContainerStyle={isMobile ? { paddingBottom: 12 } : {}}
      dataSet={{ media: ids.flatlist }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        !isMobile ? (
          <DataTableHeader headers={PROMO_ENTRIES_TABLE_HEADERS} />
        ) : <Text fontFamily="Montserrat-SemiBold" style={styles.t_title} dataSet={{ media: ids.t_title }}>Promo Entries</Text>
      }
      ListEmptyComponent={<EmptyState />}
      ItemSeparatorComponent={<View style={styles.v_seperator} dataSet={{ media: ids.v_seperator }}/>}
      keyExtractor={(_item, index) => `r_index${index}`}
      renderItem={({ item, index }: ListRenderItemInfo<DataRowItem>) => (
        <DataItem
          item={item}
          isfirst={index === 0}
          islast={index === rows.length - 1}
          isEven={index % 2 === 0}
          headers={PROMO_ENTRIES_TABLE_HEADERS}
        />
      )}
    />
  );
};

export default DataTableRow;
