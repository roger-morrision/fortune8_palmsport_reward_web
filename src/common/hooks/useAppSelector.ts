// Import necessary modules and types
import { RootState } from "@/src/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Define the useAppSelector function, a typed selector hook for accessing the Redux store state
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
