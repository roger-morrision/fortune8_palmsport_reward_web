/* eslint-disable react/display-name */
// Import necessary components and libraries from 'expo-router'
import { setupInterceptors } from "@/src/api/interceptors";
import { Slot, SplashScreen } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";

// Export ErrorBoundary from 'expo-router'
export { ErrorBoundary } from "expo-router";

// Define initial navigation settings
// export const unstable_settings = {
//   initialRouteName: "index",
// };

// Prevent the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

// SETUP INTERCEPTORS FOR THE APIs
setupInterceptors();
/**
 * 1. Expo router requires rendering a "Slot" or layout component (e.g., Stack, Tab) during the initial render.
 *
 * 2. In this case, we have components that can potentially delay the rendering of the Slot:
 *    - PersistGate: For rehydrating the store.
 *    - useFonts: For loading custom fonts.
 *
 * 3. To ensure that state and custom fonts are fully loaded before rendering the entire app, we render a Slot here.
 *    The actual rendering of the app is deferred to a layout component one level down in the component hierarchy.
 */
export default function () {
  // Render the Slot component to initiate navigation
  useEffect(() => {
    const handleWheel = (e: any) => {
      if (e.ctrlKey) {
        e.preventDefault(); // Prevent zoom with Ctrl + scroll
      }
    };

    const handleKeyDown = (e: any) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "_")
      ) {
        e.preventDefault(); // Prevent Ctrl + +/- zoom
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return <Slot />;
}
