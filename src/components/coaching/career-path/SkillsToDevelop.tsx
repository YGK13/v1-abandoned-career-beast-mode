
import React from "react";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  progress: number;
}

interface SkillsToDevelopProps {
  skillsToDevelop: Skill[];
}

const SkillsToDevelop: React.FC<SkillsToDevelopProps> = ({ skillsToDevelop }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Skills to Develop</h3>
      <div className="p-4 rounded-md bg-muted/50">
        <div className="space-y-3">
          {skillsToDevelop.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.progress}%</span>
              </div>
              <Progress value={skill.progress} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsToDevelop;
