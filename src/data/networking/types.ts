
import { LucideIcon } from "lucide-react";

export type ConnectionType = 'industry' | 'skill' | 'company' | 'alumni';

export interface PersonRecommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl?: string;
  linkedinUrl: string;
  connectionType: ConnectionType;
  connectionReason: string;
  tags: string[];
  mutualConnections?: number;
}

export interface IndustryGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: LucideIcon;
  url: string;
  valueProposition: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  time: string;
  location?: string;
}

export interface LocalGroup {
  id: string;
  name: string;
  description: string;
  location: string;
  url: string;
  upcomingEvent?: UpcomingEvent;
}

export interface ExecutivePlatform {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  url: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
}
