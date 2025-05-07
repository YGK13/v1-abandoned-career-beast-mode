
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, RefreshCw, UserPlus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { personRecommendations } from "@/data/networkingData";
import PersonRecommendationCard from "./PersonRecommendationCard";
import { useResumeData } from "@/hooks/useResumeData";
import { PersonRecommendation } from "@/data/networkingData";

const NetworkingSuggestions = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recommendations, setRecommendations] = useState(personRecommendations);
  const [activeTab, setActiveTab] = useState("all");
  const { currentPosition, company, skills } = useResumeData();

  // Effect to prioritize recommendations based on user profile
  useEffect(() => {
    if (currentPosition || company || (skills && skills.length > 0)) {
      const prioritizedRecommendations = [...personRecommendations].sort((a, b) => {
        let aScore = 0;
        let bScore = 0;
        
        // Score based on position match
        if (currentPosition) {
          const positionLower = currentPosition.toLowerCase();
          if (a.title.toLowerCase().includes(positionLower)) aScore += 3;
          if (b.title.toLowerCase().includes(positionLower)) bScore += 3;
        }
        
        // Score based on company match
        if (company) {
          const companyLower = company.toLowerCase();
          if (a.company.toLowerCase().includes(companyLower)) aScore += 2;
          if (b.company.toLowerCase().includes(companyLower)) bScore += 2;
        }
        
        // Score based on skills match
        if (skills && skills.length > 0) {
          skills.forEach(skill => {
            const skillLower = skill.toLowerCase();
            if (a.tags.some(tag => tag.toLowerCase().includes(skillLower))) aScore += 1;
            if (b.tags.some(tag => tag.toLowerCase().includes(skillLower))) bScore += 1;
          });
        }
        
        return bScore - aScore;
      });
      
      setRecommendations(prioritizedRecommendations);
    }
  }, [currentPosition, company, skills]);

  // Filter recommendations based on the active tab
  const filteredRecommendations = recommendations.filter(person => {
    if (activeTab === "all") return true;
    return person.connectionType === activeTab;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // In a real app, this would fetch new recommendations from the server
    // based on the user's profile
    setTimeout(() => {
      // Simulate refreshing with slight reordering
      const shuffled = [...recommendations];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      setRecommendations(shuffled);
      setIsRefreshing(false);
      
      toast({
        title: "Recommendations refreshed",
        description: "We've updated your connection suggestions based on your latest profile data.",
      });
    }, 1500);
  };

  // Generate a personalized reason for each connection based on user profile
  const getPersonalizedReason = (person: PersonRecommendation) => {
    if (currentPosition && person.title.toLowerCase().includes(currentPosition.toLowerCase())) {
      return `Shares your role as ${currentPosition}`;
    }
    
    if (company && person.company.toLowerCase().includes(company.toLowerCase())) {
      return `Works at ${company} like you`;
    }
    
    if (skills && skills.length > 0) {
      const matchedSkills = skills.filter(skill => 
        person.tags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()))
      );
      
      if (matchedSkills.length > 0) {
        return `Shares your skills in ${matchedSkills.join(', ')}`;
      }
    }
    
    return person.connectionReason;
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Targeted Connection Suggestions</h2>
            <p className="text-sm text-muted-foreground">Based on your LinkedIn profile, documents, and skills</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter size={14} />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="industry">Industry Leaders</TabsTrigger>
          <TabsTrigger value="skill">Skill-Based</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="alumni">Alumni</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecommendations.map((person) => (
              <PersonRecommendationCard 
                key={person.id} 
                person={{
                  ...person,
                  connectionReason: getPersonalizedReason(person)
                }} 
              />
            ))}
          </div>
          
          {filteredRecommendations.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No recommendations found for this category.</p>
            </div>
          )}
          
          {filteredRecommendations.length > 0 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline">
                View More Recommendations
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NetworkingSuggestions;
