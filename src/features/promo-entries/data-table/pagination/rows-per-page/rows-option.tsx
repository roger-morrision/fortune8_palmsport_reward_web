import React, { useRef } from "react";
import {
  View,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import useStyles from "./styles.css";
import MenuItem from "./rows-item";
import { useWindowDimensions } from "react-native";

export interface MeasureValue {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MenuDropdownProps {
  value?: string;
  visible: boolean;
  measures: MeasureValue;
  options: any[];
  onClose: () => void;
  onSelected: (item: string) => void;
}

const ITEM_HEIGHT = 35;

const RowsOption = (props: MenuDropdownProps) => {
  const styles = useStyles();
  const flatlist = useRef(null);
  const { height: HEIGHT } = useWindowDimensions();
  const stylePosition = React.useMemo(() => {
    const { x, y, width } = props.measures;
    const base_height =
      props.options.length > 6
        ? ITEM_HEIGHT * 6
        : props.options.length * ITEM_HEIGHT;
    const pos_upward = y + base_height;
    const isGreaterThanHeight = pos_upward > HEIGHT;
    const positionStyle = {
      width: width + 15,
      left: x,
      height: base_height,
      top: isGreaterThanHeight ? y - base_height : y,
    };

    return positionStyle;
  }, [props.measures, HEIGHT]);

  return (
    <Modal
      transparent
      visible={props.visible}
      animationType={"none"}
      onRequestClose={props.onClose}
      supportedOrientations={[
        "portrait",
        "portrait-upside-down",
        "landscape",
        "landscape-left",
        "landscape-right",
      ]}
    >
      <Pressable style={styles.modal} onPress={props.onClose} >
        <View style={[styles.dropdown, stylePosition]}>
          <FlatList
            ref={flatlist}
            style={styles.flatlist}
            data={props.options}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `${index}`}
            ItemSeparatorComponent={() => <View style={styles.item_separator} />}
            renderItem={({ item, index }: any) => {
              return (
                <MenuItem
                  key={`${index}`}
                  item={item}
                  onPress={() => {
                    props.onClose();
                    props.onSelected(item);
                  }} />
              );
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default RowsOption;
