import { DrawerHeaderProps } from "expo-router/drawer";
import React from "react";
import HeaderAuth from "./header-auth";

function HeaderScreen(props: DrawerHeaderProps) {
  return <HeaderAuth />;
}

export default HeaderScreen;
