
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Award, Star, Info } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Link } from "react-router-dom";

interface CareerPromoSectionProps {
  icon?: React.ElementType;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

const CareerPromoSection: React.FC<CareerPromoSectionProps> = ({
  icon: IconComponent = User,
  title = "Ready to reach the next level?",
  description = "Build your personal brand and get noticed with our PR opportunity tracking and media mention monitoring.",
  buttonText = "Manage Your Brand",
  buttonLink = "/personal-brand",
  className,
}) => {
  return (
    <DashboardCard
      className={`bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20 ${className || ""}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <IconComponent size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button className="flex-shrink-0" asChild>
          <Link to={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </DashboardCard>
  );
};

export default CareerPromoSection;
