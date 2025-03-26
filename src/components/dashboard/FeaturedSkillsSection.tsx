
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SkillCard from "@/components/SkillCard";

interface Skill {
  name: string;
  level: number;
  category: string;
  trend: "up" | "down" | "stable";
  isInDemand: boolean;
}

interface FeaturedSkillsSectionProps {
  skills: Skill[];
}

const FeaturedSkillsSection: React.FC<FeaturedSkillsSectionProps> = ({ skills }) => {
  return (
    <div className="md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Featured Skills</h2>
        <Link to="/skills">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span>All Skills</span>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            name={skill.name}
            level={skill.level}
            category={skill.category}
            trend={skill.trend}
            isInDemand={skill.isInDemand}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSkillsSection;
