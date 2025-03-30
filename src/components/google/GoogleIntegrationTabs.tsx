
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GoogleIntegrationTabs: React.FC = () => {
  return (
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
  );
};

export default GoogleIntegrationTabs;
