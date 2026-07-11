import BGButton from "@/src/common/components/BGButton";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import { ids, styles } from "./styles.css";
import Banner from "./banner";
import ResultsTable, { DrawTableColumn } from "./results-table";
import Footer from "../home/footer";
import moment from "moment";
import { useQueryApi } from "@/src/common/hooks/useQueryApi";
import { RaffleService } from "@/src/api/services/raffles.service";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const PLACES: Record<number, string> = {
  1: "1ST PLACE",
  2: "2ND PLACE",
  3: "3RD PLACE",
  4: "4TH PLACE",
  5: "5TH PLACE",
};

const DRAW_COLUMNS: DrawTableColumn[] = [
  { id: "code", label: "draw-no",     flex: 1 },
  { id: "drawAt", label: "draw-date", flex: 1, renderCell: (value) => (
    <Text fontFamily="Montserrat" style={{ fontSize: 13, lineHeight: 18, color: "#D6D6D6" }}>
      {value ? moment(value as string).format("DD-MM-YYYY") : "—"}
    </Text>
  )},
  { id: "promotion",    label: "promotion",    flex: 1 },
  { id: "totalRedeemedTickets", label: "entries", flex: 1, align: "center" },
  {
    id: "place",
    label: "place",
    flex: 1,
    renderCell: (value) => {
      return (
        <Text >
          {PLACES[value as number]}
        </Text>
      );
    },
  },
  { id: "user.id", label: "user-id", flex: 1, align: "center" },
];

export default function DrawResult() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useQueryApi(["raffle-results"], RaffleService.results, {}, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const CURRENT_RESULTS = data?.results[0] ?? [];
  const PREVIOUS_RESULTS = data?.results[1] ?? [];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Banner />

        <ResultsTable
          title={t("draw-result.current")}
          columns={DRAW_COLUMNS}
          data={CURRENT_RESULTS}
        />

        <ResultsTable
          title={t("draw-result.previous")}
          columns={DRAW_COLUMNS}
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
