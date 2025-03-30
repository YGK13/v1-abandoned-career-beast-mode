
import { supabase } from "@/integrations/supabase/client";

// Type definitions for the LinkedIn profile
export interface LinkedInProfile {
  id: string;
  user_id: string;
  linkedin_id: string;
  full_name?: string;
  email?: string;
  profile_url?: string;
  data?: any;
  created_at: string;
  updated_at: string;
}

// Function to get the current user's LinkedIn profile
export const getUserLinkedInProfile = async (): Promise<LinkedInProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_linkedin_profiles' as any)
      .select('*')
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        return null;
      }
      throw error;
    }
    
    return data as LinkedInProfile;
  } catch (err) {
    console.error("Error fetching LinkedIn profile:", err);
    return null;
  }
};

// Function to check if the user has connected their LinkedIn profile
export const hasLinkedInProfile = async (): Promise<boolean> => {
  try {
    const profile = await getUserLinkedInProfile();
    return profile !== null;
  } catch (error) {
    console.error("Error checking LinkedIn profile:", error);
    return false;
  }
};
