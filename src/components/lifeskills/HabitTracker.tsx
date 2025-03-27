
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Check, Edit, Plus, Trash2, AlertCircle, Megaphone, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface Habit {
  id: string;
  name: string;
  description: string;
  category: string;
  frequency: "daily" | "weekly";
  goal: number;
  streak: number;
  completionDates: string[]; // ISO date strings
  createdAt: string; // ISO date string
}

const CATEGORIES = [
  "Health & Fitness",
  "Mental Wellbeing",
  "Learning",
  "Productivity",
  "Relationships",
  "Career Growth",
  "Personal Development"
];

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({
    name: "",
    description: "",
    category: "",
    frequency: "daily",
    goal: 1
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [currentWeekDays, setCurrentWeekDays] = useState<string[]>([]);
  const { toast } = useToast();

  // Generate the current week's dates
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const days = [];
    
    // Start from previous Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - dayOfWeek + i);
      days.push(date.toISOString().split('T')[0]);
    }
    
    setCurrentWeekDays(days);
  }, []);

  // Load saved habits from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('lifeSkillsHabits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Add some sample habits if none exist
      const sampleHabits: Habit[] = [
        {
          id: "h1",
          name: "Morning Meditation",
          description: "10 minutes of mindfulness meditation to start the day",
          category: "Mental Wellbeing",
          frequency: "daily",
          goal: 7,
          streak: 3,
          completionDates: generateSampleDates(3),
          createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
        },
        {
          id: "h2",
          name: "Read 30 Pages",
          description: "Read at least 30 pages of non-fiction",
          category: "Learning",
          frequency: "daily",
          goal: 7,
          streak: 5,
          completionDates: generateSampleDates(5),
          createdAt: new Date(Date.now() - 86400000 * 15).toISOString()
        },
        {
          id: "h3",
          name: "Weekly Review",
          description: "Review goals and plan for the upcoming week",
          category: "Productivity",
          frequency: "weekly",
          goal: 1,
          streak: 2,
          completionDates: generateSampleDates(2, true),
          createdAt: new Date(Date.now() - 86400000 * 20).toISOString()
        }
      ];
      setHabits(sampleHabits);
      localStorage.setItem('lifeSkillsHabits', JSON.stringify(sampleHabits));
    }
  }, []);

  // Generate sample dates for demo habits
  function generateSampleDates(count: number, weekly = false): string[] {
    const dates = [];
    const today = new Date();
    
    if (weekly) {
      // For weekly habits, use previous week dates
      for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (7 * i) - today.getDay());
        dates.push(date.toISOString().split('T')[0]);
      }
    } else {
      // For daily habits, use recent consecutive days
      for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  }

  // Save habits whenever they change
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('lifeSkillsHabits', JSON.stringify(habits));
    }
  }, [habits]);

  const handleAddHabit = () => {
    if (!newHabit.name || !newHabit.category || !newHabit.frequency) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const habit: Habit = {
      id: `h${Date.now()}`,
      name: newHabit.name,
      description: newHabit.description || "",
      category: newHabit.category,
      frequency: newHabit.frequency,
      goal: newHabit.goal || 1,
      streak: 0,
      completionDates: [],
      createdAt: new Date().toISOString()
    };

    setHabits([...habits, habit]);
    setNewHabit({
      name: "",
      description: "",
      category: "",
      frequency: "daily",
      goal: 1
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Habit created",
      description: `Successfully added "${habit.name}" to your habit tracker`,
    });
  };

  const handleEditHabit = (habit: Habit) => {
    setNewHabit(habit);
    setEditingHabitId(habit.id);
    setIsAddDialogOpen(true);
  };

  const handleUpdateHabit = () => {
    if (!editingHabitId) return;
    
    const updatedHabits = habits.map(habit => 
      habit.id === editingHabitId 
        ? { ...habit, ...newHabit, id: editingHabitId }
        : habit
    );
    
    setHabits(updatedHabits);
    setNewHabit({
      name: "",
      description: "",
      category: "",
      frequency: "daily",
      goal: 1
    });
    setEditingHabitId(null);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Habit updated",
      description: "Your habit has been successfully updated",
    });
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
    
    toast({
      title: "Habit deleted",
      description: "Your habit has been removed from your tracker",
    });
  };

  const toggleHabitCompletion = (habit: Habit, date: string) => {
    const completionIndex = habit.completionDates.indexOf(date);
    let updatedDates: string[];
    
    if (completionIndex >= 0) {
      // Remove the date if already completed
      updatedDates = habit.completionDates.filter(d => d !== date);
    } else {
      // Add the date if not completed
      updatedDates = [...habit.completionDates, date];
    }
    
    // Sort dates in descending order
    updatedDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    // Calculate streak
    let streak = 0;
    if (updatedDates.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const sortedDates = [...updatedDates].sort();
      
      if (habit.frequency === "daily") {
        // For daily habits
        streak = calculateDailyStreak(sortedDates, today);
      } else {
        // For weekly habits
        streak = calculateWeeklyStreak(sortedDates);
      }
    }
    
    const updatedHabits = habits.map(h => 
      h.id === habit.id 
        ? { ...h, completionDates: updatedDates, streak }
        : h
    );
    
    setHabits(updatedHabits);
  };

  // Helper function to calculate daily streak
  const calculateDailyStreak = (dates: string[], today: string): number => {
    if (dates.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date(today);
    
    // Check if today or yesterday is in the dates
    const hasToday = dates.includes(today);
    
    if (!hasToday) {
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (!dates.includes(yesterdayStr)) {
        return 0; // Streak broken if neither today nor yesterday is completed
      }
    }
    
    // Start counting from today or yesterday
    if (hasToday) {
      streak = 1;
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    while (true) {
      currentDate.setDate(currentDate.getDate() - 1);
      const dateStr = currentDate.toISOString().split('T')[0];
      
      if (dates.includes(dateStr)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Helper function to calculate weekly streak
  const calculateWeeklyStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;
    
    // Get the start date of current week (Sunday)
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    currentWeekStart.setHours(0, 0, 0, 0);
    
    // Check if there's at least one completion in current week
    const hasCurrentWeekCompletion = dates.some(date => {
      const completionDate = new Date(date);
      return completionDate >= currentWeekStart && completionDate <= today;
    });
    
    if (!hasCurrentWeekCompletion) {
      // Check if there's a completion in the previous week
      const prevWeekStart = new Date(currentWeekStart);
      prevWeekStart.setDate(prevWeekStart.getDate() - 7);
      const prevWeekEnd = new Date(currentWeekStart);
      prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
      
      const hasPrevWeekCompletion = dates.some(date => {
        const completionDate = new Date(date);
        return completionDate >= prevWeekStart && completionDate <= prevWeekEnd;
      });
      
      if (!hasPrevWeekCompletion) {
        return 0; // Streak broken if neither current nor previous week has completions
      }
    }
    
    let streak = hasCurrentWeekCompletion ? 1 : 0;
    let weekStart = new Date(currentWeekStart);
    
    // If starting from previous week, adjust the starting point
    if (!hasCurrentWeekCompletion) {
      weekStart.setDate(weekStart.getDate() - 7);
      streak = 1;
    }
    
    // Count backwards week by week
    while (true) {
      weekStart.setDate(weekStart.getDate() - 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const hasCompletionThisWeek = dates.some(date => {
        const completionDate = new Date(date);
        return completionDate >= weekStart && completionDate <= weekEnd;
      });
      
      if (hasCompletionThisWeek) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Calculate completion percentage for the current period (week for daily, month for weekly)
  const calculateCompletionPercentage = (habit: Habit): number => {
    if (habit.frequency === "daily") {
      // For daily habits, calculate based on the current week
      const completedThisWeek = currentWeekDays.filter(day => 
        habit.completionDates.includes(day)
      ).length;
      
      return Math.min(100, Math.round((completedThisWeek / habit.goal) * 100));
    } else {
      // For weekly habits, calculate based on the current month
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      const completedThisMonth = habit.completionDates.filter(date => {
        const completionDate = new Date(date);
        return completionDate >= firstDayOfMonth && completionDate <= today;
      }).length;
      
      return Math.min(100, Math.round((completedThisMonth / habit.goal) * 100));
    }
  };

  // Check if a habit is completed for a specific date
  const isHabitCompletedOnDate = (habit: Habit, date: string): boolean => {
    return habit.completionDates.includes(date);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Habit Tracker</CardTitle>
            <CardDescription>Track and build consistent life skills habits</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { 
                setNewHabit({
                  name: "",
                  description: "",
                  category: "",
                  frequency: "daily",
                  goal: 1
                });
                setEditingHabitId(null);
              }}>
                <Plus size={16} className="mr-2" />
                Add New Habit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingHabitId ? "Edit Habit" : "Create New Habit"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="habit-name">Habit Name*</Label>
                  <Input 
                    id="habit-name" 
                    value={newHabit.name || ""} 
                    onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                    placeholder="e.g., Morning Exercise"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="habit-description">Description</Label>
                  <Textarea 
                    id="habit-description" 
                    value={newHabit.description || ""} 
                    onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                    placeholder="Describe your habit and its benefits"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="habit-category">Category*</Label>
                    <Select 
                      value={newHabit.category} 
                      onValueChange={(value) => setNewHabit({...newHabit, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="habit-frequency">Frequency*</Label>
                    <Select 
                      value={newHabit.frequency} 
                      onValueChange={(value: "daily" | "weekly") => 
                        setNewHabit({...newHabit, frequency: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="habit-goal">Weekly Goal (times per week)</Label>
                  <Select 
                    value={newHabit.goal?.toString() || "1"} 
                    onValueChange={(value) => setNewHabit({...newHabit, goal: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "time" : "times"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingHabitId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingHabitId ? handleUpdateHabit : handleAddHabit}
                >
                  {editingHabitId ? "Update Habit" : "Create Habit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">No habits yet</h3>
            <p className="mt-1 text-muted-foreground">
              Start tracking your habits to build consistency
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={16} className="mr-2" />
              Add Your First Habit
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-muted-foreground" />
                <h3 className="font-medium">This Week's Progress</h3>
              </div>
              <Badge variant="outline" className="gap-1">
                <Check size={14} className="text-green-500" />
                <span>{habits.reduce((sum, habit) => sum + habit.completionDates.filter(date => 
                  currentWeekDays.includes(date)
                ).length, 0)} Completions</span>
              </Badge>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Habit</TableHead>
                    <TableHead className="text-center">Streak</TableHead>
                    <TableHead className="text-center">Progress</TableHead>
                    {currentWeekDays.map((date, index) => (
                      <TableHead key={date} className="text-center w-[50px]">
                        <div className="flex flex-col items-center text-xs">
                          <span className="font-normal text-muted-foreground">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                          </span>
                          <span className={`${new Date().toISOString().split('T')[0] === date ? 'font-bold' : ''}`}>
                            {new Date(date).getDate()}
                          </span>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {habits.map((habit) => (
                    <TableRow key={habit.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {habit.name}
                            <Badge 
                              variant="outline" 
                              className="ml-1 text-xs py-0 px-2"
                            >
                              {habit.frequency}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {habit.description}
                          </div>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {habit.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-bold">
                            {habit.streak}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {habit.frequency === "daily" ? "days" : "weeks"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 items-center">
                          <Progress 
                            value={calculateCompletionPercentage(habit)} 
                            className="h-2.5 w-full" 
                          />
                          <span className="text-xs text-muted-foreground">
                            {habit.frequency === "daily" ? 
                              `${currentWeekDays.filter(date => 
                                habit.completionDates.includes(date)
                              ).length} / ${habit.goal} days` : 
                              `${habit.completionDates.filter(date => {
                                const completionDate = new Date(date);
                                const today = new Date();
                                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                                return completionDate >= firstDayOfMonth && completionDate <= today;
                              }).length} / ${habit.goal} weeks`
                            }
                          </span>
                        </div>
                      </TableCell>
                      {currentWeekDays.map((date) => (
                        <TableCell 
                          key={`${habit.id}-${date}`} 
                          className="text-center p-2"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`rounded-full w-8 h-8 p-0 ${
                              isHabitCompletedOnDate(habit, date) 
                                ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 hover:text-green-700" 
                                : "hover:bg-muted"
                            }`}
                            onClick={() => toggleHabitCompletion(habit, date)}
                          >
                            {isHabitCompletedOnDate(habit, date) ? (
                              <Check size={16} />
                            ) : (
                              <span className="opacity-0">✓</span>
                            )}
                          </Button>
                        </TableCell>
                      ))}
                      <TableCell className="p-2">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditHabit(habit)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteHabit(habit.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
              <div className="flex gap-3">
                <Megaphone size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-300">Habit Building Tip</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    The most effective way to build a new habit is to connect it to an existing routine. 
                    Try the format "After I [current habit], I will [new habit]" to create a strong trigger.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
