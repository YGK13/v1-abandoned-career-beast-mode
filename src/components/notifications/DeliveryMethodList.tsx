
import React from "react";
import { NotificationMethod as NotificationMethodType, TimePreference } from "./types";
import NotificationMethod from "./NotificationMethod";
import PrivacyNotice from "./PrivacyNotice";

interface DeliveryMethodListProps {
  methods: NotificationMethodType[];
  onToggle: (id: string) => void;
  onTimeChange: (id: string, time: TimePreference) => void;
}

const DeliveryMethodList: React.FC<DeliveryMethodListProps> = ({ 
  methods, 
  onToggle,
  onTimeChange
}) => {
  return (
    <div className="space-y-4">
      {methods.map(method => (
        <NotificationMethod
          key={method.id}
          method={method}
          onToggle={() => onToggle(method.id)}
          onTimeChange={onTimeChange}
        />
      ))}
      
      <PrivacyNotice />
    </div>
  );
};

export default DeliveryMethodList;
