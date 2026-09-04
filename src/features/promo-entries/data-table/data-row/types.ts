import { ReactNode } from "react";
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
  /** Custom renderer for a cell value. Return a string for plain text, or a ReactNode for custom UI. */
  renderCell?: (value: unknown, item: DataRowItem) => ReactNode;
};
