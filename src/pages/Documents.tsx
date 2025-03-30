
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserDocuments, uploadDocument, Document as DocumentType } from "@/services/documentService";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentUploadBanner from "@/components/documents/DocumentUploadBanner";
import DocumentTabsList from "@/components/documents/DocumentTabsList";
import DocumentUploadDialog from "@/components/documents/DocumentUploadDialog";

const Documents = () => {
  const navigate = useNavigate();
  const { session, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  useEffect(() => {
    // Redirect to auth if not logged in
    if (!authLoading && !session) {
      navigate("/auth");
      toast({
        title: "Authentication required",
        description: "Please sign in to view your documents",
      });
    } else if (session) {
      // Load documents if logged in
      loadDocuments();
    }
  }, [session, authLoading, navigate]);
  
  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await getUserDocuments();
      if (error) {
        toast({
          title: "Error loading documents",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        setDocuments(data);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUploadSubmit = async (documentData: any) => {
    setIsUploading(true);
    
    try {
      const { data, error } = await uploadDocument(documentData);
      
      if (error) {
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Document uploaded",
          description: "Your document has been successfully uploaded",
        });
        
        // Close dialog
        setShowUploadDialog(false);
        
        // Reload documents
        if (data) {
          setDocuments(prev => [data, ...prev]);
        } else {
          loadDocuments();
        }
      }
    } catch (error: any) {
      console.error("Error uploading document:", error);
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // If loading auth status, show loading indicator
  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        {/* Document header with title and actions */}
        <DocumentsHeader onUploadClick={() => setShowUploadDialog(true)} />
        
        {/* Upload banner */}
        <DocumentUploadBanner onUploadClick={() => setShowUploadDialog(true)} />
        
        {/* Document tabs and listing */}
        <DocumentTabsList 
          documents={documents} 
          isLoading={isLoading}
          onUploadClick={() => setShowUploadDialog(true)}
        />
        
        {/* Document upload dialog */}
        <DocumentUploadDialog
          isOpen={showUploadDialog}
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleUploadSubmit}
          isUploading={isUploading}
        />
      </div>
    </Layout>
  );
};

export default Documents;
