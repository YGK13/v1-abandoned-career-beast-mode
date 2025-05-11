import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import PageContainer from "@/components/layout/PageContainer";
import { useAuth } from "@/context/AuthContext";
import LinkedInAuthHelper from "@/components/career-docs/LinkedInAuthHelper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, LinkedinIcon } from "lucide-react";
import { getLinkedInProfile, disconnectLinkedInProfile } from "@/utils/linkedin";

const LinkedIn: React.FC = () => {
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
      getUserLinkedInProfile();
    }
  }, [user, isCallback]);
  
  const getUserLinkedInProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getLinkedInProfile(user.id);
      setProfile(data);
    } catch (err: any) {
      console.error("Error in getUserLinkedInProfile:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  const disconnectLinkedIn = async () => {
    if (!user || !profile) return;
    
    try {
      setLoading(true);
      await disconnectLinkedInProfile(user.id);
      setProfile(null);
    } catch (err: any) {
      console.error("Error disconnecting LinkedIn:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleConnectLinkedIn = () => {
    window.location.href = `${window.location.origin}/linkedin/connect`;
  };
  
  const renderContent = () => {
    if (isCallback) {
      return <LinkedInAuthHelper />;
    }
    
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (error) {
      return (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={getUserLinkedInProfile}>Retry</Button>
        </Card>
      );
    }
    
    if (!profile) {
      return (
        <Card className="p-6">
          <div className="text-center space-y-4 py-6">
            <LinkedinIcon className="h-12 w-12 mx-auto text-[#0A66C2]" />
            <h2 className="text-2xl font-bold">Connect LinkedIn</h2>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Connect your LinkedIn account to import your profile information and enhance your Career Beast Mode experience.
            </p>
            <Button onClick={handleConnectLinkedIn} className="bg-[#0A66C2] hover:bg-[#084482]">
              Connect LinkedIn Account
            </Button>
          </div>
        </Card>
      );
    }
    
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <LinkedinIcon className="h-8 w-8 mr-3 text-[#0A66C2]" />
            <div>
              <h2 className="text-xl font-bold">{profile.full_name || 'LinkedIn User'}</h2>
              <p className="text-sm text-muted-foreground">{profile.email || ''}</p>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
            <span className="text-sm font-medium">Connected</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-muted-foreground">Profile URL:</span>
            <a 
              href={profile.profile_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {profile.profile_url}
            </a>
            <span className="text-muted-foreground">Connected on:</span>
            <span>{new Date(profile.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <Button 
            variant="outline" 
            onClick={disconnectLinkedIn} 
            className="text-destructive hover:text-destructive border-destructive hover:bg-destructive/10"
          >
            Disconnect Account
          </Button>
        </div>
      </Card>
    );
  };
  
  return (
    <Layout>
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">LinkedIn Integration</h1>
            <p className="text-muted-foreground">
              Connect and manage your LinkedIn account integration.
            </p>
          </div>
          {renderContent()}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default LinkedIn;
