
import React from "react";
import { Separator } from "@/components/ui/separator";
import SSOButton from "@/components/auth/SSOButton";

interface SSOOptionsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const SSOOptions: React.FC<SSOOptionsProps> = ({
  onSuccess,
  onError,
  className,
}) => {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="flex items-center gap-2 my-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      
      <div className="space-y-2">
        <SSOButton 
          provider="google" 
          onSuccess={onSuccess}
          onError={onError}
        />
        <SSOButton 
          provider="linkedin" 
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default SSOOptions;
