
import React from "react";
import { Switch } from "@/components/ui/switch";
import { NotificationMethod as NotificationMethodType } from "./types";

interface NotificationMethodProps {
  method: NotificationMethodType;
  onToggle: (id: string) => void;
}

const NotificationMethod: React.FC<NotificationMethodProps> = ({ method, onToggle }) => {
  return (
    <div 
      className="flex items-center justify-between rounded-md border p-4"
    >
      <div className="flex-1">
        <h3 className="font-medium">{method.name}</h3>
        <p className="text-sm text-muted-foreground">{method.description}</p>
      </div>
      <Switch
        checked={method.enabled}
        onCheckedChange={() => onToggle(method.id)}
      />
    </div>
  );
};

export default NotificationMethod;
