
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CareerPromoSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  highlight?: boolean;
}

const CareerPromoSection: React.FC<CareerPromoSectionProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonLink,
  highlight = false
}) => {
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md", 
      highlight ? "border-primary/30 bg-primary/5 shadow-sm" : ""
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-2 rounded-lg", 
            highlight ? "bg-primary text-primary-foreground" : "bg-muted"
          )}>
            <Icon size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
            <Link to={buttonLink}>
              <Button 
                variant={highlight ? "default" : "outline"} 
                size="sm" 
                className="w-full"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPromoSection;
