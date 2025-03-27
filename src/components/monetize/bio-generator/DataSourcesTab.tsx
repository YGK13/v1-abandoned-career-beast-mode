
import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, FileText } from "lucide-react";
import { useBioGenerator } from "../BioGeneratorContext";

const DataSourcesTab: React.FC = () => {
  const { linkedInData, careerDocs, dataSourcesLoaded } = useBioGenerator();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Linkedin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">LinkedIn Data</h3>
        </div>
        {linkedInData ? (
          <div className="border rounded-md p-4 space-y-3">
            <div>
              <h4 className="font-medium text-sm">Headline</h4>
              <p className="text-sm text-muted-foreground">{linkedInData.headline}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Skills</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {linkedInData.skills.map((skill: string, index: number) => (
                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm">Experience</h4>
              <div className="space-y-2 mt-1">
                {linkedInData.positions.map((position: any, index: number) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{position.title}</p>
                    <p className="text-muted-foreground">{position.company} · {position.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-md p-4 flex items-center justify-center h-40 text-muted-foreground">
            {dataSourcesLoaded ? "No LinkedIn data available" : "Loading LinkedIn data..."}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Refresh LinkedIn Data
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Career Documents</h3>
        </div>
        {careerDocs.length > 0 ? (
          <div className="border rounded-md p-4 space-y-3">
            {careerDocs.map((doc, index) => (
              <div key={index} className="pb-3 border-b last:border-b-0 last:pb-0">
                <h4 className="font-medium text-sm">{doc.type}</h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{doc.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-md p-4 flex items-center justify-center h-40 text-muted-foreground">
            {dataSourcesLoaded ? "No career documents available" : "Loading career documents..."}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Manage Career Documents
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataSourcesTab;
