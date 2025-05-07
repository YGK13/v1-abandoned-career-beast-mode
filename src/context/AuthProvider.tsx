
import React from "react";
import { createContext } from "react";
import { AuthContextType } from "./AuthContextTypes";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { useAuthInit } from "@/hooks/useAuthInit";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    user,
    setUser,
    session,
    setSession,
    profile,
    setProfile,
    isLoading,
    setIsLoading,
  } = useAuthState();

  const { signIn, signUp, signOut } = useAuthMethods();

  // Initialize authentication
  useAuthInit(setUser, setSession, setProfile, setIsLoading);

  const contextValue: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
