import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { MaterialIcon } from "../Icon";
import Text from "../Text";
import TextInput from "../TextInput";
import MenuList, { MeasureValue, SingleChange } from "./modal-picker";
import { ids, styles } from "./styles.css";
import { ColorName } from "@/src/constants/Colors";

export type LabelKeyType = string | any;

type DropdownProps = {
  value: any;
  label?: string;
  format?: string;
  style?: ViewStyle;
  minDate?: DateType;
  maxDate?: DateType;
  placeholder?: string;
  disabled?: boolean;
  borderColor: ColorName;
  onSelected: SingleChange;
  customModalWidth?: number;
  inputStyle?: StyleProp<TextStyle> | any;
  renderBase?: (props: RenderBaseProps) => React.ReactNode; // Not void | JSX
};

function DatePicker(props: DropdownProps) {
  const pressableRef = React.useRef<any>(null);
  const [isFocus, setFocus] = React.useState<boolean>(false);
  const [measure, setMesasure] = React.useState<MeasureValue>({} as MeasureValue);

  React.useEffect(() => {
    if (pressableRef.current) {
      pressableRef.current?.measure(
        (fx: any, fy: any, width: number, height: any, px: number, py: number) => {
          setMesasure({
            x: px,
            y: py,
            width,
            height,
          });
        },
      );
    }
  }, [pressableRef.current, isFocus]);

  const handleClose = () => setFocus(false);

  return (
    <View ref={pressableRef} style={[props.style]}>
      <RenderBase {...props} {...{ setFocus }} />
      <MenuList
        visible={isFocus}
        measures={measure}
        value={props.value}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onClose={handleClose}
        onSelected={props.onSelected}
      />
    </View>
  );
}

type RenderBaseProps = {
  borderColor: ColorName;
  setFocus: Dispatch<SetStateAction<boolean>>;
} & DropdownProps;

const RenderBase: React.FC<RenderBaseProps> = (props) => {
  const { inputStyle, borderColor } = props;

  if (typeof props.renderBase === "function") {
    return props.renderBase(props);
  }

  return (
    <Pressable
      disabled={props.disabled}
      onPress={() => props.setFocus(true)}
      style={styles.render_container}
    >
      {props.label && (
        <Text color="placeholder" style={styles.labelStyle}>
          {props.label}
        </Text>
      )}
      <TextInput
        editable={false}
        value={props.value}
        // onFocus={}
        // onFocus={() => props.setFocus(true)}
        // onBlur={() => props.setFocus(false)}
        style={[styles.input_style, inputStyle]}
        placeholder={props.placeholder}
        dataSet={{ media: ids.input_style }}
        borderColor={borderColor}
        backgroundColor="secondary"
      />
      <MaterialIcon
        name={"event"}
        size={22}
        disabled={props.disabled}
        onPress={() => props.setFocus(true)}
        backgroundColor="secondary"
        color="placeholder"
        style={styles.icon_style}
      />
    </Pressable>
  );
};

export default DatePicker;
