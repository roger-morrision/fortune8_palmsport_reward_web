import HeaderScreen from "@/src/common/components/header";
import CustomTabBar from "@/src/common/components/tab-bar";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import useThemeColor from "@/src/common/hooks/useThemeColor";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import { useRootContext } from "@/src/context/RootContext";
import { useTabContext } from "@/src/context/TabContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { Tabs, useNavigation, usePathname, useRouter } from "expo-router";
import { DrawerActions } from "expo-router/build/react-navigation";
import React, { useEffect } from "react";

// Define the TabLayout component
export default function TabLayout() {
  const { setInitiateLobby } = useRootContext();

  useEffect(() => {
    setInitiateLobby(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <TabScreens />;
}

// Define the TabLayout component
function TabScreens() {
  const router = useRouter();
  const pathname = usePathname();
  const navigation = useNavigation();
  const primaryColor = useThemeColor("primary");
  const backgroundColor = useThemeColor("background");
  const tabBarActiveTintColor = useThemeColor("button");
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const { setOpenAccountDrawer } = useTabContext();
  const tabbarWidth = useBreakpoint({
    default: 800,
    mobile: "100%",
  });

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer()); // then close
  };

  useEffect(() => {
    const publicPaths = [
      "/",
      "/menu",
      "/auth",
      "/auth/login",
      "/auth/signup",
      "/auth/complete-signup",
      "/forgot-password",
      "/reset-password",
      "/email-verification",
      "/resend-verification",
      "/deactivated-verified",
      "/how-to-play",
      "/how-it-works",
      "/promotions",
    ];

    const publicPrefixes = [
      "/about/", // covers /about/terms, /about/privacy, etc.
      "/promotions",
    ];

    const isPublicPath =
      publicPaths.includes(pathname) ||
      publicPrefixes.some((prefix) => pathname.startsWith(prefix));

    if (!isLoggedIn && !isPublicPath) {
      router.replace("/");
      const timeout = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        timeout && clearTimeout(timeout);
        router.push("/auth/login");
      }, 100);
    }
  }, [pathname, isLoggedIn, router]);

  return (
    <>
      <Tabs
        initialRouteName="index"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenListeners={() => ({
          tabPress: (e) => {
            // Prevent default behavior (navigating to screen)
            if (!isLoggedIn) {
              e.preventDefault();
              router.push("/auth/login");
              return;
            }
          },
        })}
        screenOptions={{
          sceneStyle: {
            zIndex: 100,
            backgroundColor: primaryColor,
          },
          tabBarActiveTintColor,
          headerShadowVisible: false,
          tabBarLabelPosition: "below-icon",
          headerTitleStyle: {
            fontFamily: "PoppinsMedium",
          },
          tabBarLabelStyle: {
            fontFamily: "PoppinsMedium",
          },
          tabBarStyle: {
            height: 67,
            paddingTop: 10,
            borderTopWidth: 0,
            paddingBottom: 10,
            width: tabbarWidth,
            alignSelf: "center",
            backgroundColor: primaryColor,
          },
          headerStyle: {
            backgroundColor: primaryColor,
          },
          header: () => <HeaderScreen />,
        }}
      >
        <Tabs.Screen name="index" options={{ tabBarLabel: "Home" }} />
        <Tabs.Screen name="raffle-draw" options={{ tabBarLabel: "Raffle Draw" }} />
        <Tabs.Screen name="draw-result" options={{ tabBarLabel: "Draw Result" }} />
        <Tabs.Screen name="account" options={{ tabBarLabel: "Account" }} />
      </Tabs>
    </>
  );
}
