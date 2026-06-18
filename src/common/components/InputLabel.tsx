import Text from "@/src/common/components/Text";
import TextInput from "@/src/common/components/TextInput";
import View from "@/src/common/components/View";
import { ColorName } from "@/src/constants/Colors";
import { FontFamily } from "@/src/constants/Fonts";
import React, { useMemo } from "react";
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import StyleSheet from "react-native-media-query";

type Props = {
  label?: string;
  error?: string;
  disabled?: boolean;
  errorPosition?: string;
  isRequired?: boolean;
  labelColor?: ColorName;
  labelFontFamily?: FontFamily;
  labelStyle?: StyleProp<TextStyle> | undefined;
  labelDataSet?: Record<string, string>;
  inputContainer?: StyleProp<ViewStyle> | undefined;
  inputContainerDataSet?: Record<string, string>;
  inputStyle?: StyleProp<TextStyle> | undefined;
  inputDataSet?: Record<string, string>;
} & TextInputProps;

function InputLabel(props: Props) {
  const ErrorMessage = useMemo(() => {
    if (props.error) {
      switch (props.errorPosition) {
        case "bottom":
          return (
            <Text
              style={styles.text_error_bottom_style}
              dataSet={{ media: ids.text_error_bottom_style }}
              fontFamily="PoppinsLight"
            >
              {props.error}
            </Text>
          );
        default:
          return (
            <Text
              style={styles.text_error_style}
              dataSet={{ media: ids.text_error_style }}
              fontFamily="PoppinsLight"
            >
              {props.error}
            </Text>
          );
      }
    }

    return null;
  }, [props.error, props.errorPosition]);

  return (
    <View
      style={[styles.container, props.style]}
      dataSet={props.dataSet || { media: ids.container }}
    >
      {props.label && (
        <Text
          color={props.error ? "red" : props.labelColor || "closeColor"}
          style={props.labelStyle || styles.label_style}
          dataSet={props.labelDataSet}
          fontFamily={props.labelFontFamily || "PoppinsMedium"}
        >
          {props.label}
          {props.isRequired && <Text color="red"> *</Text>}
        </Text>
      )}
      <View
        style={[styles.input_container, props.inputContainer]}
        dataSet={props.inputContainerDataSet || { media: ids.input_container }}
      >
        <TextInput
          autoComplete={props.autoComplete}
          autoCapitalize={props.autoCapitalize}
          autoCorrect={props.autoCorrect}
          textContentType={props.textContentType}
          secureTextEntry={props.secureTextEntry}
          importantForAutofill={props.importantForAutofill}
          nativeID={props.nativeID}
          value={props.value}
          backgroundColor="secondary"
          disabled={props.disabled}
          borderColor={props.error ? "error" : "borderColor"}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          style={[styles.input_style, props.error && styles.input_error_style, props.inputStyle]}
          dataSet={props.inputDataSet || { media: ids.input_style }}
        />
        {ErrorMessage}
      </View>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  label_style: {
    fontSize: 14,
    lineHeight: 16,
    "@media (min-width: 800px)": {
      fontSize: 16,
      lineHeight: 18,
    },
  },
  input_container: {
    marginTop: 15,
    justifyContent: "center",
  },
  input_style: {
    height: 45,
    borderRadius: 5,
    "@media (min-width: 800px)": {
      height: 48,
      borderRadius: 5.5,
    },
  },
  input_error_style: {
    borderColor: "red",
  },
  text_error_style: {
    right: 10,
    fontSize: 11,
    lineHeight: 13,
    color: "red",
    position: "absolute",
    "@media (min-width: 800px)": {
      fontSize: 13,
      lineHeight: 15,
    },
  },
  text_error_bottom_style: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 13,
    color: "red",
    "@media (min-width: 800px)": {
      fontSize: 13,
      lineHeight: 15,
    },
  },
});

export default InputLabel;
