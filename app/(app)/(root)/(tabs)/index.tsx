import InteractionManagerScreenWrapper from "@/src/common/components/InteractiveManager";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import HomePage from "@/src/features/homepage";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { Redirect } from "expo-router";

function HomeScreen() {
  return (
    <InteractionManagerScreenWrapper>
      <HomePage />
    </InteractionManagerScreenWrapper>
  );
}

export default HomeScreen;
