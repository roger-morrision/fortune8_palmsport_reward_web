// context/AssetContext.tsx
import { NamedAssets } from "@/src/constants/Images";
import { createContext, useContext } from "react";

type AssetContextType = {
  images: NamedAssets | null;
};

export const AssetContext = createContext<AssetContextType>({ images: null });

export const useAssetContext = () => useContext(AssetContext);
