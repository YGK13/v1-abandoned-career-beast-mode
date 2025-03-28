
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Star, 
  Calendar, 
  Trophy, 
  Plus, 
  Clock, 
  Award, 
  Check, 
  Trash2,
  BarChart
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Define the form schema
const accomplishmentSchema = z.object({
  title: z.string().min(2, { message: "Title should be at least 2 characters" }),
  description: z.string().min(5, { message: "Please provide more details" }),
  category: z.string(),
  date: z.string(),
  impact: z.string().optional(),
});

type AccomplishmentFormValues = z.infer<typeof accomplishmentSchema>;

// Define the accomplishment type
interface Accomplishment {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  impact?: string;
}

const AccomplishmentTracker: React.FC = () => {
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([
    {
      id: "1",
      title: "Completed Professional Development Course",
      description: "Finished the 'Leadership in Tech' course with certification",
      category: "learning",
      date: "2023-08-15",
      impact: "Enhanced leadership skills and added credential to LinkedIn"
    },
    {
      id: "2",
      title: "Led cross-functional team meeting",
      description: "Organized and facilitated collaboration between engineering and design teams",
      category: "leadership",
      date: "2023-08-22",
      impact: "Improved team communication and project alignment"
    }
  ]);
  
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<AccomplishmentFormValues>({
    resolver: zodResolver(accomplishmentSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "achievement",
      date: format(new Date(), "yyyy-MM-dd"),
      impact: "",
    },
  });
  
  // Submit handler
  const onSubmit = (values: AccomplishmentFormValues) => {
    const newAccomplishment: Accomplishment = {
      id: Math.random().toString(36).substring(2, 9),
      ...values,
    };
    
    setAccomplishments([newAccomplishment, ...accomplishments]);
    
    toast({
      title: "Accomplishment tracked!",
      description: "Your achievement has been added to your career journal",
      variant: "default"
    });
    
    form.reset({
      title: "",
      description: "",
      category: "achievement",
      date: format(new Date(), "yyyy-MM-dd"),
      impact: "",
    });
  };
  
  // Delete accomplishment
  const deleteAccomplishment = (id: string) => {
    setAccomplishments(accomplishments.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The accomplishment has been deleted from your records",
      variant: "default"
    });
  };
  
  // Generate weekly report
  const generateWeeklyReport = () => {
    // In a real app, this would generate and send a report
    toast({
      title: "Weekly report generated",
      description: "Your accomplishment summary has been sent to your email",
      variant: "default"
    });
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case "learning":
        return <Star className="h-4 w-4 text-purple-500" />;
      case "leadership":
        return <Award className="h-4 w-4 text-blue-500" />;
      case "milestone":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Track Your Accomplishments
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accomplishment Title</FormLabel>
                        <FormControl>
                          <Input placeholder="What did you accomplish?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what you did and how you did it..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="achievement">Achievement</SelectItem>
                            <SelectItem value="learning">Learning</SelectItem>
                            <SelectItem value="leadership">Leadership</SelectItem>
                            <SelectItem value="milestone">Milestone</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impact or Result</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="How did this accomplishment make a difference?" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-2">
                <Button type="submit">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Accomplishment
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="flex justify-between items-center pt-6 pb-4">
            <h3 className="font-medium">Recent Accomplishments</h3>
            <Button variant="outline" size="sm" onClick={generateWeeklyReport}>
              <Calendar className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
          
          <div className="space-y-4">
            {accomplishments.map((item) => (
              <div 
                key={item.id} 
                className="border rounded-md p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <h4 className="font-medium">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{format(new Date(item.date), "MMM d, yyyy")}</span>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => deleteAccomplishment(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                {item.impact && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Impact:</span> {item.impact}
                  </div>
                )}
              </div>
            ))}
            
            {accomplishments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No accomplishments tracked yet. Add your first one!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccomplishmentTracker;
