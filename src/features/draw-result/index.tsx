import BGButton from "@/src/common/components/BGButton";
import Text from "@/src/common/components/Text";
import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import { ids, styles } from "./styles.css";
import Banner from "./banner";
import ResultsTable, { DrawTableColumn } from "./results-table";
import Footer from "../home/footer";
import React from "react";

const PLACE_COLORS: Record<string, string> = {
  "1ST PLACE": "#D4AF37",
  "2ND PLACE": "#B0BEC5",
  "3RD PLACE": "#CD7F32",
  "4TH PLACE": "#5195FF",
  "5TH PLACE": "#5195FF",
};

const DRAW_COLUMNS: DrawTableColumn[] = [
  { id: "drawNo",       label: "Draw No.",     flex: 1 },
  { id: "date",         label: "Date of Draw", flex: 1 },
  { id: "promotion",    label: "Promotion",    flex: 1 },
  { id: "totalEntries", label: "Total Entries",flex: 1, align: "center" },
  {
    id: "place",
    label: "Place",
    flex: 1,
    renderCell: (value) => {
      const place = String(value ?? "");
      const color = PLACE_COLORS[place] ?? "#5195FF";
      return (
        <View style={{ borderWidth: 1, borderColor: color, borderRadius: 4, paddingVertical: 3, paddingHorizontal: 8, alignSelf: "flex-start" }}>
          <Text fontFamily="Montserrat-Bold" style={{ fontSize: 11, lineHeight: 15, letterSpacing: 0.3, color }}>
            {place}
          </Text>
        </View>
      );
    },
  },
  { id: "winnerId", label: "Winner ID", flex: 1, align: "center" },
];

const CURRENT_RESULTS = [
  { drawNo: "RD-1245", date: "11-03-2025", promotion: "PROMO", totalEntries: 422,  place: "1ST PLACE", winnerId: "987624" },
  { drawNo: "RD-1245", date: "11-03-2025", promotion: "PROMO", totalEntries: 7924, place: "2ND PLACE", winnerId: "321456" },
  { drawNo: "RD-1245", date: "11-03-2025", promotion: "PROMO", totalEntries: 1234, place: "3RD PLACE", winnerId: "654321" },
  { drawNo: "RD-1245", date: "11-03-2025", promotion: "PROMO", totalEntries: 8993, place: "4TH PLACE", winnerId: "456789" },
  { drawNo: "RD-1245", date: "11-03-2025", promotion: "PROMO", totalEntries: 112,  place: "5TH PLACE", winnerId: "789012" },
];

const PREVIOUS_RESULTS = [
  { drawNo: "RD-2340", date: "11-10-2025", promotion: "PROMO", totalEntries: 422,  place: "1ST PLACE", winnerId: "987624" },
  { drawNo: "RD-2340", date: "11-10-2025", promotion: "PROMO", totalEntries: 7924, place: "2ND PLACE", winnerId: "321456" },
  { drawNo: "RD-2340", date: "11-10-2025", promotion: "PROMO", totalEntries: 1234, place: "3RD PLACE", winnerId: "654321" },
  { drawNo: "RD-2340", date: "11-10-2025", promotion: "PROMO", totalEntries: 8993, place: "4TH PLACE", winnerId: "456789" },
  { drawNo: "RD-2340", date: "11-10-2025", promotion: "PROMO", totalEntries: 112,  place: "5TH PLACE", winnerId: "789012" },
];

export default function DrawResult() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <Banner />

        <ResultsTable
          title="RESULTS FROM THE DRAW"
          columns={DRAW_COLUMNS}
          data={CURRENT_RESULTS}
        />

        <ResultsTable
          title="RESULTS FROM PREVIOUS DRAWS"
          columns={DRAW_COLUMNS}
          data={PREVIOUS_RESULTS}
        />

        <BGButton
          label="PARTICIPATE IN NEXT DRAW"
          style={styles.btn_cta}
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
