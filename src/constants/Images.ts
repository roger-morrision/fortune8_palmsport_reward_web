import { Asset } from "expo-asset";

export const Images = {
  "palmsplay-rewards": require("@/assets/images/palmsplay-rewards.png"),
  "gold": require("@/assets/images/gold.png"),
  "bg-authentication": require("@/assets/images/background/bg-authentication.webp"),
  "bg-referee": require("@/assets/images/background/bg-referee.png"),
  "bg-trophy": require("@/assets/images/background/bg-trophy.png"),
  "fb-logo": require("@/assets/images/background/fb-logo.png"),
  "google-logo": require("@/assets/images/background/google-logo.png"),

  //INBOX
  welcome: require("@/assets/images/inbox/welcome.png"),
  "kyc-verified": require("@/assets/images/inbox/kyc-verified.png"),
  "kyc-failed": require("@/assets/images/inbox/kyc-failed.png"),

  //AUTH
  "button-google": require("@/assets/images/auth/button-google.png"),
  "button-facebook": require("@/assets/images/auth/button-facebook.png"),
  "kyc-icon": require("@/assets/images/auth/kyc-icon.png"),
  "kyc-upload-id": require("@/assets/images/auth/kyc-upload-id.png"),
  "kyc-verification-failed": require("@/assets/images/auth/kyc-verification-failed.png"),
  "kyc-verification-verified": require("@/assets/images/auth/kyc-verification-verified.png"),

  // HOME
  "banner-1": require("@/assets/images/home/banner-1.png"),
  "cash-back": require("@/assets/images/home/cash-back.png"),
  gambly: require("@/assets/images/home/gambly.png"),
  gift: require("@/assets/images/home/gift.png"),
  "how-it-works": require("@/assets/images/home/how-it-works.png"),
  rewards: require("@/assets/images/home/rewards.png"),
  "bitcoin-banner": require("@/assets/images/home/bitcoin-banner.png"),
  "coming-soon": require("@/assets/images/home/coming-soon.png"),
  "sweepscoin-banner": require("@/assets/images/home/sweepscoin-banner.webp"),

  // PRODUCTS
  "product-high-roller": require("@/assets/images/products/product-high-roller.png"),
  "product-cheap-tuesday": require("@/assets/images/products/product-cheap-tuesday.png"),
  "product-starter-pack": require("@/assets/images/products/product-starter-pack.png"),
  "product-tgif": require("@/assets/images/products/product-tgif.png"),
  "product-weekly-booster": require("@/assets/images/products/product-weekly-booster.png"),
  "product-dragon-roller": require("@/assets/images/products/product-dragon-roller.png"),

  //DRAWER
  "drawer-img-1": require("@/assets/images/drawer/img-1.png"),

  //support
  headphone: require("@/assets/images/support/headphone.png"),
  send: require("@/assets/images/support/send.png"),

  //rewards
  "guide-1": require("@/assets/images/rewards/guide-1.png"),
  "guide-2": require("@/assets/images/rewards/guide-2.png"),
  "guide-3": require("@/assets/images/rewards/guide-3.png"),

  // COUNTRIES LOGO
  "en": require("@/assets/images/countries-logo/en.png"),
  "bg": require("@/assets/images/countries-logo/bg.png"),
} as const;

export type ImageKey = keyof typeof Images;

export type NamedAssets = {
  [K in ImageKey]: Asset;
};

// image preloading
const ImageAssets = Object.keys(Images).map((key) => Images[key as ImageKey]);

export default ImageAssets;
