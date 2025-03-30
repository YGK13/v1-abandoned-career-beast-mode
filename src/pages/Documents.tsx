
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import DocumentCard from "@/components/DocumentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, FileText, Upload, Image, ChevronDown, Filter, CloudUpload, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserDocuments, Document as DocumentType } from "@/services/documentService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { uploadDocument } from "@/services/documentService";

const Documents = () => {
  const navigate = useNavigate();
  const { session, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  // Form state for document upload
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("resume");
  const [docDescription, setDocDescription] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);
  
  // Document types
  const documentTypes = [
    { id: "all", name: "All Documents" },
    { id: "resume", name: "Resumes" },
    { id: "review", name: "Reviews" },
    { id: "certificate", name: "Certificates" },
    { id: "other", name: "Other" },
  ];
  
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
  
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!docTitle || !docType || !docFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select a file",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const { data, error } = await uploadDocument({
        title: docTitle,
        description: docDescription,
        doc_type: docType,
        file: docFile,
      });
      
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
        
        // Reset form and close dialog
        setDocTitle("");
        setDocType("resume");
        setDocDescription("");
        setDocFile(null);
        setShowUploadDialog(false);
        
        // Reload documents
        if (data) {
          setDocuments(prev => [data, ...prev]);
        } else {
          loadDocuments();
        }
      }
    } catch (error) {
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
  
  const filteredDocuments = (type: string) => {
    let filtered = documents;
    
    if (type !== "all") {
      filtered = filtered.filter(doc => doc.doc_type === type);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.doc_type && doc.doc_type.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
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
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Document Repository</h1>
              <p className="text-muted-foreground mt-1">Manage your career documents</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus size={16} />
                    <span>Add Document</span>
                    <ChevronDown size={14} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem 
                    className="flex gap-2 cursor-pointer"
                    onClick={() => setShowUploadDialog(true)}
                  >
                    <Upload size={16} />
                    <span>Upload File</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 cursor-pointer">
                    <FileText size={16} />
                    <span>Create Resume</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2 cursor-pointer">
                    <Image size={16} />
                    <span>Capture Screenshot</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        <DashboardCard 
          className="mb-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <CloudUpload size={24} className="text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-1">Upload your documents securely</h3>
              <p className="text-muted-foreground">
                Drag and drop files here or click to browse. We support PDF, DOCX, JPG, and PNG.
              </p>
            </div>
            <Button 
              className="flex-shrink-0"
              onClick={() => setShowUploadDialog(true)}
            >
              Upload Files
            </Button>
          </div>
        </DashboardCard>
        
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
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
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
                      title={doc.title}
                      type={doc.doc_type || "Other"}
                      date={new Date(doc.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      fileSize="N/A"
                      thumbnailUrl={docTypeToThumbnail(doc.doc_type)}
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
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowUploadDialog(true)}
                    >
                      Upload Document
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
        
        {/* Document Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a document to your secure storage
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleUploadSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="required">Document Title</Label>
                  <Input
                    id="title"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Resume 2023"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="docType" className="required">Document Type</Label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resume">Resume</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={docDescription}
                    onChange={(e) => setDocDescription(e.target.value)}
                    placeholder="Brief description of this document"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="file" className="required">File</Label>
                  <div className="border border-input rounded-md p-4">
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                      className="cursor-pointer"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DOCX, JPG, PNG
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowUploadDialog(false)}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : "Upload Document"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

// Helper function to get a thumbnail URL based on document type
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

export default Documents;
