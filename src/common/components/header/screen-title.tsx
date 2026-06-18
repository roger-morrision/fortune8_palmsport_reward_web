import useThemeColor from "@/src/common/hooks/useThemeColor";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackHeaderProps, useRouter } from "expo-router";
import React from "react";
import Button from "../Button";
import Text from "../Text";
import View from "../View";
import { ids, styles } from "./styles.css";

function ScreenTitle(props: NativeStackHeaderProps | any) {
  const router = useRouter();
  const color = useThemeColor("text");

  const backgroundColor = useBreakpoint({
    default: "primary",
    mobile: "transparent",
    tablet: "transparent",
  });

  const onHandleBack = () => {
    if (typeof props.onBack === "function") {
      props.onBack();
    } else {
      router.canGoBack() ? router.back() : router.replace("/");
    }
  };

  return (
    <View
      style={styles.main_container}
      backgroundColor={backgroundColor}
      dataSet={{ media: ids.main_container }}
    >
      <View
        style={[styles.container, { maxWidth: "100%" }]}
        backgroundColor={backgroundColor}
        dataSet={{ media: ids.container }}
      >
        <Button onPress={onHandleBack} style={styles.button_container}>
          <MaterialIcons name="keyboard-backspace" size={30} color={color} />
        </Button>
        <Text style={styles.text} dataSet={{ media: ids.text }}>
          {props.options.title}
        </Text>
      </View>
    </View>
  );
}

export default ScreenTitle;
