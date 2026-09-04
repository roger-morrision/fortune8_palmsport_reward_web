import React from "react";
import { Text, Pressable, useWindowDimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MeasureValue } from "./rows-item";
import RowsOption from "./rows-option";
import useStyles from "../styles.css";
import colors from "@assets/colors";

interface MenuDropdownProps {
  value?: string;
  options: any[];
  onSelected: (item: string) => void;
}

const RowsPerPage = (props: MenuDropdownProps) => {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const actionRef = React.useRef<any>(null);
  const [isFocus, setFocus] = React.useState<boolean>(false);
  const [measure, setMesasure] = React.useState<MeasureValue>({} as MeasureValue);

  React.useEffect(() => {
    if (actionRef.current) {
      actionRef.current?.measure(
        (
          fx: any,
          fy: any,
          width: number,
          height: any,
          px: number,
          py: number
        ) => {
          setMesasure({
            x: px,
            y: py,
            width,
            height,
          });
        }
      );
    }
  }, [actionRef.current, isFocus, width]);

  return (
    <>
      <Pressable 
        ref={actionRef}
        onPress={() => setFocus(true)}
        style={styles.btn_rows}>
        <Text style={[styles.t_rows, { color: colors.black3 }]}>{props.value}</Text>
        <Icon name="arrow-drop-down" size={20} color={colors.grayPrimary} />
      </Pressable>
      <RowsOption
        visible={isFocus}
        measures={measure}
        value={props.value}
        options={props.options}
        onSelected={props.onSelected}
        onClose={() => setFocus(false)}
      />
    </>
  );
};

export default RowsPerPage;
