
import React from "react";
import Layout from "@/components/Layout";
import LinkedInProfile from "@/components/career-docs/LinkedInProfile";
import LinkedInProfileImport from "@/components/career-docs/LinkedInProfileImport";
import LinkedInPostSuggestions from "@/components/career-docs/LinkedInPostSuggestions";
import LinkedInNextSteps from "@/components/career-docs/LinkedInNextSteps";

const LinkedIn: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">LinkedIn Profile Optimization</h1>
              <p className="text-muted-foreground mt-1">
                Improve your professional presence on the world's largest career network
              </p>
            </div>
          </div>
          <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md dark:bg-blue-950/20 dark:border-blue-900/30">
            <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Your data is protected with two-factor authentication during the onboarding process.
            </p>
          </div>
        </header>

        {/* LinkedIn Profile Import Section */}
        <LinkedInProfileImport />
        
        {/* LinkedIn Profile Assessment Section */}
        <LinkedInProfile />
        
        {/* LinkedIn Post Suggestions Section */}
        <LinkedInPostSuggestions />
        
        {/* Next Steps - Navigation options to other sections */}
        <LinkedInNextSteps />
      </div>
    </Layout>
  );
};

export default LinkedIn;
