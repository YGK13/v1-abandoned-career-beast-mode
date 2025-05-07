
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import DocumentsList from "@/components/career-docs/DocumentsList";
import UploadDocumentSection from "@/components/career-docs/UploadDocumentSection";
import DocumentUploadSuggestions from "@/components/career-docs/DocumentUploadSuggestions";
import CareerTemplates from "@/components/career-docs/CareerTemplates";
import LinkedInProfileImport from "@/components/career-docs/LinkedInProfileImport";
import CareerSyncRoadmap from "@/components/career-docs/CareerSyncRoadmap";
import { careerTemplates } from "@/data/careerTemplatesData";
import { FileSymlink } from "lucide-react";
import { getUserDocuments } from "@/services/documentService";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const CareerDocs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      console.log("Loading documents...");
      const { data, error } = await getUserDocuments();
      if (error) {
        console.error("Error in loadDocuments:", error);
        toast({
          title: "Error loading documents",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        console.log("Documents loaded successfully:", data);
        setDocuments(data.map((doc) => ({
          ...doc,
          date: doc.created_at,
        })));
      } else {
        console.log("No documents returned");
      }
    } catch (error) {
      console.error("Exception in loadDocuments:", error);
      toast({
        title: "Failed to load documents",
        description: String(error),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User authenticated, loading documents");
      loadDocuments();
    } else {
      console.log("No authenticated user found");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Career Assets</h1>
          <p className="text-muted-foreground mt-1">Manage and optimize your career assets</p>
        </header>
        <CareerSyncRoadmap />
        <LinkedInProfileImport />

        <DocumentUploadSuggestions />

        {/* Upload Section - pass reload handler */}
        <UploadDocumentSection
          icon={FileSymlink}
          title="Manual Document Upload"
          description="Upload your career documents to build a comprehensive portfolio. We support PDF, DOCX, JPG, and PNG."
          buttonText="Upload Files"
          onUploadSuccess={loadDocuments}
        />

        {/* Documents List - with upload handler */}
        <DocumentsList 
          documents={documents} 
          onUploadClick={() => loadDocuments()} 
          isLoading={loading} 
        />

        {/* Career Templates bottom */}
        <CareerTemplates templates={careerTemplates} />
      </div>
    </Layout>
  );
};

export default CareerDocs;
