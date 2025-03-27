
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Linkedin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { linkedInProfileSchema, LinkedInProfileFormValues, simulateImportProcess } from "@/utils/linkedInUtils";

interface LinkedInConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportStart: () => void;
}

const LinkedInConnectDialog: React.FC<LinkedInConnectDialogProps> = ({
  open,
  onOpenChange,
  onImportStart
}) => {
  const form = useForm<LinkedInProfileFormValues>({
    resolver: zodResolver(linkedInProfileSchema),
    defaultValues: {
      profileUrl: "",
    },
  });

  const onConnectSubmit = (data: LinkedInProfileFormValues) => {
    // In a real implementation, this would initiate OAuth with LinkedIn
    console.log("Connecting with LinkedIn profile:", data.profileUrl);
    onImportStart();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
  );
};

export default LinkedInConnectDialog;
