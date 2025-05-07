
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getDocumentFileUrl } from "@/services/documentService";
import { format } from "date-fns";

interface UseDocumentCardProps {
  id: string;
  title: string;
  type: string;
  date: string;
  filePath?: string | null;
}

export const useDocumentCard = ({
  title,
  type,
  date,
  filePath
}: UseDocumentCardProps) => {
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

  // Determine if the file is previewable based on file extension
  const isPreviewable = (() => {
    if (!filePath) return false;
    
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    const previewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
    
    return previewableExtensions.includes(fileExtension || '');
  })();

  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsOpen(!isDetailsOpen);
  };

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

  return {
    formattedDate,
    documentTypeLabel,
    isPreviewable,
    isDetailsOpen,
    setIsDetailsOpen,
    toggleDetails,
    isPreviewOpen,
    setIsPreviewOpen,
    previewUrl,
    handlePreview,
    handleDownload
  };
};
