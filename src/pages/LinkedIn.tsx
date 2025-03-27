
import React from "react";
import Layout from "@/components/Layout";
import LinkedInProfile from "@/components/career-docs/LinkedInProfile";

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
        </header>

        {/* LinkedIn Profile Assessment Section */}
        <LinkedInProfile />
        
        {/* Future LinkedIn optimization tools can go here */}
      </div>
    </Layout>
  );
};

export default LinkedIn;
