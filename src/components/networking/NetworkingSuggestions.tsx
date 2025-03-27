
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, RefreshCw, UserPlus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { personRecommendations } from "@/data/networkingData";
import PersonRecommendationCard from "./PersonRecommendationCard";

const NetworkingSuggestions = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recommendations, setRecommendations] = useState(personRecommendations);
  const [activeTab, setActiveTab] = useState("all");

  // Filter recommendations based on the active tab
  const filteredRecommendations = recommendations.filter(person => {
    if (activeTab === "all") return true;
    return person.connectionType === activeTab;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // In a real app, this would fetch new recommendations from the server
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Recommendations refreshed",
        description: "We've updated your connection suggestions based on your latest profile data.",
      });
    }, 1500);
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
              <PersonRecommendationCard key={person.id} person={person} />
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
