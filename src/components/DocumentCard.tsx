
import React from "react";
import { FileText, Eye, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "./DashboardCard";

interface DocumentCardProps {
  title: string;
  type: string;
  date: string;
  fileSize?: string;
  thumbnailUrl?: string;
  onClick?: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  type,
  date,
  fileSize = "N/A",
  thumbnailUrl,
  onClick
}) => {
  return (
    <DashboardCard
      className="h-full"
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-primary/10 text-primary">
            <FileText size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-base truncate">{title}</h4>
            <p className="text-xs text-muted-foreground">{type}</p>
          </div>
        </div>
        
        {thumbnailUrl && (
          <div className="relative w-full h-32 rounded-md mb-3 overflow-hidden">
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
          </div>
        )}
        
        <div className="mt-auto flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
          <span>{fileSize}</span>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline" className="w-full flex gap-1 items-center">
            <Eye size={14} />
            <span>View</span>
          </Button>
          <Button size="sm" variant="ghost" className="flex gap-1 items-center">
            <Download size={14} />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DocumentCard;
