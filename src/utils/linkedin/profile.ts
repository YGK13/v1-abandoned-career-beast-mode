
import { supabase } from "@/integrations/supabase/client";

// Save LinkedIn profile to Supabase
export const saveLinkedInProfile = async (profile: any, userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_linkedin_profiles")
      .upsert({
        user_id: userId,
        linkedin_id: profile.id,
        full_name: profile.fullName,
        email: profile.email,
        profile_url: profile.profileUrl,
        data: profile,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving LinkedIn profile:", error);
    throw error;
  }
};

// Get LinkedIn profile data for a user
export const getLinkedInProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_linkedin_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    return null;
  }
};

// Disconnect LinkedIn profile
export const disconnectLinkedInProfile = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("user_linkedin_profiles")
      .delete()
      .eq("user_id", userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error disconnecting LinkedIn profile:", error);
    throw error;
  }
};
