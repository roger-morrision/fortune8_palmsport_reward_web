import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import React from "react";
import { ids, styles } from "./styles.css";
import { MaterialIcons } from "@expo/vector-icons";

function Info() {
  return (
    <View style={styles.v_notes_container} dataSet={{ media: ids.v_notes_container }}>
      <Text style={styles.t_notes} dataSet={{ media: ids.t_notes }}>
        Get in touch with PalmsPlay Rewards. Let us know how we can assist you and our support team
        will get back to you as soon as possible.
      </Text>
      <View style={styles.divider} dataSet={{ media: ids.divider }} />
      <View style={styles.v_contact_container} dataSet={{ media: ids.v_contact_container }}>
        <View style={styles.v_item_container} dataSet={{ media: ids.v_item_container }}>
          <MaterialIcons name="call" size={30} color="#EBCD75" />
          <Text style={styles.t_contact_label} dataSet={{ media: ids.t_contact_label }}>
            701-484-1383
          </Text>
        </View>
        <View style={styles.divider2} dataSet={{ media: ids.divider2 }} />
        <View style={styles.v_item_container2} dataSet={{ media: ids.v_item_container2 }}>
          <MaterialIcons name="location-on" size={30} color="#EBCD75" />
          <Text style={styles.t_contact_label} dataSet={{ media: ids.t_contact_label }}>
            333 3rd Avenue N.{"\n"}St. Petersburg, FL 33701
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Info;
