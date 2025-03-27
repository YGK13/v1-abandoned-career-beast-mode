
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import BusinessOption from "./BusinessOption";
import { Landmark } from "lucide-react";

const BusinessBankingSection = () => {
  return (
    <DashboardCard
      title="Business Banking"
      subtitle="Banking solutions tailored for businesses"
    >
      <div className="space-y-4 p-4">
        <BusinessOption
          title="Mercury"
          description="Fee-free digital banking built for startups and businesses"
          icon={Landmark}
          url="https://mercury.com/"
        />
        <BusinessOption
          title="Novo"
          description="Small business banking with powerful integrations"
          icon={Landmark}
          url="https://www.novo.co/"
        />
        <BusinessOption
          title="Brex"
          description="All-in-one finance for growing businesses"
          icon={Landmark}
          url="https://www.brex.com/"
        />
      </div>
    </DashboardCard>
  );
};

export default BusinessBankingSection;
