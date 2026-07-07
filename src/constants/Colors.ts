/**
 * The primary brand color used throughout the application.
 */
export const brandColor = "#FFCF3D";
export const borderColor = "#21366E";
export const closeColor = "#ACB9D2";

/**
 * Colors object that defines the color palette for both light and dark themes.
 *
 * You can add more color tokens to suit your specific use cases like ChatBubbles, Cards etc.
 */
const Colors = {
  light: {
    background: "#F5F5F5",
    backgroundDark: "#FFFFFF",
    primary: "#FFFFFF",
    secondary: "#D3D3D3",
    tertiary: "#202534",
    text: "#000000",
    textDark: "#262626",
    textLabel: "#7F8CA1",
    textGray: "#A3AEAA",
    textOffWhite: "#989898",
    categoryName: "#000000",
    button: brandColor,
    error: "#FF0000",
    success: "#009c4a",
    warning: "#FFA500",
    disabled: "#D3D3D3",
    placeholder: "#98A7B5",
    transparent: "transparent",
    translucent: "rgba(0,0,0,0.5)",
    borderColor,
    closeColor,
    blue: "#3784FF",
    blueMatt: "#36529C",
    blueDark: "#112047",
    blueLight: "#397DFF",
    blueBorder: "#21366A",
    yellow: "#FFDF83",
    yellowThick: "#FBE18A",
    yellowDark: "#F7A60B",
    copper: "#C65918",
    bronze: "#CF7D0C",
    silver: "#8197BB",
    red: "#FF4444",
    gold: "#FFB019",
    goldMatt: "#FAD35E",
    goldFlat: "#EBCD75",
    goldFlatBorder: "#E3AD37",
    green: "#23C339",
    inProgress: "#F79400",
  },
  dark: {
    background: "#000D30",
    backgroundDark: "#070B3A",
    primary: "#03225B",
    secondary: "#0C193A",
    tertiary: "#202534",
    text: "#F5F5F5",
    textDark: "#262626",
    textLabel: "#7F8CA1",
    textGray: "#A3AEAA",
    categoryName: "#9C9CAB",
    button: brandColor,
    error: "#FF0000",
    success: "#009c4a",
    warning: "#FFA500",
    disabled: "#A9A9A9",
    placeholder: "#98A7B5",
    transparent: "transparent",
    translucent: "rgba(0,0,0,0.8)",
    borderColor,
    closeColor,
    blue: "#3784FF",
    blueMatt: "#36529C",
    blueDark: "#112047",
    blueLight: "#397DFF",
    blueBorder: "#21366A",
    yellow: "#FFDF83",
    yellowThick: "#FBE18A",
    yellowDark: "#F7A60B",
    copper: "#C65918",
    bronze: "#CF7D0C",
    silver: "#8197BB",
    red: "#FF4444",
    gold: "#FFB019",
    goldMatt: "#FAD35E",
    goldFlat: "#EBCD75",
    goldFlatBorder: "#E3AD37",
    green: "#23C339",
    inProgress: "#F79400",
  },
};

/**
 * Type alias for color names, allowing easy access to color keys.
 */
export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Export the customizable color palette for use throughout your application.
 */
export default Colors;
