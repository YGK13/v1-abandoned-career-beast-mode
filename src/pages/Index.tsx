
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import CareerAvatar from "@/components/CareerAvatar";
import SkillCard from "@/components/SkillCard";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  ArrowUpRight,
  FileText,
  Briefcase,
  Award,
  Calendar,
  ChevronRight,
  Lightbulb
} from "lucide-react";

const Index = () => {
  // Mock data
  const [careerScore, setCareerScore] = useState(76);
  const [featuredSkills] = useState([
    { name: "Project Management", level: 85, category: "Leadership", trend: "up", isInDemand: true },
    { name: "Data Analysis", level: 72, category: "Technical", trend: "up", isInDemand: true },
    { name: "Public Speaking", level: 65, category: "Soft Skills", trend: "stable", isInDemand: false },
  ]);
  const [recommendedJobs] = useState([
    {
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      postedDate: "2 days ago",
      matchScore: 92,
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics"],
      isRecommended: true
    },
    {
      title: "Product Marketing Lead",
      company: "InnovateLabs",
      location: "Remote",
      salary: "$110K - $135K",
      postedDate: "1 week ago",
      matchScore: 87,
      skills: ["Marketing Strategy", "Product Launches", "Analytics", "Content Strategy"],
      isRecommended: true
    }
  ]);
  
  const actionItems = [
    {
      title: "Update your LinkedIn profile",
      description: "Your profile hasn't been updated in 3 months",
      priority: "high",
    },
    {
      title: "Take the Product Strategy assessment",
      description: "Validate your skills with a certification",
      priority: "medium",
    },
    {
      title: "Connect resume to ATS",
      description: "Improve application tracking",
      priority: "medium",
    }
  ];

  const upcomingEvents = [
    {
      title: "Quarterly Performance Review",
      date: "Jun 15, 2023",
      time: "10:00 AM",
    },
    {
      title: "Product Management Conference",
      date: "Jul 8-10, 2023",
      time: "All day",
    }
  ];

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Career Dashboard</h1>
              <p className="text-muted-foreground mt-1">Get insights and manage your career growth</p>
            </div>
            <Button variant="default" className="self-start md:self-auto">
              Sync with LinkedIn
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard className="md:col-span-2 overflow-visible" isGlass>
            <div className="flex flex-col md:flex-row items-center">
              <CareerAvatar 
                score={careerScore} 
                level="Senior Professional" 
                nextMilestone="Leadership Level"
              />
              
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <h3 className="text-xl font-semibold mb-4">Career Health</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={16} className="text-primary" />
                      <h4 className="font-medium text-sm">Skills</h4>
                    </div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-muted-foreground">3 needed for next level</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-primary" />
                      <h4 className="font-medium text-sm">Documents</h4>
                    </div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">2 need updating</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-primary" />
                      <h4 className="font-medium text-sm">Applications</h4>
                    </div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-muted-foreground">2 interviews pending</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/skills">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Full Assessment
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Action Items" 
            footer={
              <Button variant="ghost" size="sm" className="w-full justify-between">
                <span>View All Actions</span>
                <ArrowUpRight size={14} />
              </Button>
            }
          >
            <div className="space-y-3">
              {actionItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${
                    item.priority === 'high' ? 'bg-destructive' : 
                    item.priority === 'medium' ? 'bg-orange-400' : 'bg-green-400'
                  }`} />
                  <div>
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Featured Skills</h2>
              <Link to="/skills">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <span>All Skills</span>
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  category={skill.category}
                  trend={skill.trend as any}
                  isInDemand={skill.isInDemand}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming</h2>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <span>Calendar</span>
                <Calendar size={16} />
              </Button>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-md border border-border bg-card hover:bg-muted/10 transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Job Recommendations</h2>
            <Link to="/jobs">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <span>All Jobs</span>
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedJobs.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                postedDate={job.postedDate}
                matchScore={job.matchScore}
                skills={job.skills}
                isRecommended={job.isRecommended}
              />
            ))}
          </div>
        </div>
        
        <DashboardCard
          className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Lightbulb size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">Ready to reach the next level?</h3>
              <p className="text-muted-foreground">Our AI analysis suggests focusing on leadership skills to prepare for your next career move.</p>
            </div>
            <Button className="flex-shrink-0">
              Get Personalized Plan
            </Button>
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
};

export default Index;
