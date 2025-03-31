
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSSOAuth } from "@/hooks/useSSOAuth";
import { SSOProvider, getSSOproviderInfo } from "@/utils/linkedInUtils";

interface SSOButtonProps {
  provider: SSOProvider;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({ provider, onSuccess, onError }) => {
  const { icon: Icon, color, label } = getSSOproviderInfo(provider);
  const { isLoading, handleSignIn } = useSSOAuth({
    provider,
    onSuccess,
    onError,
  });

  const onClick = async () => {
    try {
      // No need for captcha, proceed with OAuth
      await handleSignIn();
    } catch (error) {
      console.error("Error during OAuth flow:", error);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={onClick}
      disabled={isLoading}
      style={{ backgroundColor: color }}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Icon className="h-4 w-4 mr-2" />
      )}
      {label}
    </Button>
  );
};

export default SSOButton;
