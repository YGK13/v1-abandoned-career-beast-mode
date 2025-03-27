
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import BusinessOption from "./BusinessOption";
import { Mailbox } from "lucide-react";

const BusinessAddressSection = () => {
  return (
    <DashboardCard
      title="Business Address"
      subtitle="Professional address solutions for your business"
    >
      <div className="space-y-4 p-4">
        <BusinessOption
          title="Stable"
          description="Physical addresses with mail scanning and forwarding"
          icon={Mailbox}
          url="https://www.stable.app/"
        />
        <BusinessOption
          title="iPostal1"
          description="Digital mailbox services with real street addresses"
          icon={Mailbox}
          url="https://ipostal1.com/"
        />
        <BusinessOption
          title="Earth Class Mail"
          description="Virtual mailbox and mail scanning services"
          icon={Mailbox}
          url="https://www.earthclassmail.com/"
        />
      </div>
    </DashboardCard>
  );
};

export default BusinessAddressSection;
