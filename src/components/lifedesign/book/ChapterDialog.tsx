
import React from "react";
import { Download, BookOpen } from "lucide-react";
import { BookChapter, BookVolume } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ChapterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chapter: BookChapter | null;
  volume: BookVolume | null;
}

const ChapterDialog: React.FC<ChapterDialogProps> = ({
  open,
  onOpenChange,
  chapter,
  volume,
}) => {
  if (!chapter || !volume) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className={`inline-flex px-2 py-1 rounded-md text-sm ${volume.badgeColor} mb-2`}>
            {volume.title}
          </div>
          <DialogTitle>{chapter.title}</DialogTitle>
          <DialogDescription>{chapter.description}</DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/30 p-4 rounded-md mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Key Points</h4>
          </div>
          <ul className="space-y-1">
            {chapter.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 flex justify-center">
          <object
            data={chapter.pdfUrl}
            type="application/pdf"
            width="100%"
            height="400px"
            className="border rounded-md"
          >
            <p>
              It appears your browser doesn't support embedded PDFs. You can{" "}
              <a 
                href={chapter.pdfUrl} 
                download
                className="text-primary underline"
              >
                download the PDF
              </a>{" "}
              instead.
            </p>
          </object>
        </div>
        
        <div className="flex justify-end mt-6">
          <a 
            href={chapter.pdfUrl} 
            download
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            <Download className="h-4 w-4 mr-2" />
            <span>Download Full Chapter</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterDialog;
