
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { lifeSkills, LifeSkill } from "@/data/lifeSkillsData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const LifeSkills = () => {
  const [dailySkill, setDailySkill] = useState<LifeSkill | null>(null);
  const [completedSkills, setCompletedSkills] = useState<number[]>([]);
  
  useEffect(() => {
    // Get deterministic "random" skill based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const skillIndex = dayOfYear % lifeSkills.length;
    setDailySkill(lifeSkills[skillIndex]);
    
    // Load completed skills from localStorage
    const saved = localStorage.getItem('completedLifeSkills');
    if (saved) {
      setCompletedSkills(JSON.parse(saved));
    }
  }, []);
  
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
        
        <h2 className="text-2xl font-bold mt-12 mb-6">All Life Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lifeSkills.map(skill => {
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
      </div>
    </Layout>
  );
};

export default LifeSkills;
