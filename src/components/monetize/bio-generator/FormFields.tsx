
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Linkedin, FileText, AlertCircle } from "lucide-react";
import { useBioGenerator } from "../BioGeneratorContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FormFields: React.FC = () => {
  const { form, isGenerating, onSubmit } = useBioGenerator();
  const formErrors = form.formState.errors;
  const hasErrors = Object.keys(formErrors).length > 0;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {hasErrors && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors below before submitting
            </AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="expertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Area of Expertise</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Digital Marketing, Leadership, Data Science" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
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
  );
};

export default FormFields;
