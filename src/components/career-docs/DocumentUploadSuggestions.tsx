
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Award, FileSpreadsheet, FileText } from "lucide-react";

const DocumentUploadSuggestions: React.FC = () => {
  const suggestedDocuments = [
    { 
      title: "Transcripts",
      description: "Academic records from colleges and high schools",
      icon: GraduationCap
    },
    { 
      title: "Job Descriptions",
      description: "Current and past job descriptions",
      icon: Briefcase
    },
    { 
      title: "Pay Records",
      description: "Recent pay stubs and total rewards statements",
      icon: FileSpreadsheet
    },
    { 
      title: "Credentials",
      description: "Diplomas, certifications, and continuing education proof",
      icon: Award
    },
    { 
      title: "Performance Reviews",
      description: "Performance evaluations and feedback documents",
      icon: FileText
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Suggested Documents to Upload</h2>
        <Button variant="outline" size="sm">See All Suggestions</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {suggestedDocuments.map((doc, index) => (
          <DashboardCard key={index} className="border-dashed hover:border-primary/50 transition-colors cursor-pointer h-full">
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <doc.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-medium mb-1">{doc.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{doc.description}</p>
              <Button variant="ghost" size="sm" className="mt-auto">
                Upload
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploadSuggestions;
