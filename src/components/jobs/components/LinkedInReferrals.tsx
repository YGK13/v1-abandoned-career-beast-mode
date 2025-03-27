
import React, { useState } from "react";
import { User, Mail, ExternalLink, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { LinkedInConnection } from "../data/linkedInConnectionsData";
import { Job } from "../data/types";
import ResumeGenerator from "../resume/ResumeGenerator";

interface LinkedInReferralsProps {
  job: Job;
  connections: LinkedInConnection[];
}

const LinkedInReferrals: React.FC<LinkedInReferralsProps> = ({ job, connections }) => {
  const [selectedConnection, setSelectedConnection] = useState<LinkedInConnection | null>(null);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);
  const [isReferralInProgress, setIsReferralInProgress] = useState(false);
  const { toast } = useToast();

  const handleConnectionClick = (connection: LinkedInConnection) => {
    setSelectedConnection(connection);
    setIsGeneratingResume(true);
    setShowResumeGenerator(true);
  };

  const handleSendReferralRequest = (connection: LinkedInConnection, resumeData: any) => {
    setIsReferralInProgress(true);
    
    // Create the email body with the referral request
    const subject = `Referral Request for ${job.title} position at ${job.company}`;
    const body = `Hi ${connection.name},

I hope this email finds you well. I recently came across a ${job.title} position at ${job.company} and I'm very interested in applying. Given your role at the company, I was wondering if you might be willing to refer me for this position.

I've attached my resume, which I've tailored specifically for this role. My background in ${resumeData.tailoredSkills.join(", ")} aligns well with what the job requires.

Would you be open to submitting an internal referral for me? I'd greatly appreciate your support, and I'm happy to provide any additional information you might need.

Thank you for considering my request.

Best regards,
[Your Name]`;

    // Create the mailto link
    const mailtoLink = `mailto:${connection.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the default email client
    window.open(mailtoLink, "_blank");
    
    // Show success toast
    toast({
      title: "Referral Email Created",
      description: `An email to ${connection.name} has been created in your default email client. Please review and send it with your resume attached.`,
    });
    
    // Reset states
    setIsReferralInProgress(false);
    setShowResumeGenerator(false);
    setIsGeneratingResume(false);
  };

  const getConnectionStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-blue-100 text-blue-800 border-blue-200";
      case "weak": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (connections.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border rounded-lg p-4 bg-background/50">
      <div className="flex items-center gap-2 mb-3">
        <UserCheck size={18} className="text-primary" />
        <h3 className="font-medium">LinkedIn Connections at {job.company}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        These connections can refer you internally. Click on a connection to request a referral.
      </p>
      
      <div className="space-y-2">
        {connections.map(connection => (
          <div 
            key={connection.id} 
            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => handleConnectionClick(connection)}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src={connection.imageUrl} 
                  alt={connection.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{connection.name}</p>
                <p className="text-xs text-muted-foreground">{connection.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getConnectionStrengthColor(connection.connectionStrength)}`}
              >
                {connection.connectionStrength === "strong" ? "Strong" : 
                 connection.connectionStrength === "medium" ? "Medium" : "New"}
              </Badge>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink size={14} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52 p-3">
                  <div className="space-y-2">
                    <a href={`mailto:${connection.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Mail size={14} />
                      <span>Email</span>
                    </a>
                    <a href={connection.linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <User size={14} />
                      <span>View Profile</span>
                    </a>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
      
      {showResumeGenerator && selectedConnection && (
        <ResumeGenerator 
          job={job}
          isGenerating={isGeneratingResume}
          isApplying={isReferralInProgress}
          onApply={(resumeData) => handleSendReferralRequest(selectedConnection, resumeData)}
          onCancel={() => {
            setShowResumeGenerator(false);
            setIsGeneratingResume(false);
          }}
        />
      )}
    </div>
  );
};

export default LinkedInReferrals;
