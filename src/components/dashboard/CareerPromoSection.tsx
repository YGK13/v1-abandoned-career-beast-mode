
import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Link } from "react-router-dom";

const CareerPromoSection: React.FC = () => {
  return (
    <DashboardCard
      className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <User size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">Ready to reach the next level?</h3>
          <p className="text-muted-foreground">Build your personal brand and get noticed with our PR opportunity tracking and media mention monitoring.</p>
        </div>
        <Button className="flex-shrink-0" asChild>
          <Link to="/personal-brand">
            Manage Your Brand
          </Link>
        </Button>
      </div>
    </DashboardCard>
  );
};

export default CareerPromoSection;
