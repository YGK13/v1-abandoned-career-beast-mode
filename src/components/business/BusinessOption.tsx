
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BusinessOptionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  buttonText?: string;
  url: string;
}

const BusinessOption = ({
  title,
  description,
  icon: Icon,
  buttonText = "Learn More",
  url
}: BusinessOptionProps) => (
  <div className="p-4 border rounded-lg hover:border-primary/50 transition-all">
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1" 
          onClick={() => window.open(url, '_blank')}
        >
          {buttonText}
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  </div>
);

export default BusinessOption;
