
import React from "react";
import { useResumeData } from "@/hooks/useResumeData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Sample industry leaders data
const industryLeaders = [
  {
    name: "Sarah Johnson",
    role: "VP of Product",
    company: "Tech Innovations",
    relevance: "Product Development",
    connectReason: "Expert in your industry with similar career trajectory"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "Future Systems",
    relevance: "Technical Leadership",
    connectReason: "Technical leader in your field who can provide mentorship"
  },
  {
    name: "Rachel Rodriguez",
    role: "Marketing Director",
    company: "Growth Strategies",
    relevance: "Marketing Strategy",
    connectReason: "Can provide insights on industry marketing trends"
  }
];

const IndustryConnections: React.FC = () => {
  const { currentPosition, company, skills } = useResumeData();

  const getTitle = () => {
    if (currentPosition) {
      if (currentPosition.toLowerCase().includes('manager') || 
          currentPosition.toLowerCase().includes('director') || 
          currentPosition.toLowerCase().includes('vp')) {
        return "Leadership Network Connections";
      }
      
      if (currentPosition.toLowerCase().includes('engineer') || 
          currentPosition.toLowerCase().includes('developer')) {
        return "Technical Network Connections";
      }
    }
    
    return "Industry Network Connections";
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>{getTitle()}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground pt-2">
          Key industry professionals aligned with your career path
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Relevance</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {industryLeaders.map((leader, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{leader.name}</TableCell>
                  <TableCell>{leader.role}</TableCell>
                  <TableCell className="hidden md:table-cell">{leader.company}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{leader.relevance}</span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Connect</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary" />
            <h4 className="font-medium">Why Connect?</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            These connections are recommended based on your current role as 
            {currentPosition ? ` a ${currentPosition}` : ''} 
            {company ? ` at ${company}` : ''} 
            and your skills in 
            {skills && skills.length > 0 ? 
              ` ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', and more' : ''}` : 
              ' your field'}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryConnections;
