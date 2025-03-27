
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface EnterpriseToolCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  discount: string;
  url: string;
}

const EnterpriseToolCard = ({
  title,
  description,
  icon: Icon,
  category,
  discount,
  url
}: EnterpriseToolCardProps) => (
  <div className="flex flex-col h-full border rounded-lg hover:border-primary/50 transition-all overflow-hidden">
    <div className="flex items-center justify-between bg-muted/30 px-4 py-2 border-b">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-full">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium">{category}</span>
      </div>
      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
        {discount}
      </div>
    </div>
    
    <div className="p-4 flex-1">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
    </div>
    
    <div className="p-4 pt-0 mt-auto">
      <Button 
        variant="outline" 
        size="sm"
        className="w-full gap-1" 
        onClick={() => window.open(url, '_blank')}
      >
        Get Discount
        <ExternalLink className="w-3 h-3 ml-1" />
      </Button>
    </div>
  </div>
);

export default EnterpriseToolCard;
