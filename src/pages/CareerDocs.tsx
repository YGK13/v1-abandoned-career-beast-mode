
import React, { useState } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import DocumentCard from "@/components/DocumentCard";
import LinkedInProfile from "@/components/career-docs/LinkedInProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, FileText, Upload, Image, ChevronDown, Filter, CloudUpload } from "lucide-react";

const CareerDocs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data
  const documentTypes = [
    { id: "all", name: "All Documents" },
    { id: "resume", name: "Resumes" },
    { id: "review", name: "Reviews" },
    { id: "certificate", name: "Certificates" },
    { id: "other", name: "Other" },
  ];
  
  const documents = [
    { 
      title: "Product Manager Resume", 
      type: "Resume", 
      date: "Apr 15, 2023", 
      fileSize: "420 KB", 
      thumbnailUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Performance Review Q1", 
      type: "Review", 
      date: "Mar 30, 2023", 
      fileSize: "250 KB",
      thumbnailUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Scrum Master Certification", 
      type: "Certificate", 
      date: "Feb 12, 2023", 
      fileSize: "1.2 MB",
      thumbnailUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Leadership Training Completion", 
      type: "Certificate", 
      date: "Jan 05, 2023", 
      fileSize: "850 KB",
      thumbnailUrl: "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Tech Lead Resume", 
      type: "Resume", 
      date: "Dec 18, 2022", 
      fileSize: "380 KB",
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Performance Review Q4", 
      type: "Review", 
      date: "Dec 05, 2022", 
      fileSize: "275 KB",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      title: "Data Science Certificate", 
      type: "Certificate", 
      date: "Nov 20, 2022", 
      fileSize: "1.5 MB",
      thumbnailUrl: "https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=1974&auto=format&fit=crop" 
    },
    { 
      title: "Project Presentation", 
      type: "Other", 
      date: "Oct 10, 2022", 
      fileSize: "3.2 MB",
      thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
    },
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
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Career Documentation</h1>
              <p className="text-muted-foreground mt-1">Manage and optimize your career assets</p>
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
                  <DropdownMenuItem className="flex gap-2 cursor-pointer">
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
        
        {/* LinkedIn Profile Section */}
        <LinkedInProfile />
        
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
            <Button className="flex-shrink-0">
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
      </div>
    </Layout>
  );
};

export default CareerDocs;
