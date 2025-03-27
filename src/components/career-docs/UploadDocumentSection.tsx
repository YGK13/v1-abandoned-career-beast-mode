
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";

interface UploadDocumentSectionProps {
  icon?: React.ElementType;
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
}

const UploadDocumentSection: React.FC<UploadDocumentSectionProps> = ({
  icon: IconComponent = CloudUpload,
  title = "Upload your documents securely",
  description = "Drag and drop files here or click to browse. We support PDF, DOCX, JPG, and PNG.",
  buttonText = "Upload Files",
  onClick,
  className,
}) => {
  return (
    <DashboardCard 
      className={`mb-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20 ${className || ""}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <IconComponent size={24} className="text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        <Button className="flex-shrink-0" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </DashboardCard>
  );
};

export default UploadDocumentSection;
