import React from "react";
import { ids, styles } from "./styles.css";
import { DataRowItem, HeaderItem } from "./types";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import { useAssetContext } from "@/src/context/AssetContext";

type DataItemProps = {
  item: DataRowItem;
  headers: HeaderItem[];
  isfirst: boolean;
  islast: boolean;
  isEven: boolean;
};

const DataItem = (props: DataItemProps) => {
  const { images } = useAssetContext();
  const { item, headers, isEven } = props;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.r_style, isEven && { backgroundColor: "transparent"}]}
      dataSet={{ media: ids.r_style }}
    >

      <TextItem value={item.name} />
      <TextItem value={item.description} />
      <TextItem value={item.numberOfEntries} />
      <TextItem value={item.amount} />
      <TextItem value={item.date} />
      <TextItem value={item.result} />
      
    </View>
  );
};

type Props = {
  value: string | undefined;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const TextItem = (props: Props) => {
  const { value = "", style } = props;

  return (
    <View style={[styles.c_style, style]}>
      <Text
        style={[styles.text_style, props.textStyle]}
        dataSet={{ media: ids.text_style }}
      >
        {value}
      </Text>
    </View>
  );
};

export default DataItem;
