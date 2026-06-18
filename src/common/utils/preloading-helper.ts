import { fontAssets } from "@assets/fonts";
import { ImageAssets } from "@assets/images";
import { AnimationAssets } from "@assets/images/animation-assets";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

function cacheImages(assets: any[]) {
  return assets.map((image) => {
    return Asset.fromURI(image).downloadAsync();
  });
}

let loadedAssets = 0;
const totalAssets = ImageAssets.length + AnimationAssets.length + fontAssets.length; // Total number of assets to load

const usePreloadingHelper = () => {
  const [progress, setProgress] = useState(0);
  const updateProgress = () => {
    loadedAssets++;
    setProgress((loadedAssets / totalAssets) * 100);
  };

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const imageAssets = cacheImages(ImageAssets);
        const animationAssets = cacheImages(AnimationAssets);

        await Promise.all([
          ...imageAssets.map((p: any) => p.then(updateProgress)),
          ...animationAssets.map((p: any) => p.then(updateProgress)),
          ...fontAssets.map((p: any) => p.then(updateProgress)),
        ]);
      } catch (error) {
        updateProgress();
      }
    };

    loadAssets();
  }, []);

  return progress;
};

export default usePreloadingHelper;
