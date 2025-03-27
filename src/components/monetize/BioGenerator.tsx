
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Copy, RefreshCw, Save, Linkedin, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BioGeneratorFormValues {
  expertise: string;
  experience: string;
  achievements: string;
  targetAudience: string;
  platform: string;
  wordLimit: number;
  includeLinkedIn: boolean;
  includeCareerDocs: boolean;
}

const BioGenerator: React.FC = () => {
  const [generatedBio, setGeneratedBio] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkedInData, setLinkedInData] = useState<any>(null);
  const [careerDocs, setCareerDocs] = useState<any[]>([]);
  const [dataSourcesLoaded, setDataSourcesLoaded] = useState(false);

  const form = useForm<BioGeneratorFormValues>({
    defaultValues: {
      expertise: "",
      experience: "",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: 150,
      includeLinkedIn: true,
      includeCareerDocs: true
    }
  });

  // Simulate fetching LinkedIn profile data
  useEffect(() => {
    // In a real app, this would connect to your LinkedIn API integration
    const fetchLinkedInData = () => {
      // Simulated data
      return {
        skills: ["Leadership", "Product Management", "Digital Marketing", "Data Analysis"],
        headline: "Product Manager with 10+ years experience in SaaS",
        summary: "Results-driven product leader with experience scaling products from zero to millions in revenue.",
        positions: [
          { title: "Senior Product Manager", company: "Tech Solutions Inc.", duration: "3 years" },
          { title: "Product Manager", company: "Digital Innovations", duration: "4 years" },
        ]
      };
    };

    // Simulate fetching career documents
    const fetchCareerDocs = () => {
      // Simulated data
      return [
        { type: "Resume", content: "Led cross-functional teams to deliver enterprise solutions..." },
        { type: "Performance Review", content: "Exceeded targets by 40% through innovative product strategies..." },
        { type: "Professional Bio", content: "Experienced product leader with a track record of success..." }
      ];
    };

    // Set the data
    setLinkedInData(fetchLinkedInData());
    setCareerDocs(fetchCareerDocs());
    setDataSourcesLoaded(true);
  }, []);

  const onSubmit = (data: BioGeneratorFormValues) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a bio based on the input and integrated data sources
      const bio = generateEnhancedBio(data);
      setGeneratedBio(bio);
      setIsGenerating(false);
    }, 1500);
  };

  const generateEnhancedBio = (data: BioGeneratorFormValues) => {
    const { expertise, experience, achievements, targetAudience, wordLimit, includeLinkedIn, includeCareerDocs } = data;
    
    // Start with basic information
    let bioContent = `Experienced ${expertise} professional with ${experience} years in the industry. `;
    
    // Add achievements if provided
    if (achievements) {
      bioContent += `Known for ${achievements}. `;
    }
    
    // Include LinkedIn data if selected
    if (includeLinkedIn && linkedInData) {
      bioContent += `Specialized in ${linkedInData.skills.slice(0, 3).join(", ")}. `;
      bioContent += `${linkedInData.summary.substring(0, 100)}... `;
      
      if (linkedInData.positions && linkedInData.positions.length > 0) {
        const recentPosition = linkedInData.positions[0];
        bioContent += `Currently working as ${recentPosition.title} at ${recentPosition.company}. `;
      }
    }
    
    // Include career documents data if selected
    if (includeCareerDocs && careerDocs.length > 0) {
      // Extract relevant info from career docs
      const resumeDoc = careerDocs.find(doc => doc.type === "Resume");
      const bioDoc = careerDocs.find(doc => doc.type === "Professional Bio");
      
      if (resumeDoc) {
        bioContent += `${resumeDoc.content.substring(0, 80)}... `;
      }
      
      if (bioDoc) {
        bioContent += `${bioDoc.content.substring(0, 80)}... `;
      }
    }
    
    // Add target audience if provided
    if (targetAudience) {
      bioContent += `Helping ${targetAudience} achieve their goals. `;
    }
    
    // Add a call to action
    bioContent += "Let's connect to discuss how I can help you succeed!";
    
    // Trim to word limit
    const words = bioContent.split(' ');
    if (words.length > wordLimit) {
      bioContent = words.slice(0, wordLimit).join(' ') + '...';
    }
    
    return bioContent;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    toast.success("Bio copied to clipboard");
  };

  const regenerateBio = () => {
    if (form.formState.isValid) {
      onSubmit(form.getValues());
    } else {
      form.trigger();
    }
  };

  const saveBio = () => {
    // This would connect to a document storage functionality
    toast.success("Bio saved to your Career Assets");
  };

  return (
    <div className="mt-8 bg-card rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">Expert Bio Generator</h2>
      <p className="text-muted-foreground mb-6">Create a professional bio to showcase your expertise on consulting platforms by compiling data from your career resources</p>
      
      <Tabs defaultValue="generator">
        <TabsList className="mb-6">
          <TabsTrigger value="generator">Generate Bio</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Area of Expertise</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Digital Marketing, Leadership, Data Science" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="achievements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Achievements (optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Increased revenue by 30%, Published author, Industry awards" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Startups, Enterprise companies, Professionals" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Platform</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., LinkedIn, Upwork, Clarity.fm" {...field} />
                        </FormControl>
                        <FormDescription>Optimize your bio for a specific platform</FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="wordLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Word Limit</FormLabel>
                        <FormControl>
                          <Input type="number" min="50" max="500" {...field} />
                        </FormControl>
                        <FormDescription>Most platforms recommend 100-150 words</FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4 border rounded-md p-4 bg-secondary/10">
                    <h4 className="font-medium">Include Additional Data Sources</h4>
                    
                    <FormField
                      control={form.control}
                      name="includeLinkedIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="flex items-center gap-1">
                              <Linkedin className="h-4 w-4" /> LinkedIn Profile Data
                            </FormLabel>
                            <FormDescription>
                              Pull skills, experience, and summary from your LinkedIn profile
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="includeCareerDocs"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="flex items-center gap-1">
                              <FileText className="h-4 w-4" /> Career Documents
                            </FormLabel>
                            <FormDescription>
                              Include relevant content from uploaded resumes and existing bios
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isGenerating}>
                    {isGenerating ? "Generating..." : "Generate Bio"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Generated Bio</CardTitle>
                  <CardDescription>
                    Your professional bio preview
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {generatedBio ? (
                    <div className="bg-muted/30 p-4 rounded-md h-full">
                      <p className="whitespace-pre-wrap">{generatedBio}</p>
                    </div>
                  ) : (
                    <div className="bg-muted/30 p-4 rounded-md h-full flex items-center justify-center text-muted-foreground">
                      <p>Fill in the form and generate your professional bio</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={regenerateBio}
                    disabled={!generatedBio || isGenerating}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    disabled={!generatedBio}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={saveBio}
                    disabled={!generatedBio}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save to Assets
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">LinkedIn Data</h3>
              </div>
              {linkedInData ? (
                <div className="border rounded-md p-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Headline</h4>
                    <p className="text-sm text-muted-foreground">{linkedInData.headline}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Skills</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {linkedInData.skills.map((skill: string, index: number) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Experience</h4>
                    <div className="space-y-2 mt-1">
                      {linkedInData.positions.map((position: any, index: number) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">{position.title}</p>
                          <p className="text-muted-foreground">{position.company} · {position.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border rounded-md p-4 flex items-center justify-center h-40 text-muted-foreground">
                  {dataSourcesLoaded ? "No LinkedIn data available" : "Loading LinkedIn data..."}
                </div>
              )}
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Refresh LinkedIn Data
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Career Documents</h3>
              </div>
              {careerDocs.length > 0 ? (
                <div className="border rounded-md p-4 space-y-3">
                  {careerDocs.map((doc, index) => (
                    <div key={index} className="pb-3 border-b last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-sm">{doc.type}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{doc.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-4 flex items-center justify-center h-40 text-muted-foreground">
                  {dataSourcesLoaded ? "No career documents available" : "Loading career documents..."}
                </div>
              )}
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Manage Career Documents
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BioGenerator;
