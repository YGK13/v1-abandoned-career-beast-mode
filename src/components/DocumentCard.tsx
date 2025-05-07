
import React, { useState } from "react";
import { FileText, Eye, Download, Calendar, ExternalLink, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import DashboardCard from "./DashboardCard";
import { getDocumentFileUrl } from "@/services/documentService";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  date: string;
  fileSize?: string;
  thumbnailUrl?: string;
  description?: string | null;
  filePath?: string | null;
  onClick?: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  title,
  type,
  date,
  fileSize = "N/A",
  thumbnailUrl,
  description,
  filePath,
  onClick
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  // Format date if it's a valid date string
  const formattedDate = (() => {
    try {
      return format(new Date(date), 'MMM d, yyyy');
    } catch (e) {
      return date;
    }
  })();

  // Get document type label with nice formatting
  const documentTypeLabel = (() => {
    if (!type) return "Other";
    // Capitalize first letter and make the rest lowercase
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  })();
  
  const handlePreview = async () => {
    if (!filePath) {
      toast({
        title: "Preview unavailable",
        description: "This document cannot be previewed",
        variant: "destructive",
      });
      return;
    }
    
    try {
      console.log("Getting document URL for preview:", filePath);
      const { url, error } = await getDocumentFileUrl(filePath);
      
      if (error || !url) {
        console.error("Error getting document URL:", error);
        toast({
          title: "Error loading preview",
          description: error?.message || "Could not load document preview",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Document URL received:", url);
      setPreviewUrl(url);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error previewing document:", error);
      toast({
        title: "Error loading preview",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = async () => {
    if (!filePath) {
      toast({
        title: "Download unavailable",
        description: "This document cannot be downloaded",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { url, error } = await getDocumentFileUrl(filePath);
      
      if (error || !url) {
        toast({
          title: "Error downloading document",
          description: error?.message || "Could not download document",
          variant: "destructive",
        });
        return;
      }
      
      // Create a temporary link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your document download has started",
      });
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Error downloading document",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Determine if the file is previewable based on file extension
  const isPreviewable = (() => {
    if (!filePath) return false;
    
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    const previewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
    
    return previewableExtensions.includes(fileExtension || '');
  })();
  
  return (
    <>
      <DashboardCard
        className="h-full transition-all hover:shadow-md"
        onClick={onClick}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary">
              <FileText size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-base pr-2">{title}</h4>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => {
                      e.stopPropagation();
                      setIsDetailsOpen(!isDetailsOpen);
                    }}>
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
          
          <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen} className="mb-3">
            <CollapsibleContent className="text-sm text-muted-foreground pt-2 pb-1">
              {description ? (
                <p className="line-clamp-3">{description}</p>
              ) : (
                <p className="italic">No description provided</p>
              )}
            </CollapsibleContent>
          </Collapsible>
          
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
              disabled={!filePath}
            >
              <Download size={14} />
            </Button>
          </div>
        </div>
      </DashboardCard>
      
      {/* Document Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
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
    </>
  );
};

export default DocumentCard;
