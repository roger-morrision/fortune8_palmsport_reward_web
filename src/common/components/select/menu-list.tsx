import Text from "@/src/common/components/Text";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import React, { useCallback, useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { LabelKeyType } from ".";
import Button from "../Button";
import View from "../View";
import { ids, styles } from "./styles.css";

export interface MeasureValue {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MenuDropdownProps {
  visible: boolean;
  accessible?: boolean;
  measures: MeasureValue;
  value: any;
  options: any;
  onClose: () => void;
  renderItem?: any;
  renderMenuItem?: any;
  customModalWidth?: number;
  onSelected: (item: any) => void;
  labelKey: LabelKeyType;
}

const MenuDropdown = (props: MenuDropdownProps) => {
  const flatlist = useRef(null);
  const { height: HEIGHT } = useWindowDimensions();
  const ITEM_HEIGHT = useBreakpoint({
    large: 40,
    default: 50,
  });

  const stylePosition = React.useMemo(() => {
    const { width, height } = props.measures;
    const positionStyle = {
      width,
      height: 300,
      top: height + 5,
    };

    return positionStyle;
  }, [props.measures, props.customModalWidth, HEIGHT]);

  const RenderItem = useCallback(
    ({ item, index }: any) => {
      if (typeof props.renderMenuItem === "function") {
        return props.renderItem({
          item,
          index,
          onSelected: () => {
            props.onSelected(item);
            props.onClose();
          },
        });
      }

      let rowValue = null;

      if (typeof item === "string") {
        rowValue = item;
      } else if (typeof item === "number") {
        rowValue = item;
      } else {
        if (typeof props.labelKey === "function") {
          rowValue = props.labelKey(item);
        } else {
          rowValue = item[props.labelKey];
        }
      }

      return (
        <Button
          key={`${index}`}
          onPress={() => {
            props.onSelected(item);
            props.onClose();
          }}
          style={[styles.v_item, { minHeight: ITEM_HEIGHT }]}
        >
          <Text
            color="text"
            style={[styles.t_item, rowValue === props.value && styles.t_item_active]}
          >
            {rowValue}
          </Text>
        </Button>
      );
    },
    [props.value, props?.labelKey, props.onSelected],
  );

  if (!props.visible) return null;

  return (
    <View style={[styles.modal, stylePosition]} dataSet={{ media: ids.modal }}>
      <View backgroundColor="primary" style={styles.dropdown}>
        <FlatList
          ref={flatlist}
          data={props.options}
          getItemLayout={(item, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          ItemSeparatorComponent={() => (
            <View backgroundColor="borderColor" style={styles.itemSeparator} />
          )}
          keyExtractor={(_, index) => `${index}`}
          renderItem={RenderItem}
        />
      </View>
    </View>
  );
};

export default MenuDropdown;
