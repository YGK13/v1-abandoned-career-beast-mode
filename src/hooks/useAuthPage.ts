
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSyncState } from "@/hooks/use-sync-state";

export const useAuthPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();
  const [tab, setTab] = useSyncState("auth_current_tab", "signin");
  
  // Form state - using sync state to ensure it persists across views
  const [email, setEmail] = useSyncState("auth_email", "");
  const [password, setPassword] = useSyncState("auth_password", "");
  const [confirmPassword, setConfirmPassword] = useSyncState("auth_confirm_password", "");
  const [fullName, setFullName] = useSyncState("auth_full_name", "");

  useEffect(() => {
    // Redirect if already logged in
    if (session) {
      console.log("User already logged in, redirecting to home");
      navigate("/");
    }
  }, [session, navigate]);

  return {
    isLoading,
    tab,
    setTab,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fullName,
    setFullName,
    navigate
  };
};
