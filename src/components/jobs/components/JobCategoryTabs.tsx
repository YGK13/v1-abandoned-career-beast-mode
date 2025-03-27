
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface JobCategory {
  id: string;
  name: string;
}

interface JobCategoryTabsProps {
  categories: JobCategory[];
  children: (category: string) => React.ReactNode;
}

const JobCategoryTabs: React.FC<JobCategoryTabsProps> = ({ categories, children }) => {
  return (
    <Tabs defaultValue="all" className="w-full mb-8">
      <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {categories.map(category => (
          <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map(category => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          {children(category.id)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default JobCategoryTabs;
