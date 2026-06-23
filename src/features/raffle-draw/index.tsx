import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import { ids, styles } from "./styles.css";
import Banner from "./banner";
import BGButton from "@/src/common/components/BGButton";
import Footer from "../home/footer";

export default function RaffleDrawPage() {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Banner />
        <BGButton
          // onPress={() => setTab(tab === "silver" ? "gold" : "silver")}
          label={"ENTER NOW"}
          style={styles.button_view_result}
          labelStyle={styles.label_view_result}
        />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
