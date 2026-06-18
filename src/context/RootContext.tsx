import Error from "@/src/common/components/modals/error";
import Success from "@/src/common/components/modals/success";
import useAppDispatch from "@/src/common/hooks/useAppDispatch";
import useAppSelector from "@/src/common/hooks/useAppSelector";
import { authActions, selectErrorMessage } from "@/src/store/slices/auth.slice";
import _ from "lodash";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Restricted from "../common/components/modals/restricted";

type ContextType = {
  initiateLobby: boolean;
  setInitiateLobby: Dispatch<SetStateAction<boolean>>;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  handleResetError: () => void;
};

const RootContext = createContext<ContextType>({} as ContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const RootProvider = ({ children }: ProviderProps) => {
  const dispatch = useAppDispatch();
  const [initiateLobby, setInitiateLobby] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const systemError = useAppSelector(selectErrorMessage);

  const handleResetError = useCallback(() => {
    setErrorMessage("");
    dispatch(authActions.setErrorMessage(""));
  }, [systemError]);

  useEffect(() => {
    if (!_.isEmpty(systemError)) {
      setErrorMessage(systemError);
    }
  }, [systemError]);

  return (
    <RootContext.Provider
      value={{
        initiateLobby,
        setInitiateLobby,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        handleResetError,
      }}
    >
      {children}
      <Success />
      <Error />
      <Restricted />
    </RootContext.Provider>
  );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;
