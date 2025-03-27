
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import BusinessOption from "./BusinessOption";
import { Building, Briefcase } from "lucide-react";

const FormLLCSection = () => {
  return (
    <DashboardCard
      title="Form Your LLC"
      subtitle="Set up your business entity quickly and easily"
    >
      <div className="space-y-4 p-4">
        <BusinessOption
          title="TailorBrands"
          description="Complete LLC formation service with branding resources"
          icon={Building}
          url="https://www.tailorbrands.com/"
        />
        <BusinessOption
          title="ZenBusiness"
          description="Affordable LLC formation with ongoing compliance support"
          icon={Briefcase}
          url="https://www.zenbusiness.com/"
        />
        <BusinessOption
          title="Incfile"
          description="Free LLC formation with registered agent services"
          icon={Building}
          url="https://www.incfile.com/"
        />
      </div>
    </DashboardCard>
  );
};

export default FormLLCSection;
