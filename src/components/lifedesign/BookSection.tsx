
import React, { useState } from "react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, BookText, Heart, Brain, Coffee, PenTool, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface BookVolume {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  badgeColor: string;
  chapters: BookChapter[];
}

interface BookChapter {
  id: number;
  title: string;
  description: string;
  keyPoints: string[];
  pdfUrl: string;
}

const BookSection: React.FC = () => {
  const [openChapterDialog, setOpenChapterDialog] = useState<{volumeId: number, chapterId: number} | null>(null);
  
  const handleOpenChapter = (volumeId: number, chapterId: number) => {
    setOpenChapterDialog({ volumeId, chapterId });
  };

  const volumes: BookVolume[] = [
    {
      id: 1,
      title: "Volume 1: Be Your Own Commander-in-Chief",
      subtitle: "Building your identity and personal leadership",
      icon: Heart,
      color: "bg-rose-100 text-rose-700",
      badgeColor: "bg-rose-100 border-rose-200 text-rose-700",
      chapters: [
        {
          id: 1,
          title: "Chapter 1: The Four Conversations",
          description: "Understanding the framework of conversations with Self, Others, Environment, and Work",
          keyPoints: [
            "The Self conversation builds identity and values",
            "The Others conversation creates connection and influence",
            "The Environment conversation shapes your surroundings for success",
            "The Work conversation masters your craft and career"
          ],
          pdfUrl: "/pdfs/volume-1-chapter-1-four-conversations.pdf"
        },
        {
          id: 2,
          title: "Chapter 2: Identity Design",
          description: "Crafting who you are and who you want to become",
          keyPoints: [
            "Identity is shaped by your consistent actions and choices",
            "You can intentionally design your identity through habits",
            "Values serve as the foundation for identity design",
            "Small identity shifts create significant life changes"
          ],
          pdfUrl: "/pdfs/volume-1-chapter-2-identity-design.pdf"
        },
        {
          id: 3,
          title: "Chapter 3: Mental Models",
          description: "Building effective frameworks for thinking and decision-making",
          keyPoints: [
            "Mental models are the lenses through which we interpret reality",
            "Diverse mental models lead to more effective problem-solving",
            "Challenging assumptions reveals hidden mental models",
            "Regular mental model audits improve decision quality"
          ],
          pdfUrl: "/pdfs/volume-1-chapter-3-mental-models.pdf"
        }
      ]
    },
    {
      id: 2,
      title: "Volume 2: Mastering Communication",
      subtitle: "Building meaningful connections and influence",
      icon: Brain,
      color: "bg-blue-100 text-blue-700",
      badgeColor: "bg-blue-100 border-blue-200 text-blue-700",
      chapters: [
        {
          id: 1,
          title: "Chapter 1: Communication Fundamentals",
          description: "The foundations of effective communication across all contexts",
          keyPoints: [
            "Active listening is the cornerstone of effective communication",
            "Non-verbal cues often convey more than words",
            "Emotional intelligence amplifies communication effectiveness",
            "Context awareness shapes appropriate communication styles"
          ],
          pdfUrl: "/pdfs/volume-2-chapter-1-communication-fundamentals.pdf"
        },
        {
          id: 2,
          title: "Chapter 2: Relationship Building",
          description: "Creating and nurturing meaningful connections",
          keyPoints: [
            "Trust is built in small moments of vulnerability and reliability",
            "Authentic curiosity creates deeper connections",
            "Boundaries establish healthy relationship frameworks",
            "Regular investment maintains relationship strength"
          ],
          pdfUrl: "/pdfs/volume-2-chapter-2-relationship-building.pdf"
        },
        {
          id: 3,
          title: "Chapter 3: Influence and Persuasion",
          description: "Ethically shaping perspectives and decisions",
          keyPoints: [
            "Influence begins with understanding others' values and motivations",
            "Stories persuade more effectively than facts alone",
            "Reciprocity creates natural opportunities for influence",
            "Genuine advocacy for others' interests builds lasting influence"
          ],
          pdfUrl: "/pdfs/volume-2-chapter-3-influence-persuasion.pdf"
        }
      ]
    },
    {
      id: 3,
      title: "Volume 3: Optimal Environments",
      subtitle: "Designing spaces and routines that support your success",
      icon: Coffee,
      color: "bg-amber-100 text-amber-700",
      badgeColor: "bg-amber-100 border-amber-200 text-amber-700",
      chapters: [
        {
          id: 1,
          title: "Chapter 1: Physical Environment Design",
          description: "Creating spaces that enhance focus, creativity, and well-being",
          keyPoints: [
            "Your environment is either enhancing your energy or draining it",
            "Physical spaces should be designed for specific activities",
            "Environmental cues can trigger desired behaviors automatically",
            "Regular environment audits maintain optimal conditions"
          ],
          pdfUrl: "/pdfs/volume-3-chapter-1-physical-environment.pdf"
        },
        {
          id: 2,
          title: "Chapter 2: Health Optimization",
          description: "Building the physical foundation for peak performance",
          keyPoints: [
            "Health is the foundation upon which all other success is built",
            "Sleep quality affects every aspect of cognitive performance",
            "Nutrition directly impacts energy, focus, and mood stability",
            "Movement patterns should be integrated throughout the day"
          ],
          pdfUrl: "/pdfs/volume-3-chapter-2-health-optimization.pdf"
        },
        {
          id: 3,
          title: "Chapter 3: Digital Environment Design",
          description: "Managing technology for focus and wellbeing",
          keyPoints: [
            "Digital environments require intentional boundaries and design",
            "Notifications interrupt deep thinking and shift cognitive resources",
            "Digital tools should be evaluated for their impact on mental health",
            "Regular digital detox periods restore attention and creativity"
          ],
          pdfUrl: "/pdfs/volume-3-chapter-3-digital-environment.pdf"
        }
      ]
    },
    {
      id: 4,
      title: "Volume 4: Career Mastery",
      subtitle: "Developing rare skills and creating meaningful impact",
      icon: PenTool,
      color: "bg-emerald-100 text-emerald-700",
      badgeColor: "bg-emerald-100 border-emerald-200 text-emerald-700",
      chapters: [
        {
          id: 1,
          title: "Chapter 1: Skill Development",
          description: "Building valuable expertise through deliberate practice",
          keyPoints: [
            "Career capital comes from developing rare and valuable skills",
            "Deliberate practice requires focused attention on weak areas",
            "Feedback loops accelerate skill development",
            "Interdisciplinary skills create unique value combinations"
          ],
          pdfUrl: "/pdfs/volume-4-chapter-1-skill-development.pdf"
        },
        {
          id: 2,
          title: "Chapter 2: Purpose and Meaning",
          description: "Connecting your work to deeper values and impact",
          keyPoints: [
            "Purpose-driven work connects daily actions to meaningful impact",
            "Values alignment prevents burnout and sustains motivation",
            "Impact can be measured in multiple dimensions beyond money",
            "Regular purpose reviews ensure continued alignment"
          ],
          pdfUrl: "/pdfs/volume-4-chapter-2-purpose-meaning.pdf"
        },
        {
          id: 3,
          title: "Chapter 3: Career Strategy",
          description: "Planning career moves for long-term growth and impact",
          keyPoints: [
            "Career strategy requires both opportunity exploration and focused execution",
            "Adjacent possible moves often yield better results than radical jumps",
            "Network cultivation creates unexpected opportunities",
            "Regular career strategy reviews prevent stagnation"
          ],
          pdfUrl: "/pdfs/volume-4-chapter-3-career-strategy.pdf"
        }
      ]
    }
  ];

  // Function to find a specific chapter
  const findChapter = (volumeId: number, chapterId: number) => {
    const volume = volumes.find(v => v.id === volumeId);
    if (!volume) return null;
    return volume.chapters.find(c => c.id === chapterId) || null;
  };

  // Selected chapter for dialog display
  const selectedChapter = openChapterDialog ? 
    findChapter(openChapterDialog.volumeId, openChapterDialog.chapterId) : null;
  
  const selectedVolume = openChapterDialog ? 
    volumes.find(v => v.id === openChapterDialog.volumeId) : null;

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
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="volumes">
          <TabsList className="mb-6">
            <TabsTrigger value="volumes">Volumes</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="all-pdfs">All PDFs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="volumes">
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
                                onClick={() => handleOpenChapter(volume.id, chapter.id)}
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
          </TabsContent>
          
          <TabsContent value="chapters">
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
                                onClick={() => handleOpenChapter(volume.id, chapter.id)}
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
          </TabsContent>

          <TabsContent value="all-pdfs">
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
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Chapter Dialog */}
      <Dialog 
        open={openChapterDialog !== null} 
        onOpenChange={(open) => {
          if (!open) setOpenChapterDialog(null);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedChapter && selectedVolume && (
            <>
              <DialogHeader>
                <div className={`inline-flex px-2 py-1 rounded-md text-sm ${selectedVolume.badgeColor} mb-2`}>
                  {selectedVolume.title}
                </div>
                <DialogTitle>{selectedChapter.title}</DialogTitle>
                <DialogDescription>{selectedChapter.description}</DialogDescription>
              </DialogHeader>
              
              <div className="bg-muted/30 p-4 rounded-md mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Key Points</h4>
                </div>
                <ul className="space-y-1">
                  {selectedChapter.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex justify-center">
                <object
                  data={selectedChapter.pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="400px"
                  className="border rounded-md"
                >
                  <p>
                    It appears your browser doesn't support embedded PDFs. You can{" "}
                    <a 
                      href={selectedChapter.pdfUrl} 
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
                  href={selectedChapter.pdfUrl} 
                  download
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download Full Chapter</span>
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BookSection;
