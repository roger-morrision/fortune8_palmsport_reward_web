import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, Text, View } from "react-native";
import { HeaderItem } from "../data-row/types";
import { ids, styles } from "./styles.css";

type DataTableHeaderProps = {
  order?: "asc" | "desc";
  headers: HeaderItem[];
  orderBy?: string;
  onRequestSort?: (id: string) => void;
};

const DataTableHeader = (props: DataTableHeaderProps) => {
  return (
    <View style={styles.datatable} dataSet={{ media: ids.datatable }}>
      <View style={styles.dt_header} dataSet={{ media: ids.dt_header }}>
        {props.headers.map((item, index) => {
          return (
            <Pressable
              key={`h_index${index}`}
              disabled={!item.sortable}
              onPress={() => props.onRequestSort?.(item.id)}
              style={styles.h_style}
              dataSet={{ media: ids.h_style }}
            >
              <View style={styles.t_with_icon} dataSet={{ media: ids.t_with_icon }}>
                <Text numberOfLines={2} style={[styles.t_style, item.style]}>
                  {item.label}
                </Text>
                {item.sortable && <FontAwesome6 name="sort" size={12} color="#212221" />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default DataTableHeader;
