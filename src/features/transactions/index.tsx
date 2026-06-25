import React, { useEffect, useRef } from "react";
import Footer from "../home/footer";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import Categories from "./categories";
import DisplayItem from "./display-item";
import GotoGambly from "../home/go-to-gambly";
import View from "@/src/common/components/View";
import Text from "@/src/common/components/Text";
import StyleSheet from "react-native-media-query";
import Button from "@/src/common/components/Button";
import ActivityIndicator from "@/src/common/components/ActivityIndicator";
import TransactionProvider, { useTransactionContext } from "@/src/context/TransactionContext";

function TransactionPage() {
  return (
    <TransactionProvider>
      <>
        <Categories />
        <Contents />
      </>
    </TransactionProvider>
  );
}

function Contents() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const { loading, transactions, category } = useTransactionContext();

  const onPress = () => router.push("/contact-support");

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [category.redeemStatusID]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={transactions}
        style={styles.scroll_style}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, key) => key.toString()}
        ListHeaderComponent={() => {
          return (
            <>
              {loading && (
                <ActivityIndicator animating size="large" color="text" style={{ padding: 40 }} />
              )}
            </>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={() => {
          return (
            <>
              <View style={styles.v_support} dataSet={{ media: ids.v_support }}>
                <Text style={styles.t_support_notes} dataSet={{ media: ids.t_support_notes }}>
                  If something does not look right please contact support immediately to rectify the
                  issue.
                </Text>
                <Button
                  onPress={onPress}
                  style={styles.button_support}
                  dataSet={{ media: ids.button_support }}
                >
                  <Text style={styles.button_label} dataSet={{ media: ids.button_label }}>
                    Contact Support
                  </Text>
                </Button>
              </View>
              <View style={styles.footer} dataSet={{ media: ids.footer }}>
                <GotoGambly />
                <ConnectUs />
                <Footer />
              </View>
            </>
          );
        }}
        renderItem={({ item, index }) => <DisplayItem key={index.toString()} item={item} />}
      />
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  scroll_style: {
    paddingVertical: 34,
  },
  v_info_container: {
    gap: 7,
    marginTop: 17,
    marginBottom: 24,
    width: "100%",
    maxWidth: 707,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 850px)": {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  t_info_notes: {
    fontSize: 14,
    lineHeight: 17,
    fontStyle: "italic",
  },
  v_support: {
    width: "100%",
    marginTop: 36,
    maxWidth: 707,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 850px)": {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  t_support_notes: {
    fontSize: 12,
    lineHeight: 15,
  },
  button_support: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E3AD37",
  },
  button_label: {
    fontSize: 18,
    lineHeight: 21,
  },
  footer: {
    gap: 10,
    width: "100%",
    marginTop: 125,
    "@media (min-width: 996px)": {
      gap: 0,
    },
  },
});

export default TransactionPage;
