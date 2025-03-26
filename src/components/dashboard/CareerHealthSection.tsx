
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, FileText, Briefcase, ChevronRight } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import CareerAvatar from "@/components/CareerAvatar";

interface CareerHealthSectionProps {
  careerScore: number;
}

const CareerHealthSection: React.FC<CareerHealthSectionProps> = ({ careerScore }) => {
  return (
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
  );
};

export default CareerHealthSection;
