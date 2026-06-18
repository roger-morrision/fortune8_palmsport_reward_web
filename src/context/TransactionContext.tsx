import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import useAppSelector from "../common/hooks/useAppSelector";
import { TRANSACTIONSTYPES } from "../constants/Objects";
import { selectedUserUserID } from "../store/slices/user.slice";
import { RedeemService } from "../api/services/redeem.service";
import { useQueryApi } from "../common/hooks/useQueryApi";

type TransactionContextType = {
  loading: boolean;
  transactions: any;
  category: TRANSACTIONSTYPES;
  setCategory: Dispatch<SetStateAction<TRANSACTIONSTYPES>>;
};

const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType);

export interface ProviderProps {
  children: React.ReactElement;
}

const TransactionProvider = ({ children }: ProviderProps) => {
  const userId = useAppSelector(selectedUserUserID);
  const [category, setCategory] = useState<TRANSACTIONSTYPES>({
    title: "All",
    redeemStatusID: 0,
  });

  const { data, isPending, refetch } = useQueryApi(
    ["redeem-transactions", { userId, redeemStatusIDs: category.redeemStatusID }],
    RedeemService.transactions,
    {
      userID: userId,
      sort: "lastUpdatedTime,desc",
      page: 1,
      size: 50,
      ...(category.redeemStatusID !== 0 && {
        redeemStatusIDs: category.redeemStatusID,
      }),
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <TransactionContext.Provider
      value={{
        loading: isPending,
        transactions: data?.items ?? [],
        category,
        setCategory,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);

export default TransactionProvider;
