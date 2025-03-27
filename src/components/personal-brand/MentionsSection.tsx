
import React, { useState } from "react";
import { useUserMentions } from "@/data/personalBrandData";
import MentionCard from "./MentionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Filter, Search, RefreshCw, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MentionsSection: React.FC = () => {
  const { data: mentions, isLoading, isError, refetch } = useUserMentions();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Apply filters to mentions
  const filteredMentions = mentions?.filter(mention => {
    const matchesSearch = 
      searchQuery === "" || 
      mention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mention.publicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mention.snippet?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
    const matchesType = 
      typeFilter === "all" || 
      mention.type === typeFilter;
      
    return matchesSearch && matchesType;
  });
  
  // Get mentions stats
  const newMentionsCount = mentions?.filter(m => m.isNew).length || 0;
  const totalMentionsCount = mentions?.length || 0;
  
  // Generate skeletons for loading state
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="space-y-3">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    ));
  };
  
  // Error state UI
  if (isError) {
    return (
      <div className="bg-muted p-6 rounded-lg flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Failed to load your mentions</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          We couldn't retrieve your media mentions. Please try again later.
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Media Mentions</h2>
          <p className="text-muted-foreground">
            Track when and where you've been featured in the media
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
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">
              All ({totalMentionsCount})
            </TabsTrigger>
            <TabsTrigger value="new">
              New ({newMentionsCount})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search mentions..."
                className="pl-9 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Article">Articles</SelectItem>
                <SelectItem value="Podcast">Podcasts</SelectItem>
                <SelectItem value="Video">Videos</SelectItem>
                <SelectItem value="Social">Social Media</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderSkeletons()}
            </div>
          ) : filteredMentions && filteredMentions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentions.map((mention) => (
                <MentionCard
                  key={mention.id}
                  mention={mention}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No mentions found</h3>
              <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                {searchQuery || typeFilter !== "all" 
                  ? "Try adjusting your filters to see more mentions." 
                  : "You don't have any media mentions tracked yet."}
              </p>
              {(searchQuery || typeFilter !== "all") && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setTypeFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderSkeletons()}
            </div>
          ) : filteredMentions && filteredMentions.filter(m => m.isNew).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentions
                .filter(m => m.isNew)
                .map((mention) => (
                  <MentionCard
                    key={mention.id}
                    mention={mention}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-medium">No new mentions</h3>
              <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                You don't have any new media mentions since your last visit.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentionsSection;
