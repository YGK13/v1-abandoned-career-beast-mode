
import React from "react";
import { Switch } from "@/components/ui/switch";
import { NotificationMethod as NotificationMethodType } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface NotificationMethodProps {
  method: NotificationMethodType;
  onToggle: (id: string) => void;
}

const NotificationMethod: React.FC<NotificationMethodProps> = ({ method, onToggle }) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="flex items-center justify-between rounded-md border p-4"
    >
      <div className="flex-1">
        <h3 className={`font-medium ${isMobile ? "text-sm" : ""}`}>{method.name}</h3>
        <p className={`text-sm text-muted-foreground ${isMobile ? "text-xs" : ""}`}>{method.description}</p>
      </div>
      <Switch
        checked={method.enabled}
        onCheckedChange={() => onToggle(method.id)}
        className={isMobile ? "scale-90" : ""}
      />
    </div>
  );
};

export default NotificationMethod;
