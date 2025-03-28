
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
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Complete Your Profile</h3>
              <p className="text-lg">
                Profiles with complete information receive up to 40% more engagement. Make sure to fill out all sections 
                of your Career BEAST MODE profile, including work history, education, skills, and achievements.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Highlight Your Achievements</h3>
              <p className="text-lg">
                Quantify your accomplishments with specific metrics and results. Career BEAST MODE helps you 
                phrase your achievements in a way that captures attention and demonstrates your value.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Update Regularly</h3>
              <p className="text-lg">
                Set a reminder to update your Career BEAST MODE profile monthly with new skills, projects, 
                or accomplishments to ensure your professional presence stays current.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <h2 className="text-3xl font-bold mb-6">Skills & Endorsements</h2>
          <p className="text-lg mb-4">
            Discover how to showcase your skills and get endorsements from colleagues in Career BEAST MODE.
          </p>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Add Relevant Skills</h3>
              <p className="text-lg">
                Career BEAST MODE recommends in-demand skills for your industry and role. Add these to your 
                profile to increase your visibility to recruiters and potential employers.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Skill Assessments</h3>
              <p className="text-lg">
                Take skill assessments in Career BEAST MODE to verify your proficiency and earn badges 
                that appear on your profile, increasing your credibility with hiring managers.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-2xl font-semibold mb-3">Request Endorsements</h3>
              <p className="text-lg">
                Use Career BEAST MODE's one-click endorsement request feature to ask colleagues and 
                connections to vouch for your skills and expertise.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpContent;
