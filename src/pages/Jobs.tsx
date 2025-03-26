import React, { useState } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Zap, 
  Check, 
  Clock, 
  Sparkles,
  Building
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import Paywall from "@/components/Paywall";

const Jobs = () => {
  const { hasJobsAccess, status } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const [matchThreshold, setMatchThreshold] = useState([70]);
  const [onlyRemote, setOnlyRemote] = useState(false);
  
  if (status === "loading") {
    return (
      <Layout>
        <div className="page-container">
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-lg">Loading subscription status...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!hasJobsAccess) {
    return (
      <Layout>
        <Paywall 
          title="Jobs Section Requires Subscription" 
          description="Unlock comprehensive job matching, application tools, and exclusive job listings with a Jobs subscription." 
        />
      </Layout>
    );
  }
  
  const jobCategories = [
    { id: "all", name: "All Jobs" },
    { id: "recommended", name: "Recommended" },
    { id: "offmarket", name: "Off-Market Exec" },
    { id: "applied", name: "Applied" },
    { id: "saved", name: "Saved" },
  ];
  
  const jobs = [
    {
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      postedDate: "2 days ago",
      matchScore: 92,
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics"],
      isRecommended: true,
      status: "recommended"
    },
    {
      title: "Product Marketing Lead",
      company: "InnovateLabs",
      location: "Remote",
      salary: "$110K - $135K",
      postedDate: "1 week ago",
      matchScore: 87,
      skills: ["Marketing Strategy", "Product Launches", "Analytics", "Content Strategy"],
      isRecommended: true,
      status: "recommended"
    },
    {
      title: "Senior Data Analyst",
      company: "DataDriven Co.",
      location: "New York, NY",
      salary: "$100K - $130K",
      postedDate: "3 days ago",
      matchScore: 84,
      skills: ["SQL", "Python", "Data Visualization", "Statistical Analysis"],
      isRecommended: true,
      status: "recommended"
    },
    {
      title: "Technical Product Manager",
      company: "SoftSolutions",
      location: "Boston, MA",
      salary: "$115K - $140K",
      postedDate: "5 days ago",
      matchScore: 81,
      skills: ["API Development", "Technical Requirements", "Agile", "Product Strategy"],
      isRecommended: false,
      status: "saved"
    },
    {
      title: "Marketing Director",
      company: "BrandBuilders",
      location: "Remote",
      salary: "$130K - $160K",
      postedDate: "1 week ago",
      matchScore: 79,
      skills: ["Digital Marketing", "Brand Strategy", "Team Leadership", "Budget Management"],
      isRecommended: false,
      status: "saved"
    },
    {
      title: "UX Research Lead",
      company: "DesignFirst Inc.",
      location: "Seattle, WA",
      salary: "$110K - $140K",
      postedDate: "2 weeks ago",
      matchScore: 76,
      skills: ["User Research", "Usability Testing", "Personas", "Journey Mapping"],
      isRecommended: false,
      status: "applied"
    },
    {
      title: "Product Operations Manager",
      company: "OptiFlow",
      location: "Chicago, IL",
      salary: "$95K - $120K",
      postedDate: "1 week ago",
      matchScore: 74,
      skills: ["Process Improvement", "Cross-functional Collaboration", "Analytics", "Documentation"],
      isRecommended: false,
      status: "applied"
    },
    {
      title: "Growth Product Manager",
      company: "ScaleUp Technologies",
      location: "Remote",
      salary: "$105K - $135K",
      postedDate: "3 days ago",
      matchScore: 71,
      skills: ["A/B Testing", "User Acquisition", "Retention Strategies", "Analytics"],
      isRecommended: false,
      status: "applied"
    },
  ];

  const offMarketJobs = [
    {
      title: "Board Member - Technology",
      company: "VirtualNonExecs",
      location: "Remote",
      salary: "$50K - $75K",
      postedDate: "3 days ago",
      matchScore: 94,
      skills: ["Corporate Governance", "Technology Strategy", "Risk Management", "Executive Leadership"],
      isRecommended: true,
      status: "offmarket"
    },
    {
      title: "Non-Executive Director - Financial Services",
      company: "VirtualNonExecs",
      location: "London / Remote",
      salary: "£40K - £60K",
      postedDate: "1 week ago",
      matchScore: 89,
      skills: ["Regulatory Compliance", "Financial Oversight", "Strategic Planning", "Board Experience"],
      isRecommended: true,
      status: "offmarket"
    },
    {
      title: "Advisory Board Chair - Healthcare",
      company: "VirtualNonExecs",
      location: "New York / Remote",
      salary: "$60K - $90K",
      postedDate: "5 days ago",
      matchScore: 86,
      skills: ["Healthcare Governance", "Industry Networks", "Strategic Guidance", "Fundraising"],
      isRecommended: false,
      status: "offmarket"
    }
  ];

  const allJobs = [...jobs, ...offMarketJobs];

  const filteredJobs = (category: string) => {
    let filtered = allJobs;
    
    if (category !== "all") {
      filtered = filtered.filter(job => job.status === category);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(job => job.matchScore >= matchThreshold[0]);
    
    if (onlyRemote) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes("remote"));
    }
    
    return filtered;
  };

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Job Opportunities</h1>
              <p className="text-muted-foreground mt-1">Discover and track jobs tailored to your skills</p>
            </div>
            <Button variant="default" className="self-start md:self-auto flex items-center gap-1">
              <Zap size={16} />
              <span>Auto-apply Settings</span>
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-full sm:w-36 space-y-4">
                <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
                  <h4 className="text-2xl font-bold text-primary mb-1">92%</h4>
                  <p className="text-xs text-muted-foreground text-center">Match with top job</p>
                </div>
                
                <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-1">11</h4>
                  <p className="text-xs text-muted-foreground text-center">Job matches found</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-semibold">Job Application Status</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} className="text-muted-foreground" />
                      <h4 className="font-medium text-sm">Pending</h4>
                    </div>
                    <p className="text-xl font-bold">2</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Check size={16} className="text-green-500" />
                      <h4 className="font-medium text-sm">Interviews</h4>
                    </div>
                    <p className="text-xl font-bold">1</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Building size={16} className="text-blue-500" />
                      <h4 className="font-medium text-sm">Off-Market</h4>
                    </div>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Top matching skills</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary">Product Strategy</Badge>
                    <Badge variant="secondary">Data Analysis</Badge>
                    <Badge variant="secondary">Leadership</Badge>
                    <Badge variant="secondary">Agile</Badge>
                    <Badge variant="secondary">UX Research</Badge>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Job Filters">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Match Threshold</h4>
                <div className="pt-4 pb-2">
                  <Slider
                    value={matchThreshold}
                    onValueChange={setMatchThreshold}
                    max={100}
                    step={5}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{matchThreshold}% match or higher</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="remote-only"
                  checked={onlyRemote}
                  onCheckedChange={setOnlyRemote}
                />
                <Label htmlFor="remote-only">Remote jobs only</Label>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Popular Locations</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <MapPin size={12} className="mr-1" />
                    San Francisco
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <MapPin size={12} className="mr-1" />
                    New York
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <MapPin size={12} className="mr-1" />
                    Remote
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Job Types</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Briefcase size={12} className="mr-1" />
                    Full-time
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    <Briefcase size={12} className="mr-1" />
                    Contract
                  </Badge>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>
          </DashboardCard>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold">Job Listings</h2>
          
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {jobCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {jobCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs(category.id).map((job, index) => (
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
              
              {filteredJobs(category.id).length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Briefcase size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    {searchQuery ? 
                      `No jobs matching "${searchQuery}" with current filters.` : 
                      "No jobs match your current filter criteria."}
                  </p>
                  <Button variant="outline" className="mt-4">
                    Reset Filters
                  </Button>
                </div>
              )}

              {category.id === "offmarket" && filteredJobs(category.id).length > 0 && (
                <div className="mt-8 p-4 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Building className="text-amber-600 dark:text-amber-400 mt-1" size={24} />
                    <div>
                      <h3 className="font-medium text-amber-800 dark:text-amber-300">Off-Market Executive Positions</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Exclusive board and executive positions from VirtualNonExecs. These opportunities require 
                        additional verification and are available to premium members only.
                      </p>
                      <Button variant="outline" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30">
                        Learn More About VirtualNonExecs
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Jobs;
