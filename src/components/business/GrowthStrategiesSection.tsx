
import React, { useState } from "react";
import StrategyCategoryTabs from "./StrategyCategoryTabs";
import { growthStrategies } from "@/data/growthStrategiesData";

const GrowthStrategiesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(growthStrategies[0].id);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Growth Strategies</h2>
      <p className="text-muted-foreground mb-6">
        Expert tips and strategies to help scale your business across key functional areas
      </p>
      
      <StrategyCategoryTabs 
        categories={growthStrategies} 
        onCategoryChange={setActiveCategory}
      />
    </div>
  );
};

export default GrowthStrategiesSection;
