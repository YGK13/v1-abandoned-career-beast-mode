
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile } from "./useProfileFetch";

export const useAuthInit = (
  setUser: (user: any) => void,
  setSession: (session: any) => void,
  setProfile: (profile: any) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          return;
        }

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Helper function to fetch user profile
    const fetchUserProfile = async (userId: string) => {
      const profileData = await fetchProfile(userId);
      if (profileData) {
        setProfile(profileData);
      }
    };

    // Then check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          console.log("Found existing session");
          setSession(initialSession);
          setUser(initialSession.user);
          
          if (initialSession.user) {
            await fetchUserProfile(initialSession.user.id);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setProfile, setIsLoading]);
};
