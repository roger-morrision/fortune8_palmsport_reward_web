import { createContext, useContext, useRef } from "react";
import { ScrollView } from "react-native";

type HomeContextType = {
  scrollRef: React.RefObject<ScrollView | null>;
  sectionY: React.RefObject<Record<string, number>>;
  scrollToSection: (ref: "howItWorks" | "rewards" | "hotDeals") => void;
};

const HomeContext = createContext<HomeContextType>({} as HomeContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const HomeProvider = ({ children }: ProviderProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});

  const scrollToSection = (key: "howItWorks" | "rewards" | "hotDeals") => {
    const y = sectionY.current[key];
    if (y == null || !scrollRef.current) return;

    scrollRef.current.scrollTo({ y, animated: true });
  };

  return (
    <HomeContext.Provider
      value={{
        scrollRef,
        sectionY,
        scrollToSection,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default HomeProvider;
