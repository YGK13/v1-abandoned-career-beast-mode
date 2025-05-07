
import { PersonRecommendation } from "./types";

// Mock data for person recommendations
export const personRecommendations: PersonRecommendation[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "TechCorp Solutions",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "industry",
    connectionReason: "Works in your target industry with similar skills in product management",
    tags: ["Product Management", "SaaS", "Strategic Planning"],
    mutualConnections: 3
  },
  {
    id: "p2",
    name: "Michael Chen",
    title: "Engineering Director",
    company: "InnovateTech",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "skill",
    connectionReason: "Expertise in software architecture matching your technical background",
    tags: ["Software Architecture", "Leadership", "Cloud Computing"],
    mutualConnections: 5
  },
  {
    id: "p3",
    name: "Rachel Rodriguez",
    title: "VP of Marketing",
    company: "GrowthFirst",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "industry",
    connectionReason: "Leader in digital marketing with potential partnership opportunities",
    tags: ["Digital Marketing", "Growth Strategy", "B2B"],
    mutualConnections: 2
  },
  {
    id: "p4",
    name: "David Williams",
    title: "Chief Financial Officer",
    company: "Capital Investments",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "company",
    connectionReason: "Works at a company you've shown interest in based on your profile",
    tags: ["Finance", "Investment", "Strategic Planning"],
    mutualConnections: 1
  },
  {
    id: "p5",
    name: "Jennifer Baker",
    title: "Talent Acquisition Specialist",
    company: "Dream Recruiters",
    imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "industry",
    connectionReason: "Can provide industry insights and potential job opportunities",
    tags: ["Recruitment", "HR", "Talent Management"],
    mutualConnections: 0
  },
  {
    id: "p6",
    name: "Thomas Clark",
    title: "Alumni Relations Manager",
    company: "University of Technology",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "alumni",
    connectionReason: "Fellow alumni from your university who can help expand your network",
    tags: ["Higher Education", "Alumni Networks", "Event Planning"],
    mutualConnections: 7
  }
];
