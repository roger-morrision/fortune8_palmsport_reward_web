import React, { useState } from "react";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ids, styles } from "./styles.css";
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";
import { MaterialIcon } from "@/src/common/components/Icon";

const FAQItem = ({ item }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text
          color={visible ? "yellowThick" : "text"}
          fontFamily="PoppinsBold"
          selectable={false}
          style={styles.title}
        >
          {item.title}
        </Text>
        <MaterialIcon
          asButton
          onPress={() => setVisible(!visible)}
          color={visible ? "yellowThick" : "text"}
          size={25}
          name={visible ? "remove" : "add"}
        />
      </View>

      {visible && (
        <View style={styles.v_info}>
          <Text fontFamily="PoppinsMedium" style={styles.description}>
            {item.description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(FAQItem);
