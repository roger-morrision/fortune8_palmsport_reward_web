import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ContextType = {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
};

const ShopContext = createContext<ContextType>({} as ContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const ShopProvider = ({ children }: ProviderProps) => {
  const [tab, setTab] = useState<string>("coin-shop");

  return <ShopContext.Provider value={{ tab, setTab }}>{children}</ShopContext.Provider>;
};

export const useShopContext = () => useContext(ShopContext);

export default ShopProvider;
