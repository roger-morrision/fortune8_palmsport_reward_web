import InteractionManagerScreenWrapper from "@/src/common/components/InteractiveManager";
import ProtectedScreen from "@/src/common/components/ProtectedScreen";
import RedeemPage from "@/src/features/redeem";

function RedeemScreen() {
  return (
    <ProtectedScreen>
      <InteractionManagerScreenWrapper>
        <RedeemPage />
      </InteractionManagerScreenWrapper>
    </ProtectedScreen>
  );
}

export default RedeemScreen;
