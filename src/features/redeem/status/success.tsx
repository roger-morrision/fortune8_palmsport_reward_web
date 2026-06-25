import Button from "@/src/common/components/Button";
import { MaterialIcon } from "@/src/common/components/Icon";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ids, styles } from "./styles.css";
import numeral from "numeral";

function Success() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.circle_container}>
        <MaterialIcon name="check" size={60} />
      </View>
      <Text
        color={"text"}
        style={styles.title_style}
        dataSet={{ media: ids.title_style }}
        fontFamily="Montserrat-Medium"
      >
        Purchase Successful!
      </Text>
      <Text
        color={"closeColor"}
        style={styles.text_style}
        dataSet={{ media: ids.text_style }}
        fontFamily="Montserrat"
      >
        Thank you for your purchase. Your package has been added to your account.
      </Text>
      <View backgroundColor="primary" style={styles.v_items}>
        <Item label="Package:" value={params.packageName} />
        <Item label="Amount:" value={`$${numeral(params.price).format("0.00")}`} />
        <Item label="Payment Type:" value={params.paymentType} />
      </View>
      <Button
        borderColor={"button"}
        backgroundColor={"button"}
        style={styles.login_button_style}
        onPress={() => router.navigate("/")}
        dataSet={{ media: ids.login_button_style }}
      >
        <Text
          color={"textDark"}
          style={styles.login_label_style}
          dataSet={{ media: ids.login_label_style }}
          fontFamily="Montserrat-Medium"
        >
          Back to Lobby
        </Text>
      </Button>
    </View>
  );
}

type ItemProps = {
  label: string;
  value: any;
};

const Item = ({ label, value }: ItemProps) => {
  return (
    <View style={styles.row_container}>
      <Text style={styles.text_label} dataSet={{ media: ids.text_label }}>
        {label}
      </Text>
      <Text style={styles.text_value} dataSet={{ media: ids.text_value }}>
        {value}
      </Text>
    </View>
  );
};

export default Success;
