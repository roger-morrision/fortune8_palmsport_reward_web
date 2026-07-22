import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import AccountDetails from "./account-details";
import {ids, styles } from "./styles.css";
import Footer from "../homepage/footer";
import PalmsGold from "./palms-gold";
import DataRow from "./data-table/data-row";
import BGButton from "@/src/common/components/BGButton";

function UserPage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} backgroundColor="background">
        <View style={styles.container_flex}>
          <View style={styles.container_row} dataSet={{ media: ids.container_row}}>
            <AccountDetails />
            <PalmsGold />
          </View>
          <DataRow />
          <BGButton
            // onPress={() => setTab(tab === "silver" ? "gold" : "silver")}
            borderWidth={2}
            fontFamily="Montserrat-Bold"
            label={"VIEW RAFFLE DRAW RESULT"}
            style={styles.button_view_result}
            labelStyle={styles.label_view_result}
          />
          
          {/* <KYCSection /> */}
          <View style={{ gap: 10, marginTop: 100 }}>
            <Footer />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UserPage;
