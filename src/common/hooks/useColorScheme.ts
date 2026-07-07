// Import necessary modules and functions
import { selectedTheme } from "@/src/store/slices/settings.slice";
import { useColorScheme as _useColorScheme } from "react-native"; // Import the original useColorScheme from react-native
import useAppSelector from "./useAppSelector";

// Define a custom hook for color scheme
export default function useColorScheme() {
  // Retrieve the selected theme from the app's state
  const theme = useAppSelector(selectedTheme);

  // Use the original useColorScheme to get the device's color scheme
  const colorScheme = _useColorScheme() ?? "dark";

  return theme ?? colorScheme;
}
