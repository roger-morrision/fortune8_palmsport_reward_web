import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import BGButton from "@/src/common/components/BGButton";
import View from "@/src/common/components/View";
import { RaffleService } from "@/src/api/services/raffles.service";
import { RewardService } from "@/src/api/services/rewards.service";
import { useQueries } from "@tanstack/react-query";
import { ScrollView } from "react-native";
import Footer from "../homepage/footer";
import DrawTerms from "../raffle-draw/terms";
import Countdown from "./countdown";
import EliteBanner from "./banner";
import EliteTicketSelect from "./ticket-select";
import { ids, styles } from "./styles.css";

export default function ElitePlusPage() {
  const [rafflePageQuery, ongoingQuery] = useQueries({
    queries: [
      {
        queryKey: ["elite-raffle-page-description"],
        queryFn: () => RewardService.rafflePage(),
      },
      {
        queryKey: ["elite-ongoing-raffle"],
        queryFn: () => RaffleService.ongoing(),
      },
    ],
  });

  const data = rafflePageQuery.data;
  const ongoing = ongoingQuery.data;
  const isLoading = rafflePageQuery.isLoading || ongoingQuery.isLoading;

  if (false) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", minHeight: 180 }}>
        <ActivityIndicator animating size="large" color="button" />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <EliteBanner />

        <View style={styles.v_panels} dataSet={{ media: ids.v_panels }}>
          <Countdown raffle={ongoing} variant="gold" />
          <EliteTicketSelect
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
          bgColors={["#DF7B0B", "#E5D33D"]}
          strokeColors={["#E4C234", "#FFFFAAE3", "#E08A14"]}
        />

        <DrawTerms content={data?.tnc} variant="gold" />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
