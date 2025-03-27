
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BioGeneratorProvider } from "./BioGeneratorContext";
import FormFields from "./bio-generator/FormFields";
import GeneratedBioPreview from "./bio-generator/GeneratedBioPreview";
import DataSourcesTab from "./bio-generator/DataSourcesTab";

const BioGenerator: React.FC = () => {
  return (
    <div className="mt-8 bg-card rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">Expert Bio Generator</h2>
      <p className="text-muted-foreground mb-6">Create a professional bio to showcase your expertise on consulting platforms by compiling data from your career resources</p>
      
      <BioGeneratorProvider>
        <Tabs defaultValue="generator">
          <TabsList className="mb-6">
            <TabsTrigger value="generator">Generate Bio</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <FormFields />
              </div>
              
              <div>
                <GeneratedBioPreview />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sources">
            <DataSourcesTab />
          </TabsContent>
        </Tabs>
      </BioGeneratorProvider>
    </div>
  );
};

export default BioGenerator;
