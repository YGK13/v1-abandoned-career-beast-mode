
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import GoogleAuthHelper from "@/components/career-docs/GoogleAuthHelper";
import GoogleConnectButton from "@/components/career-docs/GoogleConnectButton";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

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
      // Check if the table exists first
      const { error: tableCheckError } = await supabase
        .from('user_google_profiles')
        .select('id', { count: 'exact', head: true });
      
      if (tableCheckError) {
        // Table doesn't exist yet, just handle as not connected
        setProfile(null);
        setLoading(false);
        return;
      }
      
      // Query the user's Google profile
      const { data, error } = await supabase
        .from('user_google_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
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
      
      const { error } = await supabase
        .from('user_google_profiles')
        .delete()
        .eq('user_id', user.id);
      
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
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-muted-foreground">Checking Google connection...</p>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
              Error Checking Google Connection
            </CardTitle>
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={getUserGoogleProfile}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      );
    }
    
    if (!profile) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Connect Google Account</CardTitle>
            <CardDescription>
              Connect your Google account to access additional features like Gmail integration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground">
                By connecting your Google account, you'll be able to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Access and manage your Gmail messages</li>
                <li>Get personalized content recommendations</li>
                <li>Sync your calendar</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <GoogleConnectButton />
          </CardFooter>
        </Card>
      );
    }
    
    return (
      <div className="space-y-6">
        <Card className="border-success/30">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-success" />
              Google Account Connected
            </CardTitle>
            <CardDescription>
              Your Google account is successfully connected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              {profile.data?.profileUrl && (
                <img 
                  src={profile.data.profileUrl} 
                  alt={profile.full_name} 
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium text-lg">{profile.full_name}</h3>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="text-destructive" onClick={disconnectGoogle}>
              Disconnect Account
            </Button>
            <Button onClick={getUserGoogleProfile} variant="secondary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardFooter>
        </Card>
        
        <Tabs defaultValue="gmail">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="drive">Drive</TabsTrigger>
          </TabsList>
          <TabsContent value="gmail" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Gmail Integration</h3>
            <p className="text-muted-foreground mb-4">
              Access and manage your Gmail messages.
            </p>
            <p className="text-sm p-3 bg-muted rounded-md">
              Coming soon: Full Gmail integration features.
            </p>
          </TabsContent>
          <TabsContent value="calendar" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Calendar Integration</h3>
            <p className="text-muted-foreground mb-4">
              Sync events from your Google Calendar.
            </p>
            <p className="text-sm p-3 bg-muted rounded-md">
              Coming soon: Calendar sync and management.
            </p>
          </TabsContent>
          <TabsContent value="drive" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Google Drive Integration</h3>
            <p className="text-muted-foreground mb-4">
              Access and manage your Google Drive files.
            </p>
            <p className="text-sm p-3 bg-muted rounded-md">
              Coming soon: Google Drive integration features.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  return (
    <Layout>
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 mb-6">
            <h1 className="text-2xl font-bold">Google Integration</h1>
            <p className="text-muted-foreground">
              Connect and manage your Google account integration.
            </p>
          </div>
          
          {renderContent()}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Google;
