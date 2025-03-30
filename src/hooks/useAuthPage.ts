
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const useAuthPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();
  const [tab, setTab] = useState("signin");
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    if (session) {
      navigate("/");
    }

    // Load the Cloudflare Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Cloudflare Turnstile configuration (replace with your actual site key)
    // Use type assertion (as HTMLElement) to fix the type mismatch
    const turnstileContainer = document.querySelector('.cf-turnstile') as HTMLElement;
    if (turnstileContainer && window.turnstile) {
      window.turnstile.render(turnstileContainer, {
        sitekey: '0x4AAAAAAABI4S10D2f9gYqA',
        theme: 'light'
      });
    }

    return () => {
      // Clean up script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
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
