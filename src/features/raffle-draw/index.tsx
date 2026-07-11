import BGButton from "@/src/common/components/BGButton";
import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import Footer from "../home/footer";
import Banner from "./banner";
import Countdown from "./countdown";
import DrawTerms from "./terms";
import TicketSelect from "./ticket-select";
import { ids, styles } from "./styles.css";
import { useQueryApi } from "@/src/common/hooks/useQueryApi";
import { RaffleService } from "@/src/api/services/raffles.service";
import { RewardService } from "@/src/api/services/rewards.service";

export default function RaffleDrawPage() {
  const { data } = useQueryApi(["ongoing-raffle"], RewardService.rafflePage, {}, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

  console.log("data", data)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        {/* Giveaway banner + description + prize */}
        <Banner  
          image={data?.image}
          description={data?.description} 
          prize={data?.prize} 
        />

        {/* Countdown timer + ticket selection side by side (stacked on mobile) */}
        <View style={styles.v_panels} dataSet={{ media: ids.v_panels }}>
          <Countdown totalEntries={100} />
          <TicketSelect pgPerTicket={10} />
        </View>

        {/* Enter Now CTA */}
        <BGButton
          label="ENTER NOW"
          style={styles.btn_enter}
          dataSet={{ media: ids.btn_enter }}
          labelStyle={styles.label_enter}
          fontFamily="Montserrat-Bold"
        />

        {/* Collapsible draw terms */}
        <DrawTerms content={data?.tnc} />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
