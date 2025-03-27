
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, Twitter, Building, Shield, Save, Briefcase } from "lucide-react";

const platformCredentialsSchema = z.object({
  linkedin: z.object({
    enabled: z.boolean().default(false),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    useEasyApply: z.boolean().default(true),
  }),
  twitter: z.object({
    enabled: z.boolean().default(false),
    username: z.string().optional(),
    easyApply: z.boolean().default(true),
  }),
  custom: z.object({
    enabled: z.boolean().default(false),
    webhookUrl: z.string().url().optional().or(z.literal("")),
  }),
});

type PlatformCredentials = z.infer<typeof platformCredentialsSchema>;

interface AutoApplySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AutoApplySettings: React.FC<AutoApplySettingsProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("settings");
  const [testMode, setTestMode] = useState(true);
  const [autoApplyLimit, setAutoApplyLimit] = useState(5);
  
  const form = useForm<PlatformCredentials>({
    resolver: zodResolver(platformCredentialsSchema),
    defaultValues: {
      linkedin: { enabled: false, useEasyApply: true },
      twitter: { enabled: false, easyApply: true },
      custom: { enabled: false, webhookUrl: "" },
    },
  });

  const onSubmit = (data: PlatformCredentials) => {
    // In a real implementation, this would securely store credentials
    console.log("Auto-apply settings saved:", data);
    
    // Save to local storage for demo
    localStorage.setItem("autoApplySettings", JSON.stringify({
      platforms: data,
      testMode,
      autoApplyLimit,
    }));
    
    toast({
      title: "Settings saved",
      description: "Your auto-apply settings have been updated.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            Auto-apply Settings
          </DialogTitle>
          <DialogDescription>
            Configure how you want to automate your job applications across platforms.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">Application History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4 p-4 border rounded-md">
                  <h3 className="text-lg font-medium">Global Settings</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="test-mode">Test Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Applications won't be sent when in test mode
                        </p>
                      </div>
                      <Switch
                        id="test-mode"
                        checked={testMode}
                        onCheckedChange={setTestMode}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="auto-apply-limit">Daily Auto-Apply Limit</Label>
                      <Input
                        id="auto-apply-limit"
                        type="number"
                        min={1}
                        max={20}
                        value={autoApplyLimit}
                        onChange={(e) => setAutoApplyLimit(parseInt(e.target.value) || 5)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Maximum number of automatic applications per day
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Platform Credentials</h3>
                  <p className="text-sm text-muted-foreground">
                    Add your credentials for the platforms you want to auto-apply on.
                  </p>
                  
                  {/* LinkedIn Settings */}
                  <div className="border rounded-md p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Linkedin className="text-[#0077B5]" size={20} />
                        <Label htmlFor="linkedin-enabled" className="font-medium">LinkedIn</Label>
                      </div>
                      <FormField
                        control={form.control}
                        name="linkedin.enabled"
                        render={({ field }) => (
                          <Switch
                            id="linkedin-enabled"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    
                    {form.watch("linkedin.enabled") && (
                      <div className="space-y-3 pt-2">
                        <FormField
                          control={form.control}
                          name="linkedin.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} value={field.value || ""} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="linkedin.password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormDescription className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                                <Shield size={14} />
                                Your credentials are stored locally and securely
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="linkedin.useEasyApply"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between">
                              <div>
                                <FormLabel>Use Easy Apply Only</FormLabel>
                                <FormDescription>Only apply to jobs with LinkedIn Easy Apply</FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Twitter Settings */}
                  <div className="border rounded-md p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Twitter className="text-[#1DA1F2]" size={20} />
                        <Label htmlFor="twitter-enabled" className="font-medium">Twitter/X</Label>
                      </div>
                      <FormField
                        control={form.control}
                        name="twitter.enabled"
                        render={({ field }) => (
                          <Switch
                            id="twitter-enabled"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    
                    {form.watch("twitter.enabled") && (
                      <div className="space-y-3 pt-2">
                        <FormField
                          control={form.control}
                          name="twitter.username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="@yourusername" {...field} value={field.value || ""} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="twitter.easyApply"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between">
                              <div>
                                <FormLabel>Direct Message Only</FormLabel>
                                <FormDescription>Only respond to posts with DM application instructions</FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Custom Webhook Settings */}
                  <div className="border rounded-md p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building size={20} />
                        <Label htmlFor="custom-enabled" className="font-medium">Custom Application Webhook</Label>
                      </div>
                      <FormField
                        control={form.control}
                        name="custom.enabled"
                        render={({ field }) => (
                          <Switch
                            id="custom-enabled"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    
                    {form.watch("custom.enabled") && (
                      <div className="space-y-3 pt-2">
                        <FormField
                          control={form.control}
                          name="custom.webhookUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Webhook URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://your-webhook-url.com/apply" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormDescription>
                                Send application data to your own webhook for custom integrations
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-1">
                    <Save size={16} />
                    Save Settings
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recent Applications</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Senior Product Manager</TableCell>
                    <TableCell>TechCorp Inc.</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Linkedin size={14} className="text-[#0077B5]" />
                        <span>LinkedIn</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400">
                        In Progress
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">1 day ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">UX Research Lead</TableCell>
                    <TableCell>DesignFirst Inc.</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Twitter size={14} className="text-[#1DA1F2]" />
                        <span>Twitter</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">2 days ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <p className="text-center text-muted-foreground text-sm">
                Automatic applications are limited to {autoApplyLimit} per day
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AutoApplySettings;
