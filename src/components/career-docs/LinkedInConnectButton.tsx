
import React from "react";
import { Linkedin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import SSOOptions from "../auth/SSOOptions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

interface LinkedInConnectButtonProps {
  onClick: () => void;
}

const LinkedInConnectButton: React.FC<LinkedInConnectButtonProps> = ({ onClick }) => {
  const [showLoginOptions, setShowLoginOptions] = React.useState(false);
  
  const handleSSOSuccess = () => {
    setShowLoginOptions(false);
    onClick();
  };

  return (
    <>
      <div className="flex flex-col items-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/40 transition-colors">
        <Upload size={36} className="text-muted-foreground mb-4" />
        <h4 className="text-lg font-medium mb-2">Connect with LinkedIn</h4>
        <p className="text-center text-sm text-muted-foreground mb-6 max-w-md">
          Fast-track your onboarding by importing your professional profile, skills, and work history directly from LinkedIn.
        </p>
        <div className="flex flex-col space-y-3 w-full max-w-xs">
          <Button 
            variant="default" 
            className="bg-[#0a66c2] hover:bg-[#0a66c2]/90"
            onClick={() => setShowLoginOptions(true)}
          >
            <Linkedin className="mr-2 h-4 w-4" /> Connect with LinkedIn
          </Button>
          
          <Dialog open={showLoginOptions} onOpenChange={setShowLoginOptions}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect with your account</DialogTitle>
                <DialogDescription>
                  Choose your preferred sign-in method to import your professional profile
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <SSOOptions 
                  providers={["linkedin", "google", "microsoft", "github"]} 
                  onSuccess={handleSSOSuccess}
                />
              </div>
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            onClick={() => setShowLoginOptions(true)}
          >
            Connect with other platforms
          </Button>
        </div>
      </div>
    </>
  );
};

export default LinkedInConnectButton;
