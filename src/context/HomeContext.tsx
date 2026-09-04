import { createContext, useContext, useRef } from "react";
import { ScrollView } from "react-native";

export type HomeSection =
  | "howItWorks"
  | "rewards"
  | "hotDeals"
  | "home"
  | "benefits"
  | "tiers"
  | "faq"
  | "raffle";

type HomeContextType = {
  scrollRef: React.RefObject<ScrollView | null>;
  sectionY: React.RefObject<Record<string, number>>;
  scrollToSection: (ref: HomeSection) => void;
  pendingSection: React.RefObject<HomeSection | null>;
};

const HomeContext = createContext<HomeContextType>({} as HomeContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const HomeProvider = ({ children }: ProviderProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const pendingSection = useRef<HomeSection | null>(null);

  const scrollToSection = (key: HomeSection) => {
    if (key === "home") {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }
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
        pendingSection,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default HomeProvider;
