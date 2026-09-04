import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import useAppSelector from "../../hooks/useAppSelector";
import HeaderAuth from "./header-auth";
import HeaderNoAuthScreen from "./header-no-auth";

function HeaderScreen() {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  return isLoggedIn ? <HeaderAuth /> : <HeaderNoAuthScreen />;
}

export default HeaderScreen;
