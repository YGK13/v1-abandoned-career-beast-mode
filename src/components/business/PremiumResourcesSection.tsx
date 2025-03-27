
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, ExternalLink } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

const PremiumResourcesSection = () => {
  return (
    <DashboardCard
      title="Premium Resources"
      subtitle="Exclusive resources for business growth"
    >
      <div className="p-4">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">JoinSecret.com</h3>
          <p className="mb-4">
            Access to exclusive deals, resources, and a community of entrepreneurs to help grow your business.
          </p>
          <Button
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => window.open('https://joinsecret.com/', '_blank')}
          >
            <Link className="w-5 h-5" />
            Access JoinSecret
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default PremiumResourcesSection;
