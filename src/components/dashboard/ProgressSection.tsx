import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Award, 
  Users, 
  BookOpen, 
  Workflow, 
  Briefcase, 
  Target,
  User,
  Heart,
  Brain,
  Lightbulb,
  Building
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProgressItemProps {
  icon: React.ElementType;
  title: string;
  progress: number;
  path: string;
  description: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ 
  icon: Icon, 
  title, 
  progress, 
  path,
  description
}) => {
  return (
    <div className="group relative rounded-xl border p-5 transition-all hover:shadow-md">
      <div className="flex flex-col items-center text-center mb-4">
        <div className="mb-3">
          <Progress 
            value={progress} 
            variant="circular" 
            size="md" 
            className="mb-2" 
          />
        </div>
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
        <h3 className="font-medium mt-2">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      
      <Link to={path} className="inline-block w-full">
        <Button variant="outline" size="sm" className="w-full">
          Continue
        </Button>
      </Link>
    </div>
  );
};

const ProgressSection: React.FC = () => {
  // Mock progress data - in a real app, this would come from an API
  const progressItems = [
    {
      icon: FileText,
      title: "Career Assets",
      progress: 45,
      path: "/career-docs",
      description: "Resumes, certificates, and other career documents"
    },
    {
      icon: Users,
      title: "Networking",
      progress: 30,
      path: "/networking",
      description: "Connect with professionals in your industry"
    },
    {
      icon: Workflow,
      title: "Skills",
      progress: 75,
      path: "/skills",
      description: "Track and develop your professional skills"
    },
    {
      icon: BookOpen,
      title: "Coaching",
      progress: 20,
      path: "/coaching",
      description: "Get guidance from AI and professional coaches"
    },
    {
      icon: User,
      title: "Personal Brand",
      progress: 50,
      path: "/personal-brand",
      description: "Build and enhance your professional brand"
    },
    {
      icon: Target,
      title: "Salary & Title",
      progress: 35,
      path: "/salary-title",
      description: "Optimize your career trajectory"
    },
    {
      icon: Award,
      title: "Monetize Expertise",
      progress: 10,
      path: "/monetize-expertise",
      description: "Turn your knowledge into income"
    },
    {
      icon: Briefcase,
      title: "Find Jobs",
      progress: 55,
      path: "/jobs",
      description: "Discover opportunities matched to your profile"
    },
    {
      icon: Heart,
      title: "Life Design",
      progress: 40,
      path: "/lifedesign",
      description: "Design a life of purpose and meaning"
    },
    {
      icon: Building,
      title: "Start a Business",
      progress: 15,
      path: "/scale-your-biz",
      description: "Tools and resources to start your business"
    },
    {
      icon: Brain,
      title: "Mental Models",
      progress: 25,
      path: "/mental-models",
      description: "Powerful thinking frameworks for better decisions"
    },
    {
      icon: Lightbulb,
      title: "Life Skills",
      progress: 30,
      path: "/life-skills",
      description: "Essential skills for personal effectiveness"
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Your Career Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {progressItems.map((item, index) => (
            <ProgressItem key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
