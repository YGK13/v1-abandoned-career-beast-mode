
import React, { useState } from "react";
import { useRecentPROpportunities } from "@/data/personalBrandData";
import PROpportunityCard from "./PROpportunityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Filter, Search, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const OpportunitiesSection: React.FC = () => {
  const { data: opportunities, isLoading, isError, refetch } = useRecentPROpportunities();
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Extract all unique categories for the filter
  const categories = opportunities 
    ? Array.from(new Set(opportunities.map(opp => opp.category)))
    : [];
    
  // Extract all unique sources for the filter
  const sources = opportunities 
    ? Array.from(new Set(opportunities.map(opp => opp.source)))
    : [];
  
  // Apply filters to opportunities
  const filteredOpportunities = opportunities?.filter(opp => {
    const matchesSearch = 
      searchQuery === "" || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSource = 
      sourceFilter === "all" || 
      opp.source === sourceFilter;
      
    const matchesCategory = 
      categoryFilter === "all" || 
      opp.category === categoryFilter;
      
    return matchesSearch && matchesSource && matchesCategory;
  });
  
  // Generate skeletons for loading state
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Card key={index} className="h-64">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-3/4 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    ));
  };
  
  // Error state UI
  if (isError) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              We couldn't load the latest PR opportunities.
            </p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">PR Opportunities</h2>
          <p className="text-muted-foreground">
            Latest opportunities from top media outreach platforms
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Filter Opportunities</CardTitle>
          <CardDescription>Find opportunities that match your expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search opportunities..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
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
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeletons()}
        </div>
      ) : filteredOpportunities && filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <PROpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No opportunities found</h3>
              <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                {searchQuery || sourceFilter !== "all" || categoryFilter !== "all" 
                  ? "Try adjusting your filters to see more opportunities." 
                  : "There are currently no PR opportunities available. Please check back later."}
              </p>
              {(searchQuery || sourceFilter !== "all" || categoryFilter !== "all") && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSourceFilter("all");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OpportunitiesSection;
