
import { LocalGroup } from "./types";

// Mock data for local groups
export const localGroups: LocalGroup[] = [
  {
    id: "lg1",
    name: "City Tech Meetup",
    description: "Monthly gatherings of local tech professionals for networking, talks, and demos.",
    location: "San Francisco, CA",
    url: "https://example.com/city-tech-meetup",
    upcomingEvent: {
      title: "AI in Production: Lessons from the Field",
      date: "June 15, 2023",
      time: "6:30 PM - 9:00 PM"
    }
  },
  {
    id: "lg2",
    name: "Entrepreneurs Roundtable",
    description: "A forum for local business owners and entrepreneurs to share experiences and advice.",
    location: "San Francisco, CA",
    url: "https://example.com/entrepreneurs-roundtable",
    upcomingEvent: {
      title: "Funding Strategies for Early-Stage Startups",
      date: "June 22, 2023",
      time: "7:00 PM - 8:30 PM"
    }
  },
  {
    id: "lg3",
    name: "Women in Leadership Alliance",
    description: "Supporting and connecting women in leadership positions across all industries.",
    location: "San Francisco, CA",
    url: "https://example.com/women-leadership",
    upcomingEvent: {
      title: "Breaking Barriers: Leadership Stories",
      date: "July 5, 2023",
      time: "5:30 PM - 8:00 PM"
    }
  }
];
