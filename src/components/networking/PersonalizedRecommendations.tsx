
import React from "react";
import { useResumeData } from "@/hooks/useResumeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

const PersonalizedRecommendations: React.FC = () => {
  const { currentPosition, company, skills, yearsExperience } = useResumeData();
  
  const getPositionRecommendation = () => {
    if (!currentPosition) return null;
    
    const positionLower = currentPosition.toLowerCase();
    
    if (positionLower.includes('manager') || positionLower.includes('director')) {
      return (
        <div className="mb-4 p-3 border rounded-md">
          <h4 className="font-medium text-sm mb-2">Management Focused Networking</h4>
          <p className="text-sm text-muted-foreground">
            As a {currentPosition}, focus on connecting with other leaders in your industry 
            for mentorship and leadership insights.
          </p>
        </div>
      );
    }
    
    if (positionLower.includes('engineer') || positionLower.includes('developer')) {
      return (
        <div className="mb-4 p-3 border rounded-md">
          <h4 className="font-medium text-sm mb-2">Technical Networking</h4>
          <p className="text-sm text-muted-foreground">
            As a {currentPosition}, prioritize technical meetups and communities 
            where you can share knowledge and learn from peers.
          </p>
        </div>
      );
    }
    
    if (positionLower.includes('analyst') || positionLower.includes('consult')) {
      return (
        <div className="mb-4 p-3 border rounded-md">
          <h4 className="font-medium text-sm mb-2">Advisory Networking</h4>
          <p className="text-sm text-muted-foreground">
            As a {currentPosition}, focus on building relationships with industry experts 
            and potential clients to expand your professional opportunities.
          </p>
        </div>
      );
    }
    
    return (
      <div className="mb-4 p-3 border rounded-md">
        <h4 className="font-medium text-sm mb-2">Career Growth Networking</h4>
        <p className="text-sm text-muted-foreground">
          As a {currentPosition}, connect with peers and seniors in your field 
          to exchange insights and discover new opportunities.
        </p>
      </div>
    );
  };
  
  const getExperienceRecommendation = () => {
    if (!yearsExperience) return null;
    
    if (yearsExperience < 3) {
      return (
        <div className="mb-4 p-3 border rounded-md">
          <h4 className="font-medium text-sm mb-2">Early Career Networking</h4>
          <p className="text-sm text-muted-foreground">
            With {yearsExperience} years of experience, focus on connecting with mentors 
            and peers who can help accelerate your learning and growth.
          </p>
        </div>
      );
    }
    
    if (yearsExperience >= 3 && yearsExperience < 8) {
      return (
        <div className="mb-4 p-3 border rounded-md">
          <h4 className="font-medium text-sm mb-2">Mid-Career Networking</h4>
          <p className="text-sm text-muted-foreground">
            With {yearsExperience} years of experience, focus on industry-specific groups 
            where you can demonstrate expertise and build your professional reputation.
          </p>
        </div>
      );
    }
    
    return (
      <div className="mb-4 p-3 border rounded-md">
        <h4 className="font-medium text-sm mb-2">Senior Professional Networking</h4>
        <p className="text-sm text-muted-foreground">
          With {yearsExperience} years of experience, consider leadership communities 
          and speaking opportunities to share your knowledge and mentor others.
        </p>
      </div>
    );
  };
  
  const getSkillsRecommendation = () => {
    if (!skills || skills.length === 0) return null;
    
    return (
      <div className="mb-4 p-3 border rounded-md">
        <h4 className="font-medium text-sm mb-2">Skill-Based Networking</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Focus on communities centered around your core skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 5).map((skill, index) => (
            <Badge key={index} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Personalized Networking Strategy</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {getPositionRecommendation()}
          {getExperienceRecommendation()}
          {getSkillsRecommendation()}
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Weekly Networking Goal</h4>
            <p className="text-sm text-muted-foreground">
              Based on your profile, we recommend connecting with at least 3-5 new 
              professionals in your industry each week to expand your network effectively.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
