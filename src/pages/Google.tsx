
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import GoogleAuthHelper from "@/components/career-docs/GoogleAuthHelper";
import GooglePageHeader from "@/components/google/GooglePageHeader";
import GoogleConnect from "@/components/google/GoogleConnect";
import GoogleConnectionStatus from "@/components/google/GoogleConnectionStatus";
import GoogleIntegrationTabs from "@/components/google/GoogleIntegrationTabs";
import GoogleLoadingState from "@/components/google/GoogleLoadingState";
import GoogleErrorState from "@/components/google/GoogleErrorState";

const Google: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isCallback = location.pathname.includes("/callback");
  
  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    
    if (!isCallback) {
      getUserGoogleProfile();
    }
  }, [user, isCallback]);
  
  const getUserGoogleProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Using type assertion to work around the TypeScript error
      const { data, error } = await (supabase
        .from('user_google_profiles' as any)
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle() as any);
      
      if (error) {
        console.error("Error fetching Google profile:", error);
        setError("Failed to fetch Google profile: " + error.message);
      } else {
        console.log("Fetched Google profile:", data);
        setProfile(data);
      }
    } catch (err: any) {
      console.error("Error in getUserGoogleProfile:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  const disconnectGoogle = async () => {
    if (!user || !profile) return;
    
    try {
      setLoading(true);
      
      const { error } = await (supabase
        .from('user_google_profiles' as any)
        .delete()
        .eq('user_id', user.id) as any);
      
      if (error) {
        throw new Error("Failed to disconnect Google account: " + error.message);
      }
      
      setProfile(null);
    } catch (err: any) {
      console.error("Error disconnecting Google:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const renderContent = () => {
    if (isCallback) {
      return <GoogleAuthHelper />;
    }
    
    if (loading) {
      return <GoogleLoadingState />;
    }
    
    if (error) {
      return <GoogleErrorState error={error} onRetry={getUserGoogleProfile} />;
    }
    
    if (!profile) {
      return <GoogleConnect />;
    }
    
    return (
      <div className="space-y-6">
        <GoogleConnectionStatus 
          profile={profile} 
          onRefresh={getUserGoogleProfile} 
          onDisconnect={disconnectGoogle} 
        />
        <GoogleIntegrationTabs />
      </div>
    );
  };
  
  return (
    <Layout>
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <GooglePageHeader />
          {renderContent()}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Google;
