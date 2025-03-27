
import React from "react";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

const OffMarketBanner: React.FC = () => {
  return (
    <div className="mt-8 p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 rounded-lg">
      <div className="flex items-start gap-3">
        <Building className="text-amber-600 dark:text-amber-400 mt-1" size={24} />
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-300">Off-Market Executive Positions</h3>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Exclusive board and executive positions from VirtualNonExecs. These opportunities require 
            additional verification and are available to premium members only.
          </p>
          <Button variant="outline" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30">
            Learn More About VirtualNonExecs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OffMarketBanner;
