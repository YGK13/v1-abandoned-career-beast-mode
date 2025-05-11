
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import the separated components
import CurrentPosition from "./career-path/CurrentPosition";
import PotentialNextSteps from "./career-path/PotentialNextSteps";
import SkillsToDevelop from "./career-path/SkillsToDevelop";
import LoadingState from "./career-path/LoadingState";
import ErrorState from "./career-path/ErrorState";
import { useCareerPathAnalysis } from "./career-path/useCareerPathAnalysis";

const CareerPathAnalysis: React.FC = () => {
  const {
    currentPosition,
    company,
    duration,
    skills,
    isLoading,
    error,
    careerPathData
  } = useCareerPathAnalysis();
  
  const { potentialNextStep, skillsToDevelop, suggestedSkills } = careerPathData;
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Career Path Analysis</CardTitle>
            <CardDescription>Based on your profile and industry trends</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Update Preferences
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CurrentPosition 
              currentPosition={currentPosition} 
              company={company} 
              duration={duration} 
              skills={skills} 
            />
            
            <PotentialNextSteps 
              potentialNextStep={potentialNextStep} 
              suggestedSkills={suggestedSkills} 
            />
            
            <SkillsToDevelop 
              skillsToDevelop={skillsToDevelop} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerPathAnalysis;
