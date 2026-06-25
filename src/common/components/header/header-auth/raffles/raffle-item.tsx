import Text from "@/src/common/components/Text";
import { routeToPathname } from "@/src/common/utils/transform-helper";
import { usePathname } from "expo-router";
import { Pressable } from "react-native";
import styles from "./styles.css"
import { useMemo } from "react";

type Props = {
  label: string;
  route: string;
  onPress: () => void;
}

const RaffleItem = ({ onPress, route, label }: Props) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return routeToPathname(route) === pathname;
  }, [pathname, route]);

  return (
    <Pressable style={styles.lang_container} onPress={onPress}>
      <Text color={isActive ? "button" : "text"}
        numberOfLines={1}
        fontFamily="Montserrat-Medium"
        style={styles.text_label}
        >
        {label}
      </Text>
    </Pressable>
  )
};


export default RaffleItem;
