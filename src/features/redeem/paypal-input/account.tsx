import React from "react";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import StyleSheet from "react-native-media-query";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { selectUserSession } from "@/src/store/slices/user.slice";

export default function AccountDetails() {
  const user = useAppSelector(selectUserSession);

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <Text fontFamily="PoppinsBold" style={styles.t_description}>
        Verified Account Information:
      </Text>
      <Text color="placeholder" style={styles.t_user}>
        First Name:{"    "}
        <Text color="text" fontFamily="PoppinsBold">
          {user.firstName}
        </Text>
      </Text>
      <Text color="placeholder" style={styles.t_user}>
        Last Name:{"    "}
        <Text color="text" fontFamily="PoppinsBold">
          {user.lastName}
        </Text>
      </Text>
      <Text color="placeholder" style={styles.t_user}>
        Email Address:{"  "}
        <Text color="text" fontFamily="PoppinsBold">
          {user.emailAddress}
        </Text>
      </Text>
      <Text color="placeholder" style={styles.t_notes}>
        Please ensure the information above is correct and matches the account details below.
        Two-factor authentication is required to proceed with your request.{" "}
      </Text>
    </View>
  );
}

const { ids, styles } = StyleSheet.create({
  container: {
    padding: 25,
    width: "100%",
    borderWidth: 1.82,
    borderColor: "#192851",
    borderRadius: 8,
    alignSelf: "center",
  },
  t_description: { fontSize: 18, lineHeight: 22 },
  t_user: { fontSize: 14, lineHeight: 18, marginTop: 12 },
  t_notes: { fontSize: 10, lineHeight: 19, marginTop: 17, fontStyle: "italic" },
});
