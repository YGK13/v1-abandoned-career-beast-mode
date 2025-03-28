
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotificationMethod as NotificationMethodType, TimePreference } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Clock } from "lucide-react";

interface NotificationMethodProps {
  method: NotificationMethodType;
  onToggle: (id: string) => void;
  onTimeChange: (id: string, time: TimePreference) => void;
}

const timeOptions = [
  { value: "morning", label: "Morning (8:00 AM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM)" },
  { value: "evening", label: "Evening (6:00 PM)" },
];

const NotificationMethod: React.FC<NotificationMethodProps> = ({ 
  method, 
  onToggle,
  onTimeChange
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="flex flex-col rounded-md border p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
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
      
      {method.enabled && (
        <div className={`flex items-center gap-2 ${isMobile ? "flex-col items-start" : ""}`}>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Delivery time:</span>
          </div>
          <Select
            value={method.timePreference}
            onValueChange={(value: TimePreference) => onTimeChange(method.id, value)}
            disabled={!method.enabled}
          >
            <SelectTrigger className={`w-[180px] h-8 text-sm ${isMobile ? "w-full" : ""}`}>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default NotificationMethod;
