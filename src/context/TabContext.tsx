import useAppSelector from "@/src/common/hooks/useAppSelector";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type HomeContextType = {
  openMenuDrawer: boolean;
  setOpenMenuDrawer: Dispatch<SetStateAction<boolean>>;
  openAccountDrawer: boolean;
  setOpenAccountDrawer: Dispatch<SetStateAction<boolean>>;
  openBonusWheel: boolean;
  setOpenBonusWheel: Dispatch<SetStateAction<boolean>>;
  onNavigateRouteFromMenu: (extraFunction: () => void) => void;
  onNavigateRouteFromAccount: (extraFunction: () => void) => void;
};

const TabContext = createContext<HomeContextType>({} as HomeContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const TabProvider = ({ children }: ProviderProps) => {
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);
  const [openMenuDrawer, setOpenMenuDrawer] = useState<boolean>(false);
  const [openAccountDrawer, setOpenAccountDrawer] = useState<boolean>(false);
  const [openBonusWheel, setOpenBonusWheel] = useState<boolean>(false);

  const onNavigateRouteFromMenu = useCallback(
    (extraFunction: any) => {
      extraFunction();
      if (extraFunction && typeof extraFunction === "function") {
        const timeout = setTimeout(() => {
          timeout && clearTimeout(timeout);
          setOpenMenuDrawer(false);
          setOpenAccountDrawer(false);
        }, 200);
      }
    },
    [openMenuDrawer],
  );

  const onNavigateRouteFromAccount = useCallback(
    (extraFunction: any) => {
      extraFunction();
      if (extraFunction && typeof extraFunction === "function") {
        const timeout = setTimeout(() => {
          timeout && clearTimeout(timeout);
          setOpenAccountDrawer(false);
          setOpenMenuDrawer(false);
        }, 200);
      }
    },
    [openAccountDrawer],
  );

  useEffect(() => {
    if (isLoggedIn === false) {
      setOpenMenuDrawer(false);
      setOpenAccountDrawer(false);
      setOpenBonusWheel(false);
    }
  }, [isLoggedIn]);

  return (
    <TabContext.Provider
      value={{
        openMenuDrawer,
        setOpenMenuDrawer,
        openAccountDrawer,
        setOpenAccountDrawer,
        openBonusWheel,
        setOpenBonusWheel,
        onNavigateRouteFromMenu,
        onNavigateRouteFromAccount,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);

export default TabProvider;
