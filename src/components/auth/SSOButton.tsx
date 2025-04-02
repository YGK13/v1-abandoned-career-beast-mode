
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSSOAuth } from "@/hooks/useSSOAuth";
import { SSOProvider } from "@/utils/linkedInUtils";
import { getProviderConfig } from "@/components/auth/SSOProviderConfig";

interface SSOButtonProps {
  provider: SSOProvider;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({ provider, onSuccess, onError }) => {
  const providerConfig = getProviderConfig(provider);
  const { isLoading, handleSignIn } = useSSOAuth({
    provider,
    onSuccess,
    onError,
  });

  const onClick = async () => {
    try {
      console.log(`Initiating ${provider} OAuth flow`);
      await handleSignIn();
    } catch (error) {
      console.error(`Error during ${provider} OAuth flow:`, error);
    }
  };

  return (
    <Button
      variant="outline"
      className={`w-full ${providerConfig.className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        providerConfig.icon
      )}
      {providerConfig.label}
    </Button>
  );
};

export default SSOButton;
