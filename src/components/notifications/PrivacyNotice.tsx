
import React from "react";
import { Shield } from "lucide-react";

const PrivacyNotice: React.FC = () => {
  return (
    <div className="rounded-md border p-4 bg-muted/30">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <h3 className="font-medium">Privacy Notice</h3>
          <p className="text-sm text-muted-foreground mb-2">
            We value your privacy. Your contact information is only used for sending 
            the career tips you've requested and will never be shared with third parties.
          </p>
          <p className="text-xs text-muted-foreground">
            You can opt out at any time by disabling all notification methods.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
