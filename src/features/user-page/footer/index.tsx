import React from "react";
import SwitchItem from "./popup-offers";
import CategoryItem from "../category-item";
import StyleSheet from "react-native-media-query";
import { useAuthService } from "@/src/store/hooks";

function Footer() {
  const { logout } = useAuthService();

  return (
    <>
      <SwitchItem />
      <CategoryItem
        onPress={logout}
        style={styles.logout_style}
        dataSet={{ media: ids.logout_style }}
        svg={"menu-arcade"}
        name={"Logout"}
      />
    </>
  );
}

const { ids, styles } = StyleSheet.create({
  logout_style: {
    marginTop: 43,
    marginBottom: 43,
  },
});

export default Footer;
