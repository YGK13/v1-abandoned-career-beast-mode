
import React, { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  icon: React.ElementType;
  children: ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, icon: Icon, children }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium flex items-center gap-2">
        <Icon size={16} />
        {title}
      </h4>
      {children}
    </div>
  );
};

export default FilterSection;
