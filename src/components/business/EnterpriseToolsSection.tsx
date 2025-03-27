
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import EnterpriseToolCard from "./EnterpriseToolCard";
import { enterpriseToolsData } from "./enterpriseToolsData";

const EnterpriseToolsSection = () => {
  const { categories, enterpriseTools } = enterpriseToolsData;

  const filterTools = (category: string) => {
    if (category === "all") {
      return enterpriseTools;
    }
    return enterpriseTools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <DashboardCard
      title="Enterprise Tools Marketplace"
      subtitle="Exclusive discounts on premium business tools via JoinSecret"
    >
      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filterTools(category.id).map((tool, index) => (
                  <EnterpriseToolCard
                    key={index}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    category={tool.category}
                    discount={tool.discount}
                    url={tool.url}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 p-4 border border-dashed rounded-lg bg-muted/10 text-center">
          <p className="mb-4 text-muted-foreground">
            All deals are powered by JoinSecret. New offers are added regularly.
          </p>
          <Button
            variant="outline"
            onClick={() => window.open('https://joinsecret.com/', '_blank')}
          >
            View All Deals on JoinSecret
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default EnterpriseToolsSection;
