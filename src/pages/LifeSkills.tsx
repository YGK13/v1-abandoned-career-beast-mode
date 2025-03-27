import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { lifeSkills, LifeSkill } from "@/data/lifeSkillsData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HabitTracker from "@/components/lifeskills/HabitTracker";
import { Separator } from "@/components/ui/separator";

const LifeSkills = () => {
  const [dailySkill, setDailySkill] = useState<LifeSkill | null>(null);
  const [completedSkills, setCompletedSkills] = useState<number[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<LifeSkill[]>(lifeSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"featured" | "all">("featured");
  const itemsPerPage = 9;
  
  const categories = Array.from(new Set(lifeSkills.map(skill => skill.category)));
  
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const skillIndex = dayOfYear % lifeSkills.length;
    setDailySkill(lifeSkills[skillIndex]);
    
    const saved = localStorage.getItem('completedLifeSkills');
    if (saved) {
      setCompletedSkills(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    let result = lifeSkills;
    
    if (searchTerm) {
      result = result.filter(skill => 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter(skill => skill.category === categoryFilter);
    }
    
    setFilteredSkills(result);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);
  
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredSkills.slice(startIndex, startIndex + itemsPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const markAsCompleted = (id: number) => {
    const updated = [...completedSkills, id];
    setCompletedSkills(updated);
    localStorage.setItem('completedLifeSkills', JSON.stringify(updated));
  };
  
  const SkillOfTheDay = () => {
    if (!dailySkill) return null;
    
    const Icon = dailySkill.icon;
    const isCompleted = completedSkills.includes(dailySkill.id);
    
    return (
      <Card className="mb-8 overflow-hidden border-primary/20">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">Life Skill of the Day</h3>
                  <Badge variant="secondary" className="mt-1">
                    {dailySkill.category}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div>
            <h4 className="text-lg font-medium mb-2">{dailySkill.title}</h4>
            <p className="text-muted-foreground mb-4">{dailySkill.description}</p>
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <h5 className="font-medium mb-1">Today's Action Step:</h5>
              <p>{dailySkill.actionStep}</p>
            </div>
            <Button 
              variant={isCompleted ? "outline" : "default"} 
              className="w-full"
              onClick={() => markAsCompleted(dailySkill.id)}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Completed
                </>
              ) : "Mark as Completed"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Life Skills</h1>
          <p className="text-muted-foreground mt-1">
            Practical skills for personal and professional development
          </p>
        </header>
        
        <Tabs 
          defaultValue="featured" 
          className="mb-8"
          onValueChange={(value) => setViewMode(value as "featured" | "all")}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured Skills</TabsTrigger>
            <TabsTrigger value="all">All Life Skills</TabsTrigger>
            <TabsTrigger value="habits">Habit Tracker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured">
            <SkillOfTheDay />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard title="Why Life Skills Matter">
                <div className="prose dark:prose-invert">
                  <p>
                    Life skills are the abilities we develop to help us navigate the challenges
                    of everyday life effectively. They encompass a range of interpersonal, 
                    cognitive, and emotional capabilities.
                  </p>
                  <p>
                    By deliberately practicing and strengthening these skills, you can:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Build stronger relationships</li>
                    <li>Manage stress more effectively</li>
                    <li>Communicate with greater clarity</li>
                    <li>Increase your resilience</li>
                    <li>Make better decisions</li>
                  </ul>
                </div>
              </DashboardCard>
              
              <DashboardCard title="Making Skills into Habits">
                <div className="prose dark:prose-invert">
                  <p>
                    The key to developing life skills is consistent practice until they become habits:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>
                      <strong>Start small</strong> - Begin with the simple action steps provided
                    </li>
                    <li>
                      <strong>Be consistent</strong> - Practice a little each day rather than occasionally
                    </li>
                    <li>
                      <strong>Track progress</strong> - Use the "Mark as Completed" button to record your progress
                    </li>
                    <li>
                      <strong>Reflect regularly</strong> - Take time to notice improvements and adjust your approach
                    </li>
                    <li>
                      <strong>Be patient</strong> - Skill development takes time; celebrate small wins along the way
                    </li>
                  </ol>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label htmlFor="search-skills" className="text-sm font-medium mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-skills"
                      type="search"
                      placeholder="Search life skills..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/4">
                  <label htmlFor="category-filter" className="text-sm font-medium mb-1 block">Category</label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger id="category-filter" className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredSkills.length} life skills
                {categoryFilter !== "all" && ` in ${categoryFilter}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedSkills.map(skill => {
                const Icon = skill.icon;
                const isCompleted = completedSkills.includes(skill.id);
                
                return (
                  <Card key={skill.id} className={`overflow-hidden h-full flex flex-col ${isCompleted ? 'border-green-500/50' : ''}`}>
                    <div className="p-5 border-b border-border flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">{skill.title}</h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check size={14} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                      <div className="bg-muted/30 p-3 rounded-md text-sm mt-auto">
                        <p className="font-medium mb-1">Action Step</p>
                        <p className="text-muted-foreground">{skill.actionStep}</p>
                      </div>
                      
                      {!isCompleted && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="mt-3"
                          onClick={() => markAsCompleted(skill.id)}
                        >
                          Mark as Completed
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="text-sm mx-4">
                  Page {currentPage} of {totalPages}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="habits">
            <HabitTracker />
          </TabsContent>
        </Tabs>
        
        {viewMode === "featured" && (
          <>
            <h2 className="text-2xl font-bold mt-12 mb-6">Explore More Life Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lifeSkills.slice(0, 6).map(skill => {
                const Icon = skill.icon;
                const isCompleted = completedSkills.includes(skill.id);
                
                return (
                  <Card key={skill.id} className={`overflow-hidden ${isCompleted ? 'border-green-500/50' : ''}`}>
                    <div className="p-5 border-b border-border flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">{skill.title}</h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check size={14} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <Button onClick={() => setViewMode("all")}>
                View All Life Skills
              </Button>
            </div>
          </>
        )}

        {viewMode === "habits" && (
          <>
            <Separator className="my-8" />
            <h2 className="text-2xl font-bold mb-6">Related Life Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lifeSkills.filter(skill => 
                skill.title.includes("Habit") || 
                skill.description.toLowerCase().includes("consistent") ||
                skill.category === "Self-Improvement"
              ).slice(0, 3).map(skill => {
                const Icon = skill.icon;
                const isCompleted = completedSkills.includes(skill.id);
                
                return (
                  <Card key={skill.id} className={`overflow-hidden ${isCompleted ? 'border-green-500/50' : ''}`}>
                    <div className="p-5 border-b border-border flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">{skill.title}</h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check size={14} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default LifeSkills;
