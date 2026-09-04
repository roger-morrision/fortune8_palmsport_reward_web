import React from "react";
import {
  Text,
  Pressable,
} from "react-native";
import useStyles from "./styles.css";

export interface MeasureValue {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MenuDropdownProps {
  item: string;
  onPress: () => void;
}

const RowsItem = (props: MenuDropdownProps) => {
  const styles = useStyles();
  const [active, setActive] = React.useState(false);

  return (
    <Pressable
      onPress={props.onPress}
      onHoverIn={() => setActive(true)}
      onHoverOut={() => setActive(false)}
      style={[
        styles.v_item,
        active && styles.v_item_active,
      ]}
    >
      <Text style={styles.t_item}>{props.item}</Text>
    </Pressable>
  );
};

export default RowsItem;
