
import React from "react";
import { Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface DocumentPreviewProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  previewUrl: string | null;
  title: string;
  documentTypeLabel: string;
  date: string;
  handleDownload: () => void;
}

const DocumentCardPreview: React.FC<DocumentPreviewProps> = ({
  isOpen,
  setIsOpen,
  previewUrl,
  title,
  documentTypeLabel,
  date,
  handleDownload
}) => {
  // Format date if it's a valid date string
  const formattedDate = (() => {
    try {
      return format(new Date(date), 'MMM d, yyyy');
    } catch (e) {
      return date;
    }
  })();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X size={18} />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto mt-2 border rounded-md">
          {previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-full"
              title={title}
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{documentTypeLabel}</Badge>
            <span className="text-sm text-muted-foreground">{formattedDate}</span>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="flex gap-1 items-center"
            onClick={handleDownload}
          >
            <Download size={14} />
            <span>Download</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentCardPreview;
