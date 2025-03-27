
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StrategyCategory } from "@/data/growthStrategiesData";
import StrategyTipCard from "./StrategyTipCard";

interface StrategyCategoryTabsProps {
  categories: StrategyCategory[];
  onCategoryChange: (categoryId: string) => void;
}

const StrategyCategoryTabs: React.FC<StrategyCategoryTabsProps> = ({ 
  categories, 
  onCategoryChange 
}) => {
  return (
    <Tabs 
      defaultValue={categories[0].id} 
      onValueChange={onCategoryChange} 
      className="w-full"
    >
      <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className="flex items-center gap-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tips.map((tip) => (
              <StrategyTipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default StrategyCategoryTabs;
