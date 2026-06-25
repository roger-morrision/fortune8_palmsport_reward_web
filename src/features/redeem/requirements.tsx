import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { RedemptionRequirements } from "@/src/constants/static";
import { useAuthService } from "@/src/store/hooks";
import { selectAuthFirstLogin } from "@/src/store/slices/auth.slice";
import React, { useEffect, useState } from "react";
import StyleSheet from "react-native-media-query";

export default function Requirements() {
  const isFirstLogin = useAppSelector(selectAuthFirstLogin);
  const [visible, setVisible] = useState(isFirstLogin);
  const { resetFirstLogin } = useAuthService();

  useEffect(() => {
    resetFirstLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.v_redemption_container}>
        <Text
          fontFamily="Montserrat-Bold"
          style={styles.t_redemption}
          dataSet={{ media: ids.t_redemption }}
        >
          Redemption Requirement
        </Text>
        <MaterialIcon
          backgroundColor="transparent"
          onPress={() => setVisible(!visible)}
          asButton
          name={visible ? "arrow-drop-up" : "arrow-drop-down"}
          size={40}
          color="placeholder"
        />
      </View>
      {visible && (
        <View style={styles.v_details_container}>
          <Text style={styles.t_details}>{RedemptionRequirements}</Text>
        </View>
      )}
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    backgroundColor: "#0E1A3A",
    borderRadius: 8,
    width: "100%",
    maxWidth: 969,
    alignSelf: "center",
  },
  v_redemption_container: {
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    height: 57,
  },
  t_redemption: {
    fontSize: 20,
    lineHeight: 29,
    color: "#FBE18A",
    "@media (min-width: 800px)": {
      fontSize: 18,
      lineHeight: 27,
    },
  },
  v_details_container: { paddingHorizontal: 20, paddingBottom: 20 },
  t_details: { fontSize: 13, lineHeight: 27 },
});
