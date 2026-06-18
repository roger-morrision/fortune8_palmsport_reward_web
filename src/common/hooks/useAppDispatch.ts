// Import necessary modules and types
import { AppDispatch } from "@/src/store/store";
import { useDispatch } from "react-redux";

// Define the useAppDispatch function, which returns a type-safe app dispatch function
const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
