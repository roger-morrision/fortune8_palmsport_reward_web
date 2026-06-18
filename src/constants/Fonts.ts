const Fonts = {
  PoppinsLight: require("@/assets/fonts/Poppins-Light.ttf"),
  PoppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
  PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
  PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
  PoppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  PoppinsExtraBold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
  PoppinsBoldItalic: require("@/assets/fonts/Poppins-BoldItalic.ttf"),
  ProximaNovaSemiBold: require("@/assets/fonts/ProximaNova-Semibold.ttf"),
};

export type FontFamily = keyof typeof Fonts;

export default Fonts;
