
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level: number;
  category: string;
  isHighDemand: boolean;
}

interface SkillsRadarChartProps {
  skills: Skill[];
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ skills }) => {
  // Organize skills by category for filtering
  const categories = [...new Set(skills.map(skill => skill.category))];
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const displaySkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  // Format data for the radar chart
  const radarData = displaySkills.map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 100
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Skills Radar</CardTitle>
            <CardDescription>
              Your skill proficiency across key areas
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skill Level"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {displaySkills.filter(skill => skill.isHighDemand).map((skill) => (
            <div key={skill.name} className="bg-muted/50 p-2 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{skill.name}</span>
                <Badge variant="secondary" className="text-xs">In demand</Badge>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="h-2 bg-primary/20 rounded-full flex-1">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-xs">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsRadarChart;
