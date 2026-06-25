const Fonts = {
  "Montserrat": require('@/assets/fonts/Montserrat-Regular.ttf'),
  "Montserrat-Light": require('@/assets/fonts/Montserrat-Light.ttf'),
  "Montserrat-Medium": require('@/assets/fonts/Montserrat-Medium.ttf'),
  "Montserrat-Bold": require('@/assets/fonts/Montserrat-Bold.ttf'),
  "Montserrat-Black": require('@/assets/fonts/Montserrat-Black.ttf'),
  "Montserrat-SemiBold": require('@/assets/fonts/Montserrat-SemiBold.ttf'),
  "Montserrat-ExtraBold": require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
};

export type FontFamily = keyof typeof Fonts;

export default Fonts;
