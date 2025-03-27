
import React from "react";
import Layout from "@/components/Layout";
import DocumentsList from "@/components/career-docs/DocumentsList";
import DocumentActions from "@/components/career-docs/DocumentActions";
import UploadDocumentSection from "@/components/career-docs/UploadDocumentSection";
import DocumentUploadSuggestions from "@/components/career-docs/DocumentUploadSuggestions";
import CareerTemplates from "@/components/career-docs/CareerTemplates";
import { careerTemplates } from "@/data/careerTemplatesData";

const CareerDocs = () => {
  // Document data would ideally come from an API or context
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

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Career Documentation</h1>
              <p className="text-muted-foreground mt-1">Manage and optimize your career assets</p>
            </div>
            <DocumentActions />
          </div>
        </header>
        
        {/* Career Templates Section */}
        <CareerTemplates templates={careerTemplates} />
        
        {/* Document Upload Suggestions */}
        <DocumentUploadSuggestions />
        
        {/* Upload Document Section */}
        <UploadDocumentSection />
        
        {/* Documents List */}
        <DocumentsList documents={documents} />
      </div>
    </Layout>
  );
};

export default CareerDocs;
