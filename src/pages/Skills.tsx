
import React, { useState } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Search, Plus, Award, TrendingUp, Filter } from "lucide-react";

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data
  const skillCategories = [
    { id: "all", name: "All Skills" },
    { id: "technical", name: "Technical" },
    { id: "leadership", name: "Leadership" },
    { id: "soft", name: "Soft Skills" },
    { id: "industry", name: "Industry" },
  ];
  
  const skills = [
    // Technical
    { name: "Data Analysis", level: 72, category: "Technical", trend: "up", isInDemand: true },
    { name: "SQL", level: 85, category: "Technical", trend: "stable", isInDemand: true },
    { name: "Python", level: 68, category: "Technical", trend: "up", isInDemand: true },
    { name: "Excel", level: 90, category: "Technical", trend: "stable", isInDemand: false },
    { name: "Tableau", level: 65, category: "Technical", trend: "up", isInDemand: true },
    { name: "JavaScript", level: 50, category: "Technical", trend: "stable", isInDemand: false },
    
    // Leadership
    { name: "Project Management", level: 85, category: "Leadership", trend: "up", isInDemand: true },
    { name: "Team Leadership", level: 78, category: "Leadership", trend: "up", isInDemand: true },
    { name: "Strategic Planning", level: 75, category: "Leadership", trend: "up", isInDemand: true },
    { name: "Coaching", level: 70, category: "Leadership", trend: "stable", isInDemand: false },
    
    // Soft Skills
    { name: "Communication", level: 88, category: "Soft Skills", trend: "stable", isInDemand: true },
    { name: "Public Speaking", level: 65, category: "Soft Skills", trend: "stable", isInDemand: false },
    { name: "Negotiation", level: 80, category: "Soft Skills", trend: "up", isInDemand: true },
    { name: "Problem Solving", level: 82, category: "Soft Skills", trend: "stable", isInDemand: true },
    { name: "Time Management", level: 75, category: "Soft Skills", trend: "stable", isInDemand: false },
    
    // Industry
    { name: "Product Management", level: 88, category: "Industry", trend: "up", isInDemand: true },
    { name: "UX Design", level: 60, category: "Industry", trend: "up", isInDemand: true },
    { name: "Market Research", level: 78, category: "Industry", trend: "stable", isInDemand: true },
    { name: "Business Development", level: 82, category: "Industry", trend: "up", isInDemand: true },
  ];
  
  const recommendedSkills = [
    { name: "Product Strategy", category: "Industry", level: 0, trend: "up", isInDemand: true },
    { name: "React", category: "Technical", level: 0, trend: "up", isInDemand: true },
    { name: "Data Science", category: "Technical", level: 0, trend: "up", isInDemand: true },
  ];

  const filteredSkills = (category: string) => {
    let filtered = skills;
    
    if (category !== "all") {
      filtered = filtered.filter(skill => skill.category.toLowerCase() === category.toLowerCase());
    }
    
    if (searchQuery) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Skills Portfolio</h1>
              <p className="text-muted-foreground mt-1">Manage and develop your professional skills</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
              <Button variant="default" className="flex items-center gap-1">
                <Plus size={16} />
                <span>Add New Skill</span>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard 
            className="md:col-span-2 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-3 border border-primary/20">
                  <Award size={32} className="text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold">{skills.length}</h3>
                  <p className="text-sm text-muted-foreground">Total Skills</p>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Your Skill Summary</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-background rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-yellow-500" />
                      <h4 className="font-medium text-sm">In-Demand Skills</h4>
                    </div>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-green-500" />
                      <h4 className="font-medium text-sm">Growing Skills</h4>
                    </div>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-background">Technical: 6</Badge>
                  <Badge variant="secondary" className="bg-background">Leadership: 4</Badge>
                  <Badge variant="secondary" className="bg-background">Soft Skills: 5</Badge>
                  <Badge variant="secondary" className="bg-background">Industry: 4</Badge>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Recommended Skills">
            <p className="text-sm text-muted-foreground mb-4">
              Based on your career goals and job market trends
            </p>
            
            <div className="space-y-3">
              {recommendedSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{skill.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="flex mt-2 items-center text-xs text-muted-foreground">
                    <Sparkles size={12} className="text-yellow-500 mr-1" />
                    <span>High demand in your field</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View More Recommendations
            </Button>
          </DashboardCard>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">My Skills</h2>
            
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {skillCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {skillCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredSkills(category.id).map((skill, index) => (
                    <SkillCard
                      key={index}
                      name={skill.name}
                      level={skill.level}
                      category={skill.category}
                      trend={skill.trend as any}
                      isInDemand={skill.isInDemand}
                      onClick={() => {}}
                    />
                  ))}
                </div>
                
                {filteredSkills(category.id).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Search size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No skills found</h3>
                    <p className="text-muted-foreground mt-1 max-w-md">
                      {searchQuery ? 
                        `No skills matching "${searchQuery}" in this category.` : 
                        "You haven't added any skills in this category yet."}
                    </p>
                    <Button variant="outline" className="mt-4">
                      Add New Skill
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
