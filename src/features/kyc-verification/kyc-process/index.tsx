import View from "@/src/common/components/View";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import Footer from "@/src/features/home/footer";
import GotoGambly from "@/src/features/home/go-to-gambly";
import { selectedKYCCurrentScreen, selectedKYCLoading } from "@/src/store/slices/lobby.slice";
import React, { useEffect, useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import Categories from "./categories";
import KYCUploading from "./kyc-uploading";
import LiveVerification from "./live-verification";
import PersonalDetails from "./personal-details";
import ProofOfIdentity from "./proof-of-identity";
import { ids, styles } from "./styles.css";

export default function RedeemVerificationPage() {
  const scrollRef = useRef<ScrollView>(null);
  const currentScreen = useAppSelector(selectedKYCCurrentScreen);
  const isLoading = useAppSelector(selectedKYCLoading);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const components = useMemo(() => {
    switch (currentScreen) {
      case 0:
        return <PersonalDetails />;
      case 1:
        return <ProofOfIdentity />;
      case 2:
        return <LiveVerification />;
    }
  }, [currentScreen]);

  useEffect(() => {
    scrollToTop();
  }, [currentScreen]);

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        {isLoading ? (
          <KYCUploading />
        ) : (
          <>
            <Categories />
            {components}
          </>
        )}

        <View style={styles.footer} dataSet={{ media: ids.footer }}>
          <GotoGambly />
          <ConnectUs />
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
