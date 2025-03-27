
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { StrategyTip } from "@/data/growthStrategiesData";

interface StrategyTipCardProps {
  tip: StrategyTip;
}

const StrategyTipCard: React.FC<StrategyTipCardProps> = ({ tip }) => {
  return (
    <DashboardCard 
      key={tip.id}
      className="h-full"
      isHoverable
    >
      <h3 className="font-medium text-lg mb-2">{tip.title}</h3>
      <p className="text-muted-foreground text-sm">{tip.description}</p>
    </DashboardCard>
  );
};

export default StrategyTipCard;
