
import React from "react";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentCard from "@/components/DocumentCard";
import { getDocumentFileUrl } from "@/services/documentService";

interface Document {
  id: string;
  title: string;
  doc_type: string | null;
  date: string;
  file_path: string | null;
  fileSize?: string;
  thumbnailUrl?: string;
  description?: string | null;
}

interface DocumentsListProps {
  documents: Document[];
  onUploadClick: () => void;
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents, onUploadClick }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const documentTypes = [
    { id: "all", name: "All Documents" },
    { id: "resume", name: "Resumes" },
    { id: "review", name: "Reviews" },
    { id: "certificate", name: "Certificates" },
    { id: "other", name: "Other" },
  ];

  const filteredDocuments = (type: string) => {
    let filtered = documents;
    if (type !== "all") {
      filtered = filtered.filter(doc => (doc.doc_type || "other") === type);
    }
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.doc_type && doc.doc_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return filtered;
  };

  // Pick a stock thumbnail (AI Coach can see file_path, but this is just visual)
  const docTypeToThumbnail = (docType: string | null): string => {
    switch(docType) {
      case "resume":
        return "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop";
      case "review":
        return "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop";
      case "certificate":
        return "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop";
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">My Documents</h2>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {documentTypes.map(type => (
            <TabsTrigger key={type.id} value={type.id} className="whitespace-nowrap">
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {documentTypes.map(type => (
          <TabsContent key={type.id} value={type.id} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDocuments(type.id).map((doc) => (
                <DocumentCard
                  key={doc.id}
                  id={doc.id}
                  title={doc.title}
                  type={doc.doc_type || "Other"}
                  date={doc.date}
                  fileSize="N/A"
                  thumbnailUrl={docTypeToThumbnail(doc.doc_type)}
                  description={doc.description}
                  filePath={doc.file_path}
                  onClick={() => {}}
                />
              ))}
            </div>
            {filteredDocuments(type.id).length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  {searchQuery ? 
                    `No documents matching "${searchQuery}" in this category.` : 
                    "You haven't added any documents in this category yet."}
                </p>
                <Button variant="outline" className="mt-4" onClick={onUploadClick}>
                  Upload Document
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default DocumentsList;
