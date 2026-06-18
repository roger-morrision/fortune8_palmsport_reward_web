import InteractionManagerScreenWrapper from "@/src/common/components/InteractiveManager";
import HomePage from "@/src/features/home";

function HomeScreen() {
  return (
    <InteractionManagerScreenWrapper>
      <HomePage />
    </InteractionManagerScreenWrapper>
  );
}

export default HomeScreen;
