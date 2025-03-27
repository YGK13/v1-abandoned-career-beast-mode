
import React from "react";
import { Download, BookOpen, File } from "lucide-react";
import { BookChapter, BookVolume } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
          <DialogTitle className="flex items-center justify-between">
            <span>{chapter.title}</span>
            <a 
              href={chapter.pdfUrl} 
              download
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 bg-primary text-primary-foreground shadow hover:bg-primary/90"
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Download Chapter PDF</span>
            </a>
          </DialogTitle>
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

        <Separator className="my-4" />
        
        <div className="mt-6">
          <div className="mb-3 flex items-center">
            <File className="h-4 w-4 mr-2 text-primary" />
            <h4 className="font-medium">Chapter PDF Preview</h4>
          </div>
          <object
            data={chapter.pdfUrl}
            type="application/pdf"
            width="100%"
            height="500px"
            className="border rounded-md"
          >
            <p className="p-4 text-center">
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
      </DialogContent>
    </Dialog>
  );
};

export default ChapterDialog;
