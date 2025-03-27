
import React, { useState } from "react";
import { BookOpen, Download } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { bookVolumes } from "./data";
import ChapterDialog from "./ChapterDialog";
import VolumesList from "./VolumesList";
import ChaptersList from "./ChaptersList";
import AllPdfsList from "./AllPdfsList";
import { BookChapter, BookVolume } from "./types";

const BookSection: React.FC = () => {
  const [openChapterDialog, setOpenChapterDialog] = useState<{volumeId: number, chapterId: number} | null>(null);
  
  const handleOpenChapter = (volumeId: number, chapterId: number) => {
    setOpenChapterDialog({ volumeId, chapterId });
  };

  // Function to find a specific chapter
  const findChapter = (volumeId: number, chapterId: number) => {
    const volume = bookVolumes.find(v => v.id === volumeId);
    if (!volume) return null;
    return volume.chapters.find(c => c.id === chapterId) || null;
  };

  // Selected chapter for dialog display
  const selectedChapter = openChapterDialog ? 
    findChapter(openChapterDialog.volumeId, openChapterDialog.chapterId) : null;
  
  const selectedVolume = openChapterDialog ? 
    bookVolumes.find(v => v.id === openChapterDialog.volumeId) : null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>Life Design Library</CardTitle>
        </div>
        <CardDescription>
          Explore the complete Be Your Own Commander-in-Chief book series
        </CardDescription>
        <div className="flex items-center mt-2 space-x-2">
          {bookVolumes.map((volume) => (
            <a 
              key={volume.id} 
              href={`/pdfs/volume-${volume.id}-full.pdf`}
              download
              className="inline-flex items-center text-sm font-medium h-9 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Volume {volume.id} PDF
            </a>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="volumes">
          <TabsList className="mb-6">
            <TabsTrigger value="volumes">Volumes</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="all-pdfs">All PDFs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="volumes">
            <VolumesList 
              volumes={bookVolumes} 
              onChapterSelect={handleOpenChapter} 
            />
          </TabsContent>
          
          <TabsContent value="chapters">
            <ChaptersList 
              volumes={bookVolumes} 
              onChapterSelect={handleOpenChapter} 
            />
          </TabsContent>

          <TabsContent value="all-pdfs">
            <AllPdfsList volumes={bookVolumes} />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Chapter Dialog */}
      <ChapterDialog
        open={openChapterDialog !== null}
        onOpenChange={(open) => {
          if (!open) setOpenChapterDialog(null);
        }}
        chapter={selectedChapter}
        volume={selectedVolume}
      />
    </Card>
  );
};

export default BookSection;
