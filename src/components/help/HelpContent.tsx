
import React from "react";
import { LightbulbIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HelpContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-6">Help Center</h1>
      
      <p className="text-xl text-muted-foreground mb-8">
        Learn how to use Career BEAST MODE effectively to advance your career
      </p>
      
      {/* Daily Tip Section */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-start gap-4">
          <LightbulbIcon className="h-6 w-6 text-primary mt-1" />
          <div>
            <h2 className="text-xl font-bold">Daily Career Tip</h2>
            <p className="text-lg">
              Today's tip: Schedule 15 minutes each week to update your skills and 
              achievements in Career BEAST MODE to ensure your profile stays current.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="getting-started">
        <TabsList className="mb-8">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="profile">Profile Management</TabsTrigger>
          <TabsTrigger value="skills">Skills & Endorsements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started">
          <h2 className="text-3xl font-bold mb-6">Getting Started with Career BEAST MODE</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">What is Career BEAST MODE?</h3>
              <p className="text-lg">
                Career BEAST MODE is a comprehensive career development platform that helps professionals
                showcase their skills, connect with opportunities, and accelerate their career growth.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Creating Your Profile</h3>
              <p className="text-lg">
                Start by building your complete professional profile in Career BEAST MODE. Add your
                work history, education, skills, and achievements to stand out to potential employers.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Connecting Your Accounts</h3>
              <p className="text-lg">
                Link your LinkedIn, GitHub, and other professional accounts to Career BEAST MODE to
                easily import your existing professional information and stay in sync.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <h2 className="text-3xl font-bold mb-6">Profile Management</h2>
          <p className="text-lg mb-4">
            Learn how to optimize your Career BEAST MODE profile for maximum visibility and impact.
          </p>
        </TabsContent>
        
        <TabsContent value="skills">
          <h2 className="text-3xl font-bold mb-6">Skills & Endorsements</h2>
          <p className="text-lg mb-4">
            Discover how to showcase your skills and get endorsements from colleagues in Career BEAST MODE.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpContent;
