import InteractionManagerScreenWrapper from "@/src/common/components/InteractiveManager";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import HomePage from "@/src/features/home";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { Redirect } from "expo-router";

function HomeScreen() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  if(!isLoggedIn){
    return <Redirect  href={'(auth)/sign-in'}/>
  }

  return (
    <InteractionManagerScreenWrapper>
      <HomePage />
    </InteractionManagerScreenWrapper>
  );
}

export default HomeScreen;
