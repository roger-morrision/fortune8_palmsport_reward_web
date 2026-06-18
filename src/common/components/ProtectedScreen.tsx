import useAppSelector from "@/src/common/hooks/useAppSelector";
import { useRootContext } from "@/src/context/RootContext";
import { selectAuthLoggedIn } from "@/src/store/slices/auth.slice";
import { Redirect } from "expo-router";
import React from "react";

interface ProtectedScreenProps {
  children: React.ReactNode;
}

export default function ProtectedScreen({ children }: ProtectedScreenProps) {
  const { initiateLobby } = useRootContext();
  const isLoggedIn = useAppSelector(selectAuthLoggedIn);

  if (!isLoggedIn || !initiateLobby) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}
