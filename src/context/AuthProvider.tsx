
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

// Helper function to clear multiple localStorage items
const clearStorageItems = (keys: string[]) => {
  keys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now());

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
      setStorageItem('auth_last_sync', Date.now());
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
    // Function to synchronize state from localStorage
    const syncFromLocalStorage = () => {
      const storedUser = getStorageItem('auth_user');
      const storedSession = getStorageItem('auth_session');
      const storedProfile = getStorageItem('auth_profile');
      const storedLastSync = getStorageItem('auth_last_sync');
      
      // Only update if there's newer data
      if (storedLastSync && storedLastSync > lastSyncTime) {
        console.log("Syncing auth state from localStorage");
        setLastSyncTime(storedLastSync);
        
        if (storedUser !== null) setUser(storedUser);
        if (storedSession !== null) setSession(storedSession);
        if (storedProfile !== null) setProfile(storedProfile);
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth_user' || event.key === 'auth_session' || 
          event.key === 'auth_profile' || event.key === 'auth_last_sync') {
        syncFromLocalStorage();
      }
    };

    // Initial sync
    syncFromLocalStorage();

    // Setup event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Set up periodic sync every 5 seconds
    const syncInterval = setInterval(syncFromLocalStorage, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(syncInterval);
    };
  }, [lastSyncTime]);

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        
        // Handle sign out event
        if (event === 'SIGNED_OUT') {
          console.log("User signed out, clearing auth state");
          setSession(null);
          setUser(null);
          setProfile(null);
          
          // Clear auth-related localStorage data
          clearStorageItems([
            'auth_user', 'auth_session', 'auth_profile', 'auth_session_token',
            'auth_email', 'auth_password', 'auth_confirm_password', 'auth_full_name',
            'auth_current_tab'
          ]);
          
          return;
        }
        
        // Update session and user
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Store sync timestamp
        setStorageItem('auth_last_sync', Date.now());
        setLastSyncTime(Date.now());

        if (currentSession?.user) {
          // Use setTimeout to defer profile fetch to avoid supabase deadlock
          setTimeout(() => {
            fetchProfile(currentSession.user.id).then(profileData => {
              setProfile(profileData);
              setStorageItem('auth_profile', profileData);
            });
          }, 0);
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
          console.log("Found stored session for user:", storedUser?.id);
          setUser(storedUser);
          setSession(storedSession);
          setProfile(storedProfile);
        }
        
        // Then validate with Supabase
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          console.log("Supabase session valid for user:", initialSession?.user?.id);
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          
          if (initialSession?.user) {
            const profileData = await fetchProfile(initialSession.user.id);
            setProfile(profileData);
            setStorageItem('auth_profile', profileData);
          }
          
          setStorageItem('auth_last_sync', Date.now());
          setLastSyncTime(Date.now());
        } else if (storedSession) {
          // Session expired or invalid but we had stored data
          console.log("Stored session invalid, signing out");
          await signOutUser();
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
