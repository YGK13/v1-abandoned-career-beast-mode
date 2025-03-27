
import React from "react";
import { BookText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookVolume } from "./types";

interface VolumesListProps {
  volumes: BookVolume[];
  onChapterSelect: (volumeId: number, chapterId: number) => void;
}

const VolumesList: React.FC<VolumesListProps> = ({ volumes, onChapterSelect }) => {
  return (
    <div className="space-y-6">
      {volumes.map((volume) => (
        <div key={volume.id} className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${volume.color} flex items-center justify-center`}>
              <volume.icon size={20} />
            </div>
            <div>
              <h3 className="font-medium">{volume.title}</h3>
              <p className="text-sm text-muted-foreground">{volume.subtitle}</p>
              
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {volume.chapters.map((chapter) => (
                  <div key={chapter.id} className="p-2 bg-muted/30 rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">{chapter.title}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onChapterSelect(volume.id, chapter.id)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolumesList;
