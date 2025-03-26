
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { ManagementTip } from "@/data/managementTipsData";

interface ManagementTipCardProps {
  tip: ManagementTip;
}

const ManagementTipCard: React.FC<ManagementTipCardProps> = ({ tip }) => {
  return (
    <div className="p-4 rounded-lg border bg-muted/50">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-medium mb-1">{tip.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {tip.description}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              Source: {tip.source}
            </Badge>
          </div>
        </div>
        <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
      </div>
    </div>
  );
};

export default ManagementTipCard;
