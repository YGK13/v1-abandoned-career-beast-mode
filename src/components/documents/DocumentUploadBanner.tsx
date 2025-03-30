
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";
import { CloudUpload } from "lucide-react";

interface DocumentUploadBannerProps {
  onUploadClick: () => void;
}

const DocumentUploadBanner: React.FC<DocumentUploadBannerProps> = ({ onUploadClick }) => {
  return (
    <DashboardCard 
      className="mb-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <CloudUpload size={24} className="text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-1">Upload your documents securely</h3>
          <p className="text-muted-foreground">
            Drag and drop files here or click to browse. We support PDF, DOCX, JPG, and PNG.
          </p>
        </div>
        <Button 
          className="flex-shrink-0"
          onClick={onUploadClick}
        >
          Upload Files
        </Button>
      </div>
    </DashboardCard>
  );
};

export default DocumentUploadBanner;
