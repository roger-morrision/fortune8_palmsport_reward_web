import useAppSelector from "@/src/common/hooks/useAppSelector";
import { selectedTheme } from "@/src/store/slices/settings.slice";
import React from "react";
import { Modal, Pressable, useWindowDimensions } from "react-native";
import DateTimePicker, {
  CalendarComponents,
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { MaterialIcon } from "../Icon";
import View from "../View";
import { styles } from "./styles.css";

export interface MeasureValue {
  x: number;
  y: number;
  width: number;
  height: number;
}
export type SingleChange = (params: { date: DateType }) => void;

interface MenuDropdownProps {
  visible: boolean;
  accessible?: boolean;
  measures: MeasureValue;
  value: DateType;
  minDate: DateType;
  maxDate: DateType;
  onClose: () => void;
  customModalWidth?: number;
  onSelected: SingleChange;
}

const ModalPicker = (props: MenuDropdownProps) => {
  const theme = useAppSelector(selectedTheme);
  const defaultStyles = useDefaultStyles(theme);
  const { width: WIDTH, height: HEIGHT } = useWindowDimensions();

  const stylePosition = React.useMemo(() => {
    const { x, y, width, height } = props.measures;
    const base_height = 343;
    const pos_upward = y + base_height + 10;
    const isGreaterThanHeight = pos_upward > HEIGHT;
    const positionStyle = {
      minHeight: base_height,
      width: props.customModalWidth || width,
      left: x,
      top: isGreaterThanHeight ? y - base_height : y + height - 120,
    };

    return positionStyle;
  }, [props.measures, props.customModalWidth, WIDTH, HEIGHT]);

  const components: CalendarComponents = {
    // Day: (day: CalendarDay) => <YourCustomDay day={day} />,
    // Month: (month: CalendarMonth) => <YourCustomMonth month={month} />
    // etc
    IconPrev: (
      <MaterialIcon asButton backgroundColor="transparent" pointerEvents="none" name="arrow-left" />
    ),
    IconNext: (
      <MaterialIcon
        asButton
        backgroundColor="transparent"
        pointerEvents="none"
        name="arrow-right"
      />
    ),
  };

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
      <Pressable accessible={props.accessible} onPress={props.onClose}>
        <View style={styles.modal}>
          <View
            pointerEvents="auto"
            onLayout={(layout) => console.log("layoutlayout", layout)}
            backgroundColor="primary"
            style={[styles.dropdown, stylePosition]}
          >
            <DateTimePicker
              mode="single"
              components={components}
              date={props.value || props.maxDate}
              minDate={props.minDate}
              maxDate={props.maxDate}
              onChange={(value) => {
                props.onSelected(value);
                props.onClose();
              }}
              styles={defaultStyles}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalPicker;
