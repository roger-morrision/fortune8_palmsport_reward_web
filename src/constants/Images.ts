import { Asset } from "expo-asset";

export const Images = {
  "palmsplay-rewards": require("@/assets/images/palmsplay-rewards.png"),
  "g-logo": require("@/assets/images/g-logo.png"),
  "floating-bg": require("@/assets/images/floating-bg.png"),
  "gold-earning": require("@/assets/images/gold-earning.png"),
  "restrict-bg": require("@/assets/images/restrict-bg.png"),

  //INBOX
  "cheapy-tuesday": require("@/assets/images/inbox/cheapy-tuesday.png"),
  welcome: require("@/assets/images/inbox/welcome.png"),
  "silver-1": require("@/assets/images/inbox/silver-1.png"),
  "silver-2": require("@/assets/images/inbox/silver-2.png"),
  "silver-3": require("@/assets/images/inbox/silver-3.png"),
  "gold-1": require("@/assets/images/inbox/gold-1.png"),
  "gold-2": require("@/assets/images/inbox/gold-2.png"),
  "gold-3": require("@/assets/images/inbox/gold-3.png"),
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
  lock: require("@/assets/images/home/lock.png"),
  "top-game": require("@/assets/images/home/top-game.png"),
  "new-game": require("@/assets/images/home/new-game.png"),

  "cash-back": require("@/assets/images/home/cash-back.png"),
  gambly: require("@/assets/images/home/gambly.png"),
  gift: require("@/assets/images/home/gift.png"),
  "how-it-works": require("@/assets/images/home/how-it-works.png"),
  rewards: require("@/assets/images/home/rewards.png"),
  "bitcoin-banner": require("@/assets/images/home/bitcoin-banner.png"),
  "coming-soon": require("@/assets/images/home/coming-soon.png"),
  "sweepscoin-banner": require("@/assets/images/home/sweepscoin-banner.webp"),

  // MENU
  "coin-shop": require("@/assets/images/menu/coin-shop.png"),
  "free-coin": require("@/assets/images/menu/free-coin.png"),
  "hot-deals": require("@/assets/images/menu/hot-deals.png"),
  "piggy-bank": require("@/assets/images/menu/piggy-bank.png"),
  "weekly-mission": require("@/assets/images/menu/weekly-mission.png"),
  "weekly-ranking": require("@/assets/images/menu/weekly-ranking.png"),
  "wheel-bonus": require("@/assets/images/menu/wheel-bonus.png"),

  // SHOP
  best: require("@/assets/images/shop/best.png"),
  "package-0": require("@/assets/images/shop/package-0.png"),
  "package-1": require("@/assets/images/shop/package-1.png"),
  "package-2": require("@/assets/images/shop/package-2.png"),
  "package-3": require("@/assets/images/shop/package-3.png"),
  "package-4": require("@/assets/images/shop/package-4.png"),
  "package-5": require("@/assets/images/shop/package-5.png"),
  "package-gold-2": require("@/assets/images/shop/package-gold-2.png"),
  "package-gold-3": require("@/assets/images/shop/package-gold-3.png"),
  "package-gold-4": require("@/assets/images/shop/package-gold-4.png"),
  "package-gold-5": require("@/assets/images/shop/package-gold-5.png"),
  "package-gold-6": require("@/assets/images/shop/package-gold-6.png"),

  // PRODUCTS
  "product-high-roller": require("@/assets/images/products/product-high-roller.png"),
  "product-cheap-tuesday": require("@/assets/images/products/product-cheap-tuesday.png"),
  "product-starter-pack": require("@/assets/images/products/product-starter-pack.png"),
  "product-tgif": require("@/assets/images/products/product-tgif.png"),
  "product-weekly-booster": require("@/assets/images/products/product-weekly-booster.png"),
  "product-dragon-roller": require("@/assets/images/products/product-dragon-roller.png"),
  "product-piggy-bank": require("@/assets/images/products/product-piggy-bank.png"),

  // PROMOTIONS
  "fan-bonus": require("@/assets/images/promotions/fan-bonus.png"),
  "claimed-bonus": require("@/assets/images/promotions/claimed-bonus.png"),
  "expired-link": require("@/assets/images/promotions/expired-link.png"),

  // MISSION
  "target-0": require("@/assets/images/mission/target-0.png"),
  "target-1": require("@/assets/images/mission/target-1.png"),
  "target-all": require("@/assets/images/mission/target-all.png"),

  //DRAWER
  "drawer-img-1": require("@/assets/images/drawer/img-1.png"),

  //SOCIAL MEDIA
  ic_instagram: require("@/assets/images/social/ic_instagram.png"),
  ic_facebook: require("@/assets/images/social/ic_facebook.png"),
  ic_youtube: require("@/assets/images/social/ic_youtube.png"),
  ic_indeed: require("@/assets/images/social/ic_indeed.png"),

  //support
  headphone: require("@/assets/images/support/headphone.png"),
  send: require("@/assets/images/support/send.png"),

  //rewards
  "guide-1": require("@/assets/images/rewards/guide-1.png"),
  "guide-2": require("@/assets/images/rewards/guide-2.png"),
  "guide-3": require("@/assets/images/rewards/guide-3.png"),
} as const;

export type ImageKey = keyof typeof Images;

export type NamedAssets = {
  [K in ImageKey]: Asset;
};

// image preloading
const ImageAssets = Object.keys(Images).map((key) => Images[key as ImageKey]);

export default ImageAssets;
