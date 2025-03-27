
import React from "react";
import Layout from "@/components/Layout";
import BioGenerator from "@/components/monetize/BioGenerator";

const BioGeneratorPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Expert Bio Generator</h1>
            <p className="text-muted-foreground">
              Create a professional bio to showcase your expertise by compiling data from your career resources
            </p>
          </header>

          {/* Bio Generator Component */}
          <BioGenerator />
        </div>
      </div>
    </Layout>
  );
};

export default BioGeneratorPage;
