
import React from "react";
import { Milestone, Flag, Briefcase, CircleCheck, CircleDollarSign, Users, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BusinessMilestoneProps = {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
};

const BusinessMilestone: React.FC<BusinessMilestoneProps> = ({
  step,
  title,
  description,
  icon,
  isCompleted = false,
  isActive = false,
}) => {
  return (
    <div className={cn(
      "relative flex items-start gap-3 pb-8",
      step === 5 && "pb-0" // Remove padding on last item
    )}>
      {/* Vertical line connector */}
      {step < 5 && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-muted-foreground/20"></div>
      )}
      
      {/* Icon container */}
      <div className={cn(
        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        isCompleted ? "bg-green-100 text-green-600" : 
                     isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      )}>
        {icon}
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-medium leading-none">{title}</h4>
          {isCompleted && <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200">Completed</Badge>}
          {isActive && <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">In Progress</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const BusinessRoadmap: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  return (
    <Card className="bg-card mb-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Business Launch Roadmap</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? "Hide" : "Show"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="mt-4">
              <BusinessMilestone
                step={1}
                title="Choose Your Business Structure"
                description="Form an LLC, corporation, or sole proprietorship. Each has different legal and tax implications."
                icon={<Building className="h-5 w-5" />}
                isCompleted={false}
                isActive={true}
              />
              
              <BusinessMilestone
                step={2}
                title="Set Up Financial Infrastructure"
                description="Open a business bank account, establish payment methods, and set up accounting systems."
                icon={<CircleDollarSign className="h-5 w-5" />}
                isCompleted={false}
                isActive={false}
              />
              
              <BusinessMilestone
                step={3}
                title="Establish Your Business Presence"
                description="Create a professional address, set up communication channels, and build your online identity."
                icon={<Briefcase className="h-5 w-5" />}
                isCompleted={false}
                isActive={false}
              />
              
              <BusinessMilestone
                step={4}
                title="Build Your Network"
                description="Connect with partners, suppliers, and potential customers to start growing your business ecosystem."
                icon={<Users className="h-5 w-5" />}
                isCompleted={false}
                isActive={false}
              />
              
              <BusinessMilestone
                step={5}
                title="Launch and Scale"
                description="Start operations, refine your processes, and prepare for growth with advanced tools and strategies."
                icon={<Milestone className="h-5 w-5" />}
                isCompleted={false}
                isActive={false}
              />
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};

export default BusinessRoadmap;
