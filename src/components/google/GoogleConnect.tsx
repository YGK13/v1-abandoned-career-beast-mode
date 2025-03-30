
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import GoogleConnectButton from "@/components/career-docs/GoogleConnectButton";

const GoogleConnect: React.FC = () => {
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
};

export default GoogleConnect;
