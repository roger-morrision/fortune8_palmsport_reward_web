import { Asset } from "expo-asset";

const audio = {
  // "lobby-sound": require("@/assets/audio/lobby-sound.mp3"),
} as const;

export type AudioKey = keyof typeof audio;

export type NamedAssets = {
  [K in AudioKey]: Asset;
};

// image preloading
export const audioAssets = Object.keys(audio).map((key) =>
  Asset.fromModule(audio[key as AudioKey]).downloadAsync(),
);

export default audio;
