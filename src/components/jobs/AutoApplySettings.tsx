
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, Linkedin, Twitter, Globe, Check, AlertCircle, Zap } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface AutoApplySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AutoApplySettings: React.FC<AutoApplySettingsProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Settings size={20} />
            Auto-apply Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="criteria">Apply Criteria</TabsTrigger>
            <TabsTrigger value="tracking">Application Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="platforms">
            <div className="space-y-6">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Linkedin className="text-[#0A66C2]" />
                    <h3 className="font-medium">LinkedIn Integration</h3>
                  </div>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically apply to jobs on LinkedIn that match your criteria
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin-username">LinkedIn Email/Username</Label>
                    <Input id="linkedin-username" placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="linkedin-password">LinkedIn Password</Label>
                    <Input id="linkedin-password" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Check size={14} />
                  Verify Credentials
                </Button>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Twitter className="text-[#1DA1F2]" />
                    <h3 className="font-medium">Twitter/X Integration</h3>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitor Twitter/X for job postings that match your criteria
                </p>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Globe />
                    <h3 className="font-medium">Custom Webhook Integration</h3>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground">
                  Set up custom webhooks to automate applications on other platforms
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <span className="text-sm text-muted-foreground">
                  Auto-apply is active and has applied to 7 jobs in the last week
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="criteria">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Job Match Threshold</h3>
                <p className="text-sm text-muted-foreground">
                  Only apply to jobs that match your profile at or above this threshold
                </p>
                <div className="py-4">
                  <Slider defaultValue={[85]} max={100} step={5} />
                </div>
                <div className="flex justify-between text-sm">
                  <span>85% or higher match</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Job Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="job-type-full-time" defaultChecked />
                    <Label htmlFor="job-type-full-time">Full-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="job-type-contract" />
                    <Label htmlFor="job-type-contract">Contract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="job-type-remote" defaultChecked />
                    <Label htmlFor="job-type-remote">Remote only</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Maximum Applications</h3>
                <RadioGroup defaultValue="10" className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="max-5" />
                    <Label htmlFor="max-5">5 per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="max-10" />
                    <Label htmlFor="max-10">10 per day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="25" id="max-25" />
                    <Label htmlFor="max-25">25 per day</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-500" />
                <span className="text-sm text-muted-foreground">
                  We recommend applying to no more than 15 jobs per day for best results
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Auto-apply Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Your auto-apply system has applied to 23 jobs in the last 30 days
                </p>
              </div>

              <div className="border rounded-lg divide-y">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Senior Product Manager</p>
                    <p className="text-sm text-muted-foreground">Netflix • Applied yesterday</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                    Applied
                  </Badge>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Product Lead</p>
                    <p className="text-sm text-muted-foreground">Spotify • Applied 3 days ago</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                    Interview
                  </Badge>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Senior UX Designer</p>
                    <p className="text-sm text-muted-foreground">Google • Applied 5 days ago</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                    Applied
                  </Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Applications
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutoApplySettings;
