
import React from "react";
import SSOButton from "./SSOButton";
import { SSOProvider } from "@/utils/linkedInUtils";
import { Separator } from "@/components/ui/separator";

interface SSOOptionsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  providers?: SSOProvider[];
  className?: string;
}

const SSOOptions: React.FC<SSOOptionsProps> = ({
  onSuccess,
  onError,
  providers = ["google", "linkedin", "microsoft", "github", "apple"],
  className,
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {providers.map((provider) => (
        <SSOButton
          key={provider}
          provider={provider}
          onSuccess={onSuccess}
          onError={onError}
        />
      ))}
      
      {providers.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SSOOptions;
