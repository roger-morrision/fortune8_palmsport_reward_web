import BGButton from "@/src/common/components/BGButton";
import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import { ids, styles } from "./styles.css";
import Banner from "./banner";
import ResultsTable from "./results-table";
import Footer from "../homepage/footer";
import { RaffleService } from "@/src/api/services/raffles.service";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useQueries } from "@tanstack/react-query";
import { RewardService } from "@/src/api/services/rewards.service";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import { DRAW_RESULT_COLUMNS } from "@/src/constants/TableHeaders";

export default function DrawResult() {
  const router = useRouter();
  const { t } = useTranslation();
    const [resultPageQuery, resultsQuery] = useQueries({
    queries: [
      {
        queryKey: ["draw-result-description"],
        queryFn: () => RewardService.resultPage(),
      },
      {
        queryKey: ["raffle-results"],
        queryFn: () => RaffleService.results(),
      },
    ],
  });

  const isLoading = resultPageQuery.isLoading || resultsQuery.isLoading;
  const page = resultPageQuery.data;
  const CURRENT_RESULTS = resultsQuery?.data?.results[0] ?? [];
  const PREVIOUS_RESULTS = resultsQuery?.data?.results[1] ?? [];


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
        <Banner image={page?.image} description={page?.description} />

        <ResultsTable
          title={t("draw-result.current")}
          columns={DRAW_RESULT_COLUMNS}
          data={CURRENT_RESULTS}
        />

        <ResultsTable
          title={t("draw-result.previous")}
          columns={DRAW_RESULT_COLUMNS}
          data={PREVIOUS_RESULTS}
        />

        <BGButton
          label="PARTICIPATE IN NEXT DRAW"
          style={styles.btn_cta}
          onPress={() => router.push("/(tabs)/raffle-draw")}
          dataSet={{ media: ids.btn_cta }}
          labelStyle={styles.label_cta}
          fontFamily="Montserrat-Bold"
        />

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
