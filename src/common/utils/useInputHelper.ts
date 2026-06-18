import { useReducer, useCallback } from "react";

// Define types for actions
type Action<T> =
  | { type: "INPUT_CHANGE"; name: keyof T; value: T[keyof T] }
  | { type: "SET_INITIAL"; value: T }
  | { type: "RESET" };

// Generic reducer with dynamic state type
function reducer<T>(state: T, action: Action<T>): T {
  switch (action.type) {
    case "INPUT_CHANGE":
      return { ...state, [action.name]: action.value };
    case "SET_INITIAL":
      return action.value;
    case "RESET":
      return {} as any;
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
}

// Generic hook with inferred type from initialState
export const useInputHelper = <T extends Record<string, any>>(initialState: T) => {
  const [state, dispatch] = useReducer(reducer<T>, initialState);

  const onDispatch = useCallback(
    <K extends keyof T>(name: K) =>
      (value: T[K]) => {
        dispatch({ type: "INPUT_CHANGE", name, value });
      },
    [],
  );

  const onSetInitial = useCallback((value: T) => {
    dispatch({ type: "SET_INITIAL", value });
  }, []);

  const handleFormReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return { state, onDispatch, onSetInitial, handleFormReset };
};
