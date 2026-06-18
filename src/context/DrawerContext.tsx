// context/AssetContext.tsx
import { createContext, useContext } from "react";

type ContextType = {
  handleClose: (extraProcess?: () => void) => void;
};

export const DrawerContext = createContext<ContextType>({} as ContextType);

export const useDrawerContext = () => useContext(DrawerContext);
