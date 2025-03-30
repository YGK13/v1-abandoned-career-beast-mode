
import React from "react";

interface GooglePageHeaderProps {
  title?: string;
  description?: string;
}

const GooglePageHeader: React.FC<GooglePageHeaderProps> = ({ 
  title = "Google Integration",
  description = "Connect and manage your Google account integration."
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default GooglePageHeader;
