
import React from "react";
import { Download } from "lucide-react";
import { BookVolume } from "./types";

interface AllPdfsListProps {
  volumes: BookVolume[];
}

const AllPdfsList: React.FC<AllPdfsListProps> = ({ volumes }) => {
  return (
    <div className="space-y-6">
      {volumes.map((volume) => (
        <div key={volume.id} className="border rounded-lg overflow-hidden">
          <div className={`${volume.color} p-3 flex items-center gap-2`}>
            <volume.icon size={18} />
            <h3 className="font-medium">{volume.title}</h3>
          </div>
          <div className="p-4">
            <div className="divide-y">
              {volume.chapters.map((chapter) => (
                <div key={chapter.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{chapter.title}</p>
                    <p className="text-xs text-muted-foreground">{chapter.description}</p>
                  </div>
                  <a 
                    href={chapter.pdfUrl} 
                    download
                    className="flex items-center gap-1 px-3 py-1 bg-muted rounded-md hover:bg-muted/80"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPdfsList;
