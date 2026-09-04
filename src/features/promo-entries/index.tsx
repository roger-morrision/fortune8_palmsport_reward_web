import View from "@/src/common/components/View";
import { ScrollView } from "react-native";
import {ids, styles } from "./styles.css";
import Footer from "../homepage/footer";
import DataRow from "./data-table/data-row";
import BGButton from "@/src/common/components/BGButton";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

function PromoEntriesPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container} backgroundColor="background">
        <View style={styles.container_flex}>
          <DataRow />
          <BGButton
            onPress={() => router.push("/(tabs)/draw-result")}
            borderWidth={2}
            fontFamily="Montserrat-Bold"
            label={t("promo-entries.button")}
            style={styles.button_view_result}
            labelStyle={styles.label_view_result}
          />
          
          <View style={{ gap: 10, marginTop: 100 }}>
            <Footer />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default PromoEntriesPage;
