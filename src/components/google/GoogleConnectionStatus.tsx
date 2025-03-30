
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw } from "lucide-react";

interface GoogleProfileProps {
  profile: any;
  onRefresh: () => void;
  onDisconnect: () => void;
}

const GoogleConnectionStatus: React.FC<GoogleProfileProps> = ({ profile, onRefresh, onDisconnect }) => {
  return (
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
        <Button variant="outline" className="text-destructive" onClick={onDisconnect}>
          Disconnect Account
        </Button>
        <Button onClick={onRefresh} variant="secondary">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoogleConnectionStatus;
