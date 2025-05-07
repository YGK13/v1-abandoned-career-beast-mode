
import React from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentCardActionsProps {
  handlePreview: () => void;
  handleDownload: () => void;
  isPreviewable: boolean;
  hasFilePath: boolean;
}

const DocumentCardActions: React.FC<DocumentCardActionsProps> = ({
  handlePreview,
  handleDownload,
  isPreviewable,
  hasFilePath,
}) => {
  return (
    <div className="mt-auto flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="flex-1 flex gap-1 items-center"
        onClick={(e) => {
          e.stopPropagation();
          handlePreview();
        }}
        disabled={!isPreviewable}
      >
        <Eye size={14} />
        <span>Preview</span>
      </Button>
      <Button 
        size="sm" 
        variant="ghost" 
        className="flex gap-1 items-center"
        onClick={(e) => {
          e.stopPropagation();
          handleDownload();
        }}
        disabled={!hasFilePath}
      >
        <Download size={14} />
      </Button>
    </div>
  );
};

export default DocumentCardActions;
