/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleProp, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native";
import { MaterialIcon } from "../Icon";
import TextInput from "../TextInput";
import MenuList, { MeasureValue } from "./menu-list";
import { ids, styles } from "./styles.css";

export type LabelKeyType = string | any;

type DropdownProps = {
  ids?: number;
  name?: string;
  keys?: string;
  selectedKey?: string;
  value?: string | any;
  placeholder?: string;
  options?: any[];
  style?: ViewStyle;
  inputStyle?: StyleProp<TextStyle> | any;
  renderItem?: any;
  disabled?: boolean;
  editable?: boolean;
  onSelected: (item: any) => void;
  onSelectedKeys: (keys: any) => void;
  renderBase?: (props: RenderBaseProps) => React.ReactNode; // Not void | JSX
  customModalWidth?: number;
  labelKey?: LabelKeyType;
};

function Select(props: DropdownProps) {
  const { labelKey = "value" } = props;
  const pressableRef = React.useRef<any>(null);
  const { width, height } = useWindowDimensions();
  const [search, setSearch] = React.useState<string>("");
  const [isFocus, setFocus] = React.useState<boolean>(false);
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const [measure, setMesasure] = React.useState<MeasureValue>({} as MeasureValue);

  const handleClose = () => setVisible(false);

  const options = useMemo(() => {
    if (search && isFocus) {
      const result = props.options?.filter((item) => {
        if (typeof item === "string") {
          return item.toLowerCase().startsWith(search.toLowerCase());
        } else {
          return item[props.labelKey]?.toLowerCase().startsWith(search.toLowerCase());
        }
      });

      return result;
    }

    return props.options;
  }, [isFocus, search, props.options, props.labelKey, isVisible]);

  React.useEffect(() => {
    if (props.value) {
      const newValue = typeof props.value === "object" ? props.value[labelKey] : props.value;
      setSearch(newValue);
    }
  }, [props.value]);

  React.useEffect(() => {
    if (isVisible) {
      props.onSelectedKeys(props?.keys);
    }
  }, [isVisible]);

  React.useEffect(() => {
    if (props.selectedKey && props.selectedKey !== props.keys && isVisible) {
      setVisible(false);
    }
  }, [props.selectedKey, props.keys]);

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
  }, [pressableRef.current, isVisible, width, height]);

  return (
    <View ref={pressableRef} style={[{ zIndex: props.ids }, props.style]}>
      <RenderBase
        {...props}
        {...{
          isFocus,
          setFocus,
          isVisible,
          setVisible,
          search,
          setSearch,
        }}
      />
      <MenuList
        visible={isVisible}
        measures={measure}
        value={typeof props.value === "object" ? props.value[labelKey] : props.value}
        options={options}
        labelKey={props.labelKey || "label"}
        renderItem={props.renderItem}
        customModalWidth={props.customModalWidth}
        onSelected={props.onSelected}
        onClose={handleClose}
      />
    </View>
  );
}

type RenderBaseProps = {
  isVisible?: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  isFocus?: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
} & DropdownProps;

const RenderBase: React.FC<RenderBaseProps> = (props) => {
  const { editable = true, inputStyle } = props;

  if (typeof props.renderBase === "function") {
    return props.renderBase(props);
  }

  return (
    <View style={styles.render_container}>
      <TextInput
        disabled
        editable={editable}
        onFocus={() => props.setFocus(true)}
        value={props.search}
        style={[styles.input_style, inputStyle]}
        placeholder={props.placeholder}
        onChangeText={(value) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          props.setSearch && props.setSearch(value);
          props.setVisible(true);
        }}
        dataSet={{ media: ids.input_style }}
        backgroundColor="secondary"
      />
      <MaterialIcon
        name={props.isVisible ? "arrow-drop-up" : "arrow-drop-down"}
        size={30}
        disabled={props.disabled}
        onPress={() => {
          props.setVisible(!props.isVisible);
          props.setFocus(false);
        }}
        backgroundColor="secondary"
        color="placeholder"
        style={styles.icon_style}
      />
    </View>
  );
};

export default Select;
