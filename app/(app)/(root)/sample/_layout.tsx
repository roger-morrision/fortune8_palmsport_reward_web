import DrawerComponent from "@/src/common/components/drawer";
import HeaderScreen from "@/src/common/components/header";
import { useBreakpoint } from "@/src/constants/BreakPoint";
import Colors from "@/src/constants/Colors";
import { useRootContext } from "@/src/context/RootContext";
import Drawer from "expo-router/drawer";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  const { setInitiateLobby } = useRootContext();

  const drawerWidth = useBreakpoint({
    mobile: "60%",
    xlarge: "20%",
    large: "20%",
    default: "60%",
  });

  useEffect(() => {
    setInitiateLobby(true);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerComponent {...props} />}
        screenOptions={{
          header: () => <HeaderScreen />,
          drawerType: "front",
          drawerPosition: "right",
          swipeEnabled: false, // also disables swipe open
          drawerContentContainerStyle: { backgroundColor: Colors.dark.transparent },
          sceneStyle: {
            flex: 1,
            zIndex: 10,
            backgroundColor: Colors.dark.transparent,
          },
          overlayColor: Colors.dark.transparent,
          drawerStyle: {
            width: drawerWidth,
            marginTop: 0,
            backgroundColor: Colors.dark.background,
          },
        }}
      >
        {/* Wrap routes in a Stack */}
        <Drawer.Screen
          name="(stack)"
          // options={{ headerShown: false }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
