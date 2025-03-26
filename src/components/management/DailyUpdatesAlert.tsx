
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCcw } from "lucide-react";

interface DailyUpdatesAlertProps {
  date: string;
}

const DailyUpdatesAlert: React.FC<DailyUpdatesAlertProps> = ({ date }) => {
  return (
    <Alert className="mb-8">
      <RefreshCcw className="h-4 w-4" />
      <AlertTitle>Daily Updates</AlertTitle>
      <AlertDescription>
        Tips and resources are refreshed daily. Last updated: {date}
      </AlertDescription>
    </Alert>
  );
};

export default DailyUpdatesAlert;
