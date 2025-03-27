
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export type CareerTemplate = {
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
};

interface CareerTemplatesProps {
  templates: CareerTemplate[];
}

const CareerTemplates: React.FC<CareerTemplatesProps> = ({ templates }) => {
  // Group templates by category
  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, CareerTemplate[]>);

  return (
    <div className="space-y-6 mb-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Career Templates</h2>
        <Button variant="outline" size="sm">
          View All Templates
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-300px)]">
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTemplates.map((template, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText size={16} className="text-primary" />
                      </div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full flex items-center gap-2"
                      onClick={() => window.open(template.downloadUrl, "_blank")}
                    >
                      <Download size={14} />
                      <span>Download Template</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default CareerTemplates;
