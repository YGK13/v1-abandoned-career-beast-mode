
import React, { useState } from "react";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentCard from "@/components/DocumentCard";

interface Document {
  title: string;
  type: string;
  date: string;
  fileSize: string;
  thumbnailUrl: string;
}

interface DocumentsListProps {
  documents: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
      filtered = filtered.filter(doc => doc.type.toLowerCase() === type.toLowerCase());
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
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
              {filteredDocuments(type.id).map((doc, index) => (
                <DocumentCard
                  key={index}
                  title={doc.title}
                  type={doc.type}
                  date={doc.date}
                  fileSize={doc.fileSize}
                  thumbnailUrl={doc.thumbnailUrl}
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
                <Button variant="outline" className="mt-4">
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
