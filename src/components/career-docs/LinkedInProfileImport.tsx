
import React, { useState } from "react";
import { Linkedin, UserCheck, Upload, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TwoFactorAuth from "@/components/auth/TwoFactorAuth";

const linkedInProfileSchema = z.object({
  profileUrl: z.string().url("Please enter a valid LinkedIn URL").includes("linkedin.com", {
    message: "Please enter a valid LinkedIn URL",
  }),
});

type LinkedInProfileFormValues = z.infer<typeof linkedInProfileSchema>;

const LinkedInProfileImport: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImportComplete, setIsImportComplete] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const { toast } = useToast();

  const form = useForm<LinkedInProfileFormValues>({
    resolver: zodResolver(linkedInProfileSchema),
    defaultValues: {
      profileUrl: "",
    },
  });

  const simulateImportProcess = () => {
    setIsImporting(true);
    setImportProgress(0);
    
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsImporting(false);
            // After import is complete, show 2FA dialog
            setShow2FADialog(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 700);
  };

  const onConnectSubmit = (data: LinkedInProfileFormValues) => {
    // In a real implementation, this would initiate OAuth with LinkedIn
    // For now, we'll simulate the process
    console.log("Connecting with LinkedIn profile:", data.profileUrl);
    simulateImportProcess();
    setShowConnectDialog(false);
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
    form.reset();
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
          <div className="space-y-3 py-4">
            <div className="flex justify-between text-sm">
              <span>Importing profile data...</span>
              <span className="font-medium">{importProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0a66c2] transition-all duration-300 ease-out" 
                style={{ width: `${importProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground animate-pulse">
              Please wait while we analyze and import your profile data...
            </p>
          </div>
        ) : isImportComplete ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950/20 dark:border-green-800/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UserCheck size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h5 className="font-medium">LinkedIn Profile Connected</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Your profile has been imported and analyzed.
                </p>
                <ul className="mt-2 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                    </span>
                    <span>Professional headline imported</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                    </span>
                    <span>Work experience data imported (5 positions)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                    </span>
                    <span>Skills imported (12 skills)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                    </span>
                    <span>Education history imported</span>
                  </li>
                  {isSecured && (
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield size={12} className="text-green-600 dark:text-green-400" />
                        <span>Account secured with 2FA</span>
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleResetDemo} className="flex items-center gap-1">
                <RefreshCw size={14} /> Reset Demo
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/40 transition-colors">
            <Upload size={36} className="text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">Connect with LinkedIn</h4>
            <p className="text-center text-sm text-muted-foreground mb-6 max-w-md">
              Fast-track your onboarding by importing your professional profile, skills, and work history directly from LinkedIn.
            </p>
            <Button 
              variant="default" 
              className="bg-[#0a66c2] hover:bg-[#0a66c2]/90"
              onClick={handleConnectClick}
            >
              <Linkedin className="mr-2 h-4 w-4" /> Connect with LinkedIn
            </Button>
          </div>
        )}

        <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect LinkedIn Profile</DialogTitle>
              <DialogDescription>
                Enter your LinkedIn profile URL to connect and import your profile data.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onConnectSubmit)} className="space-y-4 py-2">
                <FormField
                  control={form.control}
                  name="profileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://www.linkedin.com/in/yourprofile" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        We'll use this to retrieve your professional information
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-4">
                  <Button type="button" variant="outline" onClick={() => setShowConnectDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Linkedin className="mr-2 h-4 w-4" /> Connect
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

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
