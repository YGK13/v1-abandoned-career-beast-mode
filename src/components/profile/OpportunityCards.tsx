
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Opportunity {
  type: "career" | "network" | "monetize" | "business";
  title: string;
  description: string;
  recommendation: string;
  link: string;
}

interface OpportunityCardsProps {
  opportunities: Opportunity[];
}

const OpportunityCards: React.FC<OpportunityCardsProps> = ({ opportunities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "career":
        return <Award size={18} />;
      case "network":
        return <Users size={18} />;
      case "monetize":
        return <DollarSign size={18} />;
      case "business":
        return <Briefcase size={18} />;
      default:
        return <Award size={18} />;
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case "career":
        return "Career Growth";
      case "network":
        return "Strategic Networking";
      case "monetize":
        return "Monetize Expertise";
      case "business":
        return "Side Business";
      default:
        return "Opportunity";
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case "career":
        return "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20";
      case "network":
        return "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20";
      case "monetize":
        return "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20";
      case "business":
        return "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20";
      default:
        return "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20";
    }
  };

  const getButtonClass = (type: string) => {
    switch (type) {
      case "career":
        return "bg-blue-500 hover:bg-blue-600";
      case "network":
        return "bg-green-500 hover:bg-green-600";
      case "monetize":
        return "bg-amber-500 hover:bg-amber-600";
      case "business":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Growth Opportunities</CardTitle>
        <CardDescription>Strategic paths to enhance your career</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {opportunities.map((opportunity, index) => (
            <div 
              key={index}
              className={`rounded-lg overflow-hidden border bg-gradient-to-br ${getGradient(opportunity.type)}`}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/80 text-${opportunity.type === 'career' ? 'blue' : opportunity.type === 'network' ? 'green' : opportunity.type === 'monetize' ? 'amber' : 'red'}-500`}>
                    {getIcon(opportunity.type)}
                  </div>
                  <h3 className="font-medium">{getTitle(opportunity.type)}</h3>
                </div>
                
                <h4 className="font-medium mb-1">{opportunity.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {opportunity.description}
                </p>
                
                <div className="bg-white/80 p-3 rounded-md mb-3 dark:bg-black/10">
                  <span className="text-xs font-medium">Recommendation:</span>
                  <p className="text-sm">{opportunity.recommendation}</p>
                </div>
                
                <Button 
                  className={`w-full text-white ${getButtonClass(opportunity.type)}`}
                  asChild
                >
                  <a href={opportunity.link}>Explore Opportunity</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCards;
