module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "@babel/plugin-proposal-export-namespace-from",

      // 👇 IMPORTANT: Must be last, and NOT in array form
      "react-native-reanimated/plugin",
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};
