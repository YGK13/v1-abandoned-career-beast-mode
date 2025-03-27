
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Copy, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";

interface BioGeneratorFormValues {
  expertise: string;
  experience: string;
  achievements: string;
  targetAudience: string;
  platform: string;
  wordLimit: number;
}

const BioGenerator: React.FC = () => {
  const [generatedBio, setGeneratedBio] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<BioGeneratorFormValues>({
    defaultValues: {
      expertise: "",
      experience: "",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: 150
    }
  });

  const onSubmit = (data: BioGeneratorFormValues) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a sample bio based on the input
      const bio = generateSampleBio(data);
      setGeneratedBio(bio);
      setIsGenerating(false);
    }, 1500);
  };

  const generateSampleBio = (data: BioGeneratorFormValues) => {
    const { expertise, experience, achievements, targetAudience, wordLimit } = data;
    
    // Create a sample bio based on inputs
    let bio = `Experienced ${expertise} professional with ${experience} years in the industry. `;
    
    if (achievements) {
      bio += `Known for ${achievements}. `;
    }
    
    if (targetAudience) {
      bio += `Helping ${targetAudience} achieve their goals. `;
    }
    
    // Add a call to action
    bio += "Let's connect to discuss how I can help you succeed!";
    
    // Trim to word limit
    const words = bio.split(' ');
    if (words.length > wordLimit) {
      bio = words.slice(0, wordLimit).join(' ') + '...';
    }
    
    return bio;
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
      <p className="text-muted-foreground mb-6">Create a professional bio to showcase your expertise on consulting platforms</p>
      
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
    </div>
  );
};

export default BioGenerator;
