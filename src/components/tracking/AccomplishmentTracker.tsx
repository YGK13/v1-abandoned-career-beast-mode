
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckSquare, Calendar as CalendarIcon2, BarChart, Award, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Types for accomplishments
export interface Accomplishment {
  id: string;
  title: string;
  category: string;
  date: Date;
  completed: boolean;
  points: number;
}

const CATEGORIES = [
  "Networking",
  "Skill Development",
  "Personal Branding",
  "Job Applications",
  "Learning",
  "Career Growth"
];

const AccomplishmentTracker: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [newAccomplishment, setNewAccomplishment] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const { toast } = useToast();

  // Load accomplishments from localStorage
  useEffect(() => {
    const savedAccomplishments = localStorage.getItem('careerAccomplishments');
    if (savedAccomplishments) {
      const parsed = JSON.parse(savedAccomplishments);
      // Convert string dates back to Date objects
      const withDates = parsed.map((a: any) => ({
        ...a,
        date: new Date(a.date)
      }));
      setAccomplishments(withDates);
    } else {
      // Sample data if no saved accomplishments
      const sampleAccomplishments: Accomplishment[] = [
        {
          id: "1",
          title: "Updated LinkedIn profile",
          category: "Personal Branding",
          date: new Date(new Date().setDate(new Date().getDate() - 2)),
          completed: true,
          points: 10
        },
        {
          id: "2",
          title: "Completed React course",
          category: "Skill Development",
          date: new Date(new Date().setDate(new Date().getDate() - 5)),
          completed: true,
          points: 20
        },
        {
          id: "3",
          title: "Connected with industry leader",
          category: "Networking",
          date: new Date(new Date().setDate(new Date().getDate() - 1)),
          completed: true,
          points: 15
        }
      ];
      setAccomplishments(sampleAccomplishments);
      localStorage.setItem('careerAccomplishments', JSON.stringify(sampleAccomplishments));
    }
  }, []);

  // Save accomplishments whenever they change
  useEffect(() => {
    if (accomplishments.length > 0) {
      localStorage.setItem('careerAccomplishments', JSON.stringify(accomplishments));
    }
  }, [accomplishments]);

  // Update the calendar with dates that have accomplishments
  useEffect(() => {
    const datesWithAccomplishments = accomplishments
      .filter(a => a.completed)
      .map(a => a.date);
    setSelectedDates(datesWithAccomplishments);
  }, [accomplishments]);

  const handleAddAccomplishment = () => {
    if (!newAccomplishment.trim()) {
      toast({
        title: "Error",
        description: "Please enter an accomplishment",
        variant: "destructive"
      });
      return;
    }

    const newItem: Accomplishment = {
      id: Date.now().toString(),
      title: newAccomplishment,
      category: selectedCategory,
      date: date,
      completed: false,
      points: Math.floor(Math.random() * 10) + 5 // Random points between 5-15
    };

    setAccomplishments([...accomplishments, newItem]);
    setNewAccomplishment("");
    
    toast({
      title: "Accomplishment Added",
      description: "Your new career accomplishment has been added."
    });
  };

  const toggleAccomplishment = (id: string) => {
    const updated = accomplishments.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setAccomplishments(updated);
    
    const accomplishment = accomplishments.find(a => a.id === id);
    if (accomplishment) {
      toast({
        title: accomplishment.completed ? "Marked as incomplete" : "Completed!",
        description: accomplishment.completed 
          ? `"${accomplishment.title}" marked as incomplete.` 
          : `Congratulations! You earned ${accomplishment.points} points for completing "${accomplishment.title}".`,
        variant: accomplishment.completed ? "default" : "success"
      });
    }
  };

  const getAccomplishmentsForDate = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return accomplishments.filter(a => 
      format(a.date, 'yyyy-MM-dd') === formattedDate
    );
  };

  const generateWeeklyReport = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    const weeklyAccomplishments = accomplishments.filter(a => 
      a.completed && a.date >= oneWeekAgo && a.date <= today
    );
    
    const totalPoints = weeklyAccomplishments.reduce((sum, a) => sum + a.points, 0);
    const categoryCounts = weeklyAccomplishments.reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    
    const topCategory = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category)[0] || "None";
    
    if (weeklyAccomplishments.length === 0) {
      toast({
        title: "No accomplishments this week",
        description: "Add some accomplishments to generate a weekly report.",
        variant: "default"
      });
      return;
    }
    
    toast({
      title: "Weekly Accomplishment Report",
      description: `You completed ${weeklyAccomplishments.length} tasks and earned ${totalPoints} points! Your top category was ${topCategory}.`,
      variant: "success",
      duration: 5000
    });
  };

  const generateMonthlyReport = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    const monthlyAccomplishments = accomplishments.filter(a => 
      a.completed && a.date >= oneMonthAgo && a.date <= today
    );
    
    const totalPoints = monthlyAccomplishments.reduce((sum, a) => sum + a.points, 0);
    
    if (monthlyAccomplishments.length === 0) {
      toast({
        title: "No monthly accomplishments",
        description: "Complete some tasks to see your monthly report.",
        variant: "default"
      });
      return;
    }
    
    // Simulate sending an email report
    toast({
      title: "Monthly Report Generated",
      description: `Your monthly report with ${monthlyAccomplishments.length} accomplishments has been prepared. You earned a total of ${totalPoints} points this month!`,
      variant: "success",
      duration: 5000
    });
  };

  const currentDateAccomplishments = getAccomplishmentsForDate(date);
  const totalPointsEarned = accomplishments
    .filter(a => a.completed)
    .reduce((sum, a) => sum + a.points, 0);
  
  const completionRate = accomplishments.length > 0 
    ? Math.round((accomplishments.filter(a => a.completed).length / accomplishments.length) * 100) 
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Career Accomplishment Tracker</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={generateWeeklyReport}>
              <BarChart className="w-4 h-4 mr-1" />
              Weekly Report
            </Button>
            <Button variant="outline" size="sm" onClick={generateMonthlyReport}>
              <Award className="w-4 h-4 mr-1" />
              Monthly Report
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Track your career growth achievements and earn points
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Select a date to view or add accomplishments</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="border rounded-md p-3"
                    modifiers={{
                      highlight: selectedDates
                    }}
                    modifiersClassNames={{
                      highlight: "bg-primary/20 text-primary font-bold"
                    }}
                  />
                </div>
                
                <div className="mb-4 space-y-3">
                  <h3 className="text-sm font-medium">Add New Accomplishment</h3>
                  <div className="flex gap-2">
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAccomplishment}
                      onChange={(e) => setNewAccomplishment(e.target.value)}
                      placeholder="What did you accomplish?"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button onClick={handleAddAccomplishment}>Add</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">
                      {format(date, 'MMMM d, yyyy')}
                    </h3>
                    <Badge variant="outline" className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {currentDateAccomplishments.length} items
                    </Badge>
                  </div>
                  
                  {currentDateAccomplishments.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No accomplishments for this date.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {currentDateAccomplishments.map(item => (
                        <li key={item.id} className="flex items-start gap-2 p-2 border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`rounded-full w-6 h-6 p-0 ${
                              item.completed 
                                ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 hover:text-green-700" 
                                : "hover:bg-muted"
                            }`}
                            onClick={() => toggleAccomplishment(item.id)}
                          >
                            <CheckSquare className="h-4 w-4" />
                          </Button>
                          <div className="flex-1">
                            <p className={`text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                              {item.title}
                            </p>
                            <div className="flex items-center mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                              <span className="ml-auto text-xs font-medium">
                                {item.points} pts
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">All Accomplishments</h3>
                <Badge variant="outline">
                  {accomplishments.length} total
                </Badge>
              </div>
              
              <div className="border rounded-md divide-y">
                {accomplishments.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No accomplishments added yet.
                  </div>
                ) : (
                  accomplishments
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map(item => (
                      <div key={item.id} className="p-3 flex items-start gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`rounded-full w-6 h-6 p-0 ${
                            item.completed 
                              ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 hover:text-green-700" 
                              : "hover:bg-muted"
                          }`}
                          onClick={() => toggleAccomplishment(item.id)}
                        >
                          <CheckSquare className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                              {item.title}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {format(item.date, 'MMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            <span className="ml-auto text-xs font-medium">
                              {item.points} pts
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <h4 className="text-muted-foreground text-sm mb-1">Total Points</h4>
                  <p className="text-3xl font-bold text-primary">{totalPointsEarned}</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <h4 className="text-muted-foreground text-sm mb-1">Completed</h4>
                  <p className="text-3xl font-bold text-primary">
                    {accomplishments.filter(a => a.completed).length}
                  </p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <h4 className="text-muted-foreground text-sm mb-1">Completion Rate</h4>
                  <p className="text-3xl font-bold text-primary">{completionRate}%</p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Accomplishments by Category</h4>
                {CATEGORIES.map(category => {
                  const categoryItems = accomplishments.filter(a => a.category === category);
                  const completedCount = categoryItems.filter(a => a.completed).length;
                  const percentage = categoryItems.length > 0 
                    ? Math.round((completedCount / categoryItems.length) * 100) 
                    : 0;
                  
                  return (
                    <div key={category} className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-xs text-muted-foreground">
                          {completedCount}/{categoryItems.length}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Reports & Exports</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full" onClick={generateWeeklyReport}>
                    <BarChart className="w-4 h-4 mr-2" />
                    Generate Weekly Report
                  </Button>
                  <Button variant="outline" className="w-full" onClick={generateMonthlyReport}>
                    <CalendarIcon2 className="w-4 h-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Progress
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Award className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Tracking your progress since {format(new Date(), 'MMMM yyyy')}
        </p>
        <Button variant="outline" size="sm">
          Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccomplishmentTracker;
