
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
import { BookOpen, BookText, Heart, Brain, Coffee, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
}

const BookSection: React.FC = () => {
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    }
  ];

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
                            <div className="flex items-center">
                              <BookText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm font-medium">{chapter.title}</span>
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
                          <div className="flex items-center mb-2">
                            <BookText className="h-4 w-4 mr-2 text-primary" />
                            <h4 className="font-medium">{chapter.title}</h4>
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BookSection;
