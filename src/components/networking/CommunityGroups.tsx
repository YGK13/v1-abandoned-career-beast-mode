
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2, MessageSquare, Calendar, Users, Linkedin, Slack } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  type: "slack" | "linkedin" | "meetup" | "live" | "discord";
  link: string;
  topics: string[];
  members?: string;
  location?: string;
  nextEvent?: {
    title: string;
    date: string;
  };
}

const communityGroups: CommunityGroup[] = [
  {
    id: "cg1",
    name: "Product School",
    description: "Global community for product managers, with discussions on best practices and job opportunities",
    type: "slack",
    link: "https://productschool.com/slack-community/",
    topics: ["Product Management", "Career Development", "Tech"],
    members: "130,000+"
  },
  {
    id: "cg2",
    name: "Women in Tech",
    description: "Supportive community for women in technology fields to network and share resources",
    type: "slack",
    link: "https://witchat.github.io/",
    topics: ["Women in Tech", "Diversity", "Career Development"],
    members: "40,000+"
  },
  {
    id: "cg3",
    name: "UX Design Community",
    description: "Active discussion group for UX/UI designers to share work, get feedback, and find opportunities",
    type: "slack",
    link: "https://www.uxdesigncommunity.com/",
    topics: ["UX/UI Design", "User Research", "Prototyping"],
    members: "50,000+"
  },
  {
    id: "cg4",
    name: "DevOps Engineers",
    description: "Professional network for DevOps practitioners, SREs, and platform engineers",
    type: "linkedin",
    link: "https://www.linkedin.com/groups/12121233/",
    topics: ["DevOps", "Cloud", "CI/CD", "Infrastructure"],
    members: "85,000+"
  },
  {
    id: "cg5",
    name: "Data Science Network",
    description: "LinkedIn's largest data science group for professionals in ML, AI, and analytics",
    type: "linkedin",
    link: "https://www.linkedin.com/groups/6729458/",
    topics: ["Data Science", "Machine Learning", "Analytics"],
    members: "420,000+"
  },
  {
    id: "cg6",
    name: "Digital Marketing Professionals",
    description: "Global community of marketers sharing insights on SEO, SEM, content marketing, and social media",
    type: "linkedin",
    link: "https://www.linkedin.com/groups/36527/",
    topics: ["Digital Marketing", "Content Strategy", "SEO"],
    members: "980,000+"
  },
  {
    id: "cg7",
    name: "New York Tech Meetup",
    description: "America's largest technology community with monthly demos from the NYC tech scene",
    type: "meetup",
    link: "https://www.meetup.com/ny-tech/",
    topics: ["Startup", "Technology", "Networking"],
    location: "New York, NY",
    nextEvent: {
      title: "June Demo Night",
      date: "June 15, 2023"
    }
  },
  {
    id: "cg8",
    name: "San Francisco UX Design",
    description: "Community of UX designers in San Francisco Bay Area meeting for workshops and networking",
    type: "meetup",
    link: "https://www.meetup.com/sfuxd/",
    topics: ["UX Design", "Product Design", "Interaction Design"],
    location: "San Francisco, CA",
    nextEvent: {
      title: "Design Systems Workshop",
      date: "June 22, 2023"
    }
  },
  {
    id: "cg9",
    name: "Future of Work with Adam Grant",
    description: "Weekly LinkedIn Live sessions on organizational psychology and modern work trends",
    type: "live",
    link: "https://www.linkedin.com/in/adammgrant/",
    topics: ["Workplace Psychology", "Leadership", "Career Development"]
  },
  {
    id: "cg10",
    name: "Startup Founders Hub",
    description: "Weekly sessions with successful entrepreneurs sharing their startup journeys",
    type: "live",
    link: "https://www.linkedin.com/company/startupfoundershub/",
    topics: ["Entrepreneurship", "Funding", "Startup Growth"]
  },
  {
    id: "cg11",
    name: "Frontend Developers",
    description: "Active Discord community for frontend web developers to share knowledge and resources",
    type: "discord",
    link: "https://discord.gg/frontend",
    topics: ["Frontend Development", "JavaScript", "React", "CSS"],
    members: "75,000+"
  },
  {
    id: "cg12",
    name: "Tech Career Growth",
    description: "Community focused on career advancement in tech with regular AMAs from industry leaders",
    type: "discord",
    link: "https://discord.gg/techcareer",
    topics: ["Career Development", "Interviewing", "Salary Negotiation"],
    members: "35,000+"
  }
];

const getIconForGroupType = (type: CommunityGroup["type"]) => {
  switch (type) {
    case "slack":
      return <Slack className="h-5 w-5 text-primary" />;
    case "linkedin":
      return <Linkedin className="h-5 w-5 text-primary" />;
    case "meetup":
      return <Users className="h-5 w-5 text-primary" />;
    case "live":
      return <MessageSquare className="h-5 w-5 text-primary" />;
    case "discord":
      return <MessageSquare className="h-5 w-5 text-primary" />;
    default:
      return <Link2 className="h-5 w-5 text-primary" />;
  }
};

const getGroupTypeLabel = (type: CommunityGroup["type"]) => {
  switch (type) {
    case "slack":
      return "Slack Community";
    case "linkedin":
      return "LinkedIn Group";
    case "meetup":
      return "Meetup Group";
    case "live":
      return "LinkedIn Live";
    case "discord":
      return "Discord Server";
    default:
      return "Community";
  }
};

const CommunityGroups: React.FC = () => {
  const groupsByType = {
    slack: communityGroups.filter(group => group.type === "slack"),
    linkedin: communityGroups.filter(group => group.type === "linkedin"),
    meetup: communityGroups.filter(group => group.type === "meetup"),
    live: communityGroups.filter(group => group.type === "live"),
    discord: communityGroups.filter(group => group.type === "discord")
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Community Groups</h2>
      <p className="text-muted-foreground">
        Connect with professionals in your industry through these active communities
      </p>

      {Object.entries(groupsByType).map(([type, groups]) => (
        groups.length > 0 && (
          <div key={type} className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              {getIconForGroupType(type as CommunityGroup["type"])}
              {type.charAt(0).toUpperCase() + type.slice(1)} Communities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map(group => (
                <Card key={group.id} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="outline">{getGroupTypeLabel(group.type)}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {group.topics.map(topic => (
                          <Badge key={topic} variant="secondary" className="font-normal">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-col space-y-2 text-sm">
                        {group.members && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{group.members} members</span>
                          </div>
                        )}
                        {group.location && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>{group.location}</span>
                          </div>
                        )}
                        {group.nextEvent && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {group.nextEvent.title} - {group.nextEvent.date}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <a 
                        href={group.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 mt-2 text-sm"
                      >
                        <Link2 className="h-4 w-4" />
                        Join Community
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default CommunityGroups;
