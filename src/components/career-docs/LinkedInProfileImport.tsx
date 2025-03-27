
import React, { useState } from "react";
import { Linkedin } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { useToast } from "@/hooks/use-toast";
import TwoFactorAuth from "@/components/auth/TwoFactorAuth";
import { simulateImportProcess } from "@/utils/linkedInUtils";
import LinkedInConnectDialog from "./LinkedInConnectDialog";
import LinkedInImportProgress from "./LinkedInImportProgress";
import LinkedInImportComplete from "./LinkedInImportComplete";
import LinkedInConnectButton from "./LinkedInConnectButton";

const LinkedInProfileImport: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImportComplete, setIsImportComplete] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const { toast } = useToast();

  const handleImportStart = () => {
    simulateImportProcess(
      setIsImporting,
      setImportProgress,
      () => setShow2FADialog(true)
    );
  };

  const handle2FAComplete = () => {
    setShow2FADialog(false);
    setIsSecured(true);
    setIsImportComplete(true);
    toast({
      title: "Profile Imported and Secured",
      description: "Your LinkedIn profile data has been imported and your account is now secured with 2FA.",
    });
  };

  const handleConnectClick = () => {
    setShowConnectDialog(true);
  };

  const handleResetDemo = () => {
    setIsImportComplete(false);
    setImportProgress(0);
    setIsImporting(false);
    setIsSecured(false);
  };

  return (
    <DashboardCard className="mb-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0a66c2]/20 flex items-center justify-center">
            <Linkedin size={24} className="text-[#0a66c2]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Import Your LinkedIn Profile</h3>
            <p className="text-sm text-muted-foreground">
              Fast-track your profile setup by importing data from LinkedIn
            </p>
          </div>
        </div>

        {isImporting ? (
          <LinkedInImportProgress importProgress={importProgress} />
        ) : isImportComplete ? (
          <LinkedInImportComplete 
            isSecured={isSecured} 
            onReset={handleResetDemo} 
          />
        ) : (
          <LinkedInConnectButton onClick={handleConnectClick} />
        )}

        {/* LinkedIn Connect Dialog */}
        <LinkedInConnectDialog 
          open={showConnectDialog}
          onOpenChange={setShowConnectDialog}
          onImportStart={handleImportStart}
        />

        {/* Two-Factor Authentication Dialog */}
        <TwoFactorAuth 
          open={show2FADialog}
          onClose={() => setShow2FADialog(false)}
          onComplete={handle2FAComplete}
          email="your.email@example.com"
        />
      </div>
    </DashboardCard>
  );
};

export default LinkedInProfileImport;
