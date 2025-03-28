
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Plus, Trash2, Star, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types
export interface Accomplishment {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  impact: string;
}

const categories = [
  "Project Completion",
  "Skill Development",
  "Recognition",
  "Leadership",
  "Innovation",
  "Client Success",
  "Professional Development",
  "Revenue Impact",
  "Process Improvement",
  "Other"
];

const AccomplishmentTracker: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [newAccomplishment, setNewAccomplishment] = useState<Accomplishment>({
    id: "",
    title: "",
    description: "",
    category: "Project Completion",
    date: format(new Date(), "yyyy-MM-dd"),
    impact: ""
  });
  
  // Load accomplishments from localStorage on component mount
  useEffect(() => {
    const savedAccomplishments = localStorage.getItem("accomplishments");
    if (savedAccomplishments) {
      setAccomplishments(JSON.parse(savedAccomplishments));
    }
  }, []);
  
  // Save accomplishments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("accomplishments", JSON.stringify(accomplishments));
  }, [accomplishments]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewAccomplishment({
      ...newAccomplishment,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCategoryChange = (value: string) => {
    setNewAccomplishment({
      ...newAccomplishment,
      category: value
    });
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setNewAccomplishment({
        ...newAccomplishment,
        date: format(date, "yyyy-MM-dd")
      });
    }
  };
  
  const addAccomplishment = () => {
    if (!newAccomplishment.title) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your accomplishment",
        variant: "destructive"
      });
      return;
    }
    
    const accomplishment: Accomplishment = {
      ...newAccomplishment,
      id: Date.now().toString(),
    };
    
    setAccomplishments([accomplishment, ...accomplishments]);
    
    // Reset form
    setNewAccomplishment({
      id: "",
      title: "",
      description: "",
      category: "Project Completion",
      date: format(new Date(), "yyyy-MM-dd"),
      impact: ""
    });
    
    toast({
      title: "Accomplishment added",
      description: "Your career accomplishment has been recorded",
      variant: "default"
    });
  };
  
  const deleteAccomplishment = (id: string) => {
    setAccomplishments(accomplishments.filter(item => item.id !== id));
    toast({
      title: "Accomplishment deleted",
      description: "The selected accomplishment has been removed",
      variant: "default"
    });
  };
  
  const viewReports = () => {
    toast({
      title: "Coming Soon",
      description: "Weekly, monthly, and yearly reports will be available soon",
      variant: "default"
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Track Your Accomplishments
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                name="title"
                value={newAccomplishment.title}
                onChange={handleInputChange}
                placeholder="E.g., Completed sales presentation, Learned new skill"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select 
                  value={newAccomplishment.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                name="description"
                value={newAccomplishment.description}
                onChange={handleInputChange}
                placeholder="Describe what you accomplished..."
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Impact</label>
              <Textarea
                name="impact"
                value={newAccomplishment.impact}
                onChange={handleInputChange}
                placeholder="How did this benefit you, your team, or your company?"
                rows={2}
              />
            </div>
            
            <Button onClick={addAccomplishment} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Accomplishment
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {accomplishments.length > 0 && (
        <Card>
          <CardHeader className="bg-muted/30 flex flex-row items-center justify-between">
            <CardTitle>Recent Accomplishments</CardTitle>
            <Button variant="outline" size="sm" onClick={viewReports}>
              View Reports <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {accomplishments.map(accomplishment => (
                <div 
                  key={accomplishment.id} 
                  className="border rounded-md p-4 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{accomplishment.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{accomplishment.category}</span>
                        <span>•</span>
                        <span>{format(new Date(accomplishment.date), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteAccomplishment(accomplishment.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  
                  {accomplishment.description && (
                    <p className="mt-3 text-sm">{accomplishment.description}</p>
                  )}
                  
                  {accomplishment.impact && (
                    <div className="mt-3 text-sm border-l-2 border-primary/20 pl-3">
                      <span className="font-medium">Impact: </span>
                      {accomplishment.impact}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccomplishmentTracker;
