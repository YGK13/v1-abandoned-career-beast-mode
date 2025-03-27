
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
export type ResourceLink = {
  text: string;
  url: string;
};

export type CareerResource = {
  title: string;
  description: string;
  links: ResourceLink[];
  icon: LucideIcon;
};

interface CareerResourcesProps {
  resources: CareerResource[];
}

const CareerResources: React.FC<CareerResourcesProps> = ({ resources }) => {
  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {resources.map((resource, index) => (
          <Card key={index} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <resource.icon size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <ul className="space-y-2">
                {resource.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CareerResources;
