import { ImageKey } from "@/src/constants/Images";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type DataRowItem = Record<string, unknown>;

export type HeaderItem = {
  id: string;
  label?: string;
  icon?: ImageKey;
  sortable?: boolean;
  cellStyle?: ViewStyle;
  style?: TextStyle;
  color?: string;
  value?: string;
  buttonEnable?: boolean;
  iconStyle?: ImageStyle;
};
