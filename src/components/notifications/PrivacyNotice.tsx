
import React from "react";
import { Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PrivacyNotice: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="rounded-md border p-4 bg-muted/30">
      <div className="flex items-start gap-3">
        <Shield className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-muted-foreground mt-0.5`} />
        <div>
          <h3 className={`font-medium ${isMobile ? "text-sm" : ""}`}>Privacy Notice</h3>
          <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground mb-2`}>
            We value your privacy. Your contact information is only used for sending 
            the career tips you've requested and will never be shared with third parties.
          </p>
          <p className={`${isMobile ? "text-[10px]" : "text-xs"} text-muted-foreground`}>
            You can opt out at any time by disabling all notification methods.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
