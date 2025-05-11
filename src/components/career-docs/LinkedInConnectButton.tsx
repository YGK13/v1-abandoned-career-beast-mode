
import React from 'react';
import { Button } from "@/components/ui/button";
import { generateLinkedInAuthUrl } from "@/utils/linkedin";
import { Linkedin } from "lucide-react";

interface LinkedInConnectButtonProps {
  className?: string;
}

const LinkedInConnectButton: React.FC<LinkedInConnectButtonProps> = ({ className }) => {
  const handleConnect = () => {
    // Generate LinkedIn OAuth URL and redirect
    const authUrl = generateLinkedInAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <Button 
      onClick={handleConnect}
      className={`bg-[#0A66C2] hover:bg-[#084482] text-white ${className}`}
    >
      <Linkedin className="w-4 h-4 mr-2" />
      Connect LinkedIn Account
    </Button>
  );
};

export default LinkedInConnectButton;
