
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { mentalModels, MentalModel } from "@/data/mentalModelsData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, BookmarkPlus, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MentalModels = () => {
  const [dailyModel, setDailyModel] = useState<MentalModel | null>(null);
  const [savedModels, setSavedModels] = useState<number[]>([]);
  const [filteredModels, setFilteredModels] = useState<MentalModel[]>(mentalModels);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"featured" | "all" | "saved">("featured");
  const itemsPerPage = 9;
  
  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(mentalModels.map(model => model.category)));
  
  useEffect(() => {
    // Get deterministic "random" model based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const modelIndex = dayOfYear % mentalModels.length;
    setDailyModel(mentalModels[modelIndex]);
    
    // Load saved models from localStorage
    const saved = localStorage.getItem('savedMentalModels');
    if (saved) {
      setSavedModels(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    // Filter models based on search term and category
    let result = mentalModels;
    
    if (searchTerm) {
      result = result.filter(model => 
        model.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter(model => model.category === categoryFilter);
    }
    
    setFilteredModels(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, categoryFilter]);
  
  // Calculate pagination
  const displayedModels = viewMode === "saved" 
    ? filteredModels.filter(model => savedModels.includes(model.id))
    : filteredModels;
    
  const totalPages = Math.ceil(displayedModels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedModels = displayedModels.slice(startIndex, startIndex + itemsPerPage);
  
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
  
  const toggleSaveModel = (id: number) => {
    const isSaved = savedModels.includes(id);
    const updated = isSaved
      ? savedModels.filter(modelId => modelId !== id)
      : [...savedModels, id];
      
    setSavedModels(updated);
    localStorage.setItem('savedMentalModels', JSON.stringify(updated));
  };
  
  const ModelOfTheDay = () => {
    if (!dailyModel) return null;
    
    const Icon = dailyModel.icon;
    const isSaved = savedModels.includes(dailyModel.id);
    
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
                  <h3 className="text-xl font-semibold">Mental Model of the Day</h3>
                  <Badge variant="secondary" className="mt-1">
                    {dailyModel.category}
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
            <h4 className="text-lg font-medium mb-2">{dailyModel.title}</h4>
            <p className="text-muted-foreground mb-4">{dailyModel.description}</p>
            <div className="bg-muted/50 p-4 rounded-md mb-4">
              <h5 className="font-medium mb-1">Application:</h5>
              <p>{dailyModel.application}</p>
            </div>
            <Button 
              variant={isSaved ? "outline" : "default"} 
              className="w-full"
              onClick={() => toggleSaveModel(dailyModel.id)}
            >
              {isSaved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved to Your Library
                </>
              ) : (
                <>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save to Your Library
                </>
              )}
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
          <h1 className="text-4xl font-bold">Mental Models</h1>
          <p className="text-muted-foreground mt-1">
            Powerful thinking frameworks to improve your decision making
          </p>
        </header>
        
        <Tabs 
          defaultValue="featured" 
          className="mb-8"
          onValueChange={(value) => setViewMode(value as "featured" | "all" | "saved")}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured Models</TabsTrigger>
            <TabsTrigger value="all">All Mental Models</TabsTrigger>
            <TabsTrigger value="saved">Your Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured">
            <ModelOfTheDay />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard title="Why Mental Models Matter">
                <div className="prose dark:prose-invert">
                  <p>
                    Mental models are frameworks for thinking that help you understand the world
                    and make better decisions. They are shortcuts that simplify complex situations
                    and reveal non-obvious insights.
                  </p>
                  <p>
                    The benefits of building a diverse toolkit of mental models:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Better decision making with fewer blind spots</li>
                    <li>Enhanced problem-solving capabilities</li>
                    <li>More accurate predictions about future outcomes</li>
                    <li>Deeper understanding of complex systems</li>
                    <li>Improved learning efficiency across domains</li>
                  </ul>
                </div>
              </DashboardCard>
              
              <DashboardCard title="Building Your Mental Toolbox">
                <div className="prose dark:prose-invert">
                  <p>
                    Improving your thinking requires deliberate practice:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>
                      <strong>Study diverse models</strong> - Learn models from different disciplines
                    </li>
                    <li>
                      <strong>Apply them consciously</strong> - Practice using models in real-life situations
                    </li>
                    <li>
                      <strong>Use multiple models</strong> - Complex problems often require multiple perspectives
                    </li>
                    <li>
                      <strong>Update your models</strong> - Be willing to revise your thinking as you gather new evidence
                    </li>
                    <li>
                      <strong>Teach others</strong> - Explaining mental models helps solidify your understanding
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
                  <label htmlFor="search-models" className="text-sm font-medium mb-1 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-models"
                      type="search"
                      placeholder="Search mental models..."
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
                Showing {displayedModels.length} mental models
                {categoryFilter !== "all" && ` in ${categoryFilter}`}
                {searchTerm && ` matching "${searchTerm}"`}
                {viewMode === "saved" && ` in your library`}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedModels.map(model => {
                const Icon = model.icon;
                const isSaved = savedModels.includes(model.id);
                
                return (
                  <Card key={model.id} className="overflow-hidden h-full flex flex-col">
                    <div className="p-5 border-b border-border flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">{model.title}</h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {model.category}
                          </Badge>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 w-8 p-0 ${isSaved ? 'text-primary' : ''}`}
                              onClick={() => toggleSaveModel(model.id)}
                            >
                              {isSaved ? (
                                <Check size={16} />
                              ) : (
                                <BookmarkPlus size={16} />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isSaved ? 'Remove from library' : 'Save to library'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                      <div className="bg-muted/30 p-3 rounded-md text-sm mt-auto">
                        <p className="font-medium mb-1">Application</p>
                        <p className="text-muted-foreground">{model.application}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Pagination controls */}
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
          
          <TabsContent value="saved">
            {savedModels.length === 0 ? (
              <div className="text-center py-16">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">Your library is empty</h3>
                <p className="mt-1 text-muted-foreground">
                  Save mental models to build your personal toolkit
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setViewMode("all")}
                >
                  Browse All Mental Models
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paginatedModels.map(model => {
                    const Icon = model.icon;
                    return (
                      <Card key={model.id} className="overflow-hidden h-full flex flex-col">
                        <div className="p-5 border-b border-border flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Icon size={16} />
                            </div>
                            <div>
                              <h3 className="font-medium">{model.title}</h3>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {model.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-primary"
                            onClick={() => toggleSaveModel(model.id)}
                          >
                            <Check size={16} />
                          </Button>
                        </div>
                        <CardContent className="p-5 flex-1 flex flex-col">
                          <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                          <div className="bg-muted/30 p-3 rounded-md text-sm mt-auto">
                            <p className="font-medium mb-1">Application</p>
                            <p className="text-muted-foreground">{model.application}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                {/* Pagination for saved models */}
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
              </>
            )}
          </TabsContent>
        </Tabs>
        
        {viewMode === "featured" && (
          <>
            <h2 className="text-2xl font-bold mt-12 mb-6">Explore More Mental Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mentalModels.slice(0, 6).map(model => {
                const Icon = model.icon;
                const isSaved = savedModels.includes(model.id);
                
                return (
                  <Card key={model.id} className="overflow-hidden">
                    <div className="p-5 border-b border-border flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">{model.title}</h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {model.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${isSaved ? 'text-primary' : ''}`}
                        onClick={() => toggleSaveModel(model.id)}
                      >
                        {isSaved ? (
                          <Check size={16} />
                        ) : (
                          <BookmarkPlus size={16} />
                        )}
                      </Button>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <Button onClick={() => setViewMode("all")}>
                View All Mental Models
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MentalModels;
