
import { LucideIcon, Briefcase, Users, Building } from "lucide-react";

export interface LinkedInConnection {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
  email: string;
  linkedInUrl: string;
  connectionStrength: "strong" | "medium" | "weak";
  mutualConnections: number;
  lastInteraction?: string;
}

// Mock data for LinkedIn connections
export const linkedInConnections: LinkedInConnection[] = [
  {
    id: "c1",
    name: "Alex Rivera",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "alex.rivera@techcorp.com",
    linkedInUrl: "https://linkedin.com/in/alexrivera",
    connectionStrength: "strong",
    mutualConnections: 12,
    lastInteraction: "2 weeks ago"
  },
  {
    id: "c2",
    name: "Priya Sharma",
    title: "Technical Recruiter",
    company: "InnovateLabs",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "priya.sharma@innovatelabs.com",
    linkedInUrl: "https://linkedin.com/in/priyasharma",
    connectionStrength: "medium",
    mutualConnections: 7
  },
  {
    id: "c3",
    name: "Marcus Johnson",
    title: "VP of Engineering",
    company: "TechCorp Inc.",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "marcus.johnson@techcorp.com",
    linkedInUrl: "https://linkedin.com/in/marcusjohnson",
    connectionStrength: "strong",
    mutualConnections: 15,
    lastInteraction: "1 month ago"
  },
  {
    id: "c4",
    name: "Elena Rodriguez",
    title: "Head of Product Marketing",
    company: "GrowthFirst",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    email: "elena.rodriguez@growthfirst.com",
    linkedInUrl: "https://linkedin.com/in/elenarodriguez",
    connectionStrength: "medium",
    mutualConnections: 5
  },
  {
    id: "c5",
    name: "James Wilson",
    title: "Senior Software Engineer",
    company: "InnovateLabs",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    email: "james.wilson@innovatelabs.com",
    linkedInUrl: "https://linkedin.com/in/jameswilson",
    connectionStrength: "weak",
    mutualConnections: 3
  }
];

// Function to get connections for a specific company
export const getConnectionsForCompany = (companyName: string): LinkedInConnection[] => {
  return linkedInConnections.filter(connection => 
    connection.company.toLowerCase().includes(companyName.toLowerCase())
  );
};
