
import React from "react";
import { BookText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { BookVolume } from "./types";

interface ChaptersListProps {
  volumes: BookVolume[];
  onChapterSelect: (volumeId: number, chapterId: number) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ volumes, onChapterSelect }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {volumes.map((volume) => (
        <AccordionItem key={volume.id} value={`volume-${volume.id}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${volume.color} flex items-center justify-center`}>
                <volume.icon size={16} />
              </div>
              <div className="text-left">
                <span className="font-medium">{volume.title}</span>
                <p className="text-xs text-muted-foreground">{volume.subtitle}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-10 space-y-4">
              {volume.chapters.map((chapter) => (
                <div key={chapter.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <BookText className="h-4 w-4 mr-2 text-primary" />
                      <h4 className="font-medium">{chapter.title}</h4>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onChapterSelect(volume.id, chapter.id)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        <span>View</span>
                      </Button>
                      <a 
                        href={chapter.pdfUrl} 
                        download
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{chapter.description}</p>
                  
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm font-medium mb-2">Key Points:</p>
                    <ul className="text-sm space-y-1">
                      {chapter.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ChaptersList;
