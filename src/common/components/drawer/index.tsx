import { useAssetContext } from "@/src/context/AssetContext";
import { useAuthService } from "@/src/store/hooks";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Linking } from "react-native";
import StyleSheet from "react-native-media-query";
import useAppSelector from "../../hooks/useAppSelector";
import { AUTHSettings, Settings } from "../../utils/options-holder";
import Button from "../Button";
import Text from "../Text";
import View from "../View";
import AccountDetails from "./account-details";
import CategoryItem from "./category-item";
import { GAMBLY_URL } from "@/src/constants/Config";
import { DrawerContentComponentProps } from "expo-router/drawer";

export default function DrawerComponent({ navigation }: DrawerContentComponentProps) {
  const router = useRouter();

  const { images } = useAssetContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  const handleItem = (route: string) => {
    router.replace(route);
    navigation.toggleDrawer();
  };

  const gotoGambly = () => Linking.openURL(GAMBLY_URL);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={isLoggedIn ? AUTHSettings : Settings}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, key) => key.toString()}
        ListHeaderComponent={() => {
          if (isLoggedIn) {
            return (
              <>
                <View backgroundColor="secondary" style={styles.v_header}>
                  <AccountDetails />
                  <Button onPress={gotoGambly} backgroundColor="button" style={styles.button1}>
                    <Text fontFamily="Montserrat-SemiBold" color="textDark">
                      Go to Gambly
                    </Text>
                  </Button>
                </View>
              </>
            );
          }

          return (
            <>
              <Image
                style={styles.img1}
                source={{ uri: images?.["drawer-img-1"].uri }}
                resizeMode="contain"
              />
              <Button onPress={gotoGambly} backgroundColor="button" style={styles.button2}>
                <Text fontFamily="Montserrat-SemiBold" color="textDark">
                  Go to Gambly
                </Text>
              </Button>
            </>
          );
        }}
        ListFooterComponent={isLoggedIn ? <Footer /> : null}
        ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: "#0C193A" }} />}
        renderItem={({ item, index }) => {
          return (
            <CategoryItem
              key={index.toString()}
              onPress={() => handleItem(item.route)}
              svg={item.svg}
              name={item.name}
            />
          );
        }}
      />
    </View>
  );
}

function Footer() {
  const { logout } = useAuthService();

  return (
    <>
      <CategoryItem
        onPress={logout}
        style={styles.logout_style}
        dataSet={{ media: ids.logout_style }}
        svg={"account-logout"}
        name={"Logout"}
      />
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  v_header: {
    width: "100%",
    height: 190,
    gap: 30,
    paddingTop: 25,
    padding: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 6,
  },
  button2: {
    width: "88%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 6,
    top: "-2%",
  },
  img1: { width: "100%", height: 220 },
  logout_style: {
    marginTop: 50,
    marginBottom: 43,
    "@media (min-width: 800px)": {
      marginBottom: 120,
    },
  },
});
