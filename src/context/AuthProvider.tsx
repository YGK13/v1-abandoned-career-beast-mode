
import React, { createContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "./AuthContextTypes";
import { fetchProfile, signInWithEmail, signUpWithEmail, signOutUser } from "@/utils/authUtils";

// Create the context with undefined as initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to safely get data from localStorage
const getStorageItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

// Helper function to safely save data to localStorage
const setStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update localStorage whenever user, session or profile changes
  useEffect(() => {
    if (user) {
      setStorageItem('auth_user', user);
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (session) {
      setStorageItem('auth_session', session);
    } else {
      localStorage.removeItem('auth_session');
    }
  }, [session]);

  useEffect(() => {
    if (profile) {
      setStorageItem('auth_profile', profile);
    } else {
      localStorage.removeItem('auth_profile');
    }
  }, [profile]);

  // Handle storage events to sync state across tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth_user') {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      } else if (event.key === 'auth_session') {
        setSession(event.newValue ? JSON.parse(event.newValue) : null);
      } else if (event.key === 'auth_profile') {
        setProfile(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Use setTimeout to defer profile fetch to avoid supabase deadlock
          setTimeout(() => {
            fetchProfile(currentSession.user.id).then(profileData => {
              setProfile(profileData);
            });
          }, 0);
        } else {
          setProfile(null);
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        console.log("Checking for existing session...");
        
        // First try to get from localStorage for faster initial load
        const storedUser = getStorageItem('auth_user');
        const storedSession = getStorageItem('auth_session');
        const storedProfile = getStorageItem('auth_profile');
        
        if (storedUser && storedSession) {
          setUser(storedUser);
          setSession(storedSession);
          setProfile(storedProfile);
        }
        
        // Then validate with Supabase
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session:", initialSession?.user?.id);
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          const profileData = await fetchProfile(initialSession.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auth methods
  const signIn = (email: string, password: string) => {
    return signInWithEmail(email, password);
  };

  const signUp = (email: string, password: string, userData?: any) => {
    return signUpWithEmail(email, password, userData);
  };

  const signOut = async () => {
    await signOutUser();
  };

  // Create auth context value
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
