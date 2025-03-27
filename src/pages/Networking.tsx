
import React from "react";
import Layout from "@/components/Layout";
import NetworkingSuggestions from "@/components/networking/NetworkingSuggestions";
import IndustryGroups from "@/components/networking/IndustryGroups";
import LocalGroups from "@/components/networking/LocalGroups";
import FractionalExecutivePlatforms from "@/components/networking/FractionalExecutivePlatforms";
import { Separator } from "@/components/ui/separator";

const Networking = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Strategic Networking</h1>
        <p className="text-muted-foreground mb-8">
          Build valuable connections based on your profile, documents, and career goals
        </p>

        <NetworkingSuggestions />
        <Separator className="my-8" />
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <IndustryGroups />
          <LocalGroups />
        </div>
        
        <FractionalExecutivePlatforms />
      </div>
    </Layout>
  );
};

export default Networking;
