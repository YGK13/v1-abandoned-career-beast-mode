
import React from "react";
import { FileText, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DocumentCardHeaderProps {
  title: string;
  documentTypeLabel: string;
  formattedDate: string;
  description: string | null;
  fileSize?: string;
  toggleDetails: (e: React.MouseEvent) => void;
}

const DocumentCardHeader: React.FC<DocumentCardHeaderProps> = ({
  title,
  documentTypeLabel,
  formattedDate,
  description,
  fileSize,
  toggleDetails,
}) => {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary">
        <FileText size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-base pr-2">{title}</h4>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleDetails}>
                <Info size={14} />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description || "No description provided"}</p>
                <div className="pt-2">
                  <Badge variant="outline" className="mr-2">{documentTypeLabel}</Badge>
                  <Badge variant="secondary" className="mr-2">{formattedDate}</Badge>
                  {fileSize && <Badge variant="outline">{fileSize}</Badge>}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs rounded-sm">{documentTypeLabel}</Badge>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentCardHeader;
