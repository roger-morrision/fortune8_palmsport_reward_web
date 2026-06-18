// import TermsPolicy from '@/src/features/auth/signup/terms-policy';
import _ from "lodash";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ContextType = {
  termsPolicy: string;
  setTermsPolicy: Dispatch<SetStateAction<string>>;
};

const AuthContext = createContext<ContextType>({} as ContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const AuthProvider = ({ children }: ProviderProps) => {
  const [termsPolicy, setTermsPolicy] = useState<string>("");

  return (
    <AuthContext.Provider value={{ termsPolicy, setTermsPolicy }}>
      {children}
      {/* <TermsPolicy page={termsPolicy} onSetPage={setTermsPolicy} /> */}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
