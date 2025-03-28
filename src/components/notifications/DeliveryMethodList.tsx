
import React from "react";
import { NotificationMethod as NotificationMethodType } from "./types";
import NotificationMethod from "./NotificationMethod";
import PrivacyNotice from "./PrivacyNotice";

interface DeliveryMethodListProps {
  methods: NotificationMethodType[];
  onToggle: (id: string) => void;
}

const DeliveryMethodList: React.FC<DeliveryMethodListProps> = ({ methods, onToggle }) => {
  return (
    <div className="space-y-4">
      {methods.map(method => (
        <NotificationMethod
          key={method.id}
          method={method}
          onToggle={() => onToggle(method.id)}
        />
      ))}
      
      <PrivacyNotice />
    </div>
  );
};

export default DeliveryMethodList;
