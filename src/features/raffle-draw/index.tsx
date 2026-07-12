import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import BGButton from "@/src/common/components/BGButton";
import View from "@/src/common/components/View";
import { RaffleService } from "@/src/api/services/raffles.service";
import { RewardService } from "@/src/api/services/rewards.service";
import { useQueries } from "@tanstack/react-query";
import { ScrollView } from "react-native";
import Footer from "../home/footer";
import Banner from "./banner";
import Countdown from "./countdown";
import DrawTerms from "./terms";
import TicketSelect from "./ticket-select";
import { ids, styles } from "./styles.css";

export default function RaffleDrawPage() {
  const [rafflePageQuery, ongoingQuery] = useQueries({
    queries: [
      {
        queryKey: ["raffle-page-description"],
        queryFn: () => RewardService.rafflePage(),
      },
      {
        queryKey: ["ongoing-raffle"],
        queryFn: () => RaffleService.ongoing(),
      },
    ],
  });

  const data = rafflePageQuery.data;
  const ongoing = ongoingQuery.data;
  const isLoading = rafflePageQuery.isLoading || ongoingQuery.isLoading;

  if(isLoading){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", minHeight: 180 }}>
        <ActivityIndicator animating size="large" color="button" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Banner
          image={data?.image}
          description={data?.description}
          prize={data?.prize}
        />

        <View style={styles.v_panels} dataSet={{ media: ids.v_panels }}>
          {ongoing && <Countdown raffle={ongoing} />}
          <TicketSelect
            raffleId={ongoing?.id}
            ticketLimit={ongoing?.ticketLimit ?? 0}
            ticketPrice={ongoing?.ticketPrice ?? 0}
          />
        </View>

        <BGButton
          label="ENTER NOW"
          style={styles.btn_enter}
          dataSet={{ media: ids.btn_enter }}
          labelStyle={styles.label_enter}
          fontFamily="Montserrat-Bold"
        />

        <DrawTerms content={data?.tnc} />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
