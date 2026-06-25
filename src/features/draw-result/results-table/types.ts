import { ViewStyle, TextStyle } from "react-native";
import React from "react";

export type DrawTableColumn = {
  id: string;
  label: string;
  flex?: number;
  width?: number;
  align?: "left" | "center" | "right";
  cellStyle?: ViewStyle;
  labelStyle?: TextStyle;
  renderCell?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
};
