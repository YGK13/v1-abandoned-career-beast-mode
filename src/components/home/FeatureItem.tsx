
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
      <Icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;
