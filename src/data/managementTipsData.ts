
import {
  Users,
  Clock,
  Battery,
  FolderKanban,
  Presentation,
} from "lucide-react";

export interface ManagementTip {
  id: number;
  title: string;
  description: string;
  source: string;
}

export interface ManagementCategory {
  title: string;
  icon: any;
  tips: ManagementTip[];
}

export type ManagementTipsData = Record<string, ManagementCategory>;

// Mock data - In a real app, this would come from an API
export const managementTips: ManagementTipsData = {
  people: {
    title: "Managing People",
    icon: Users,
    tips: [
      {
        id: 1,
        title: "Build Trust Through Transparency",
        description: "Regular one-on-ones with clear agendas and follow-ups build trust and alignment.",
        source: "The Manager's Path",
      },
      {
        id: 2,
        title: "Delegate Effectively",
        description: "Use the RACI matrix to clearly define roles and responsibilities in projects.",
        source: "High Output Management",
      },
    ],
  },
  time: {
    title: "Time Management",
    icon: Clock,
    tips: [
      {
        id: 1,
        title: "Time Blocking",
        description: "Dedicate specific blocks of time to focused work, meetings, and breaks.",
        source: "Deep Work",
      },
      {
        id: 2,
        title: "The Two-Minute Rule",
        description: "If a task takes less than two minutes, do it immediately rather than scheduling it.",
        source: "Getting Things Done",
      },
    ],
  },
  energy: {
    title: "Energy Management",
    icon: Battery,
    tips: [
      {
        id: 1,
        title: "Strategic Breaks",
        description: "Take regular breaks using the Pomodoro Technique to maintain high energy levels.",
        source: "Peak Performance",
      },
      {
        id: 2,
        title: "Energy Audit",
        description: "Track your energy levels throughout the day to identify your peak performance times.",
        source: "The Power of Full Engagement",
      },
    ],
  },
  projects: {
    title: "Project Management",
    icon: FolderKanban,
    tips: [
      {
        id: 1,
        title: "Clear Success Metrics",
        description: "Define SMART goals and KPIs at the start of each project.",
        source: "Project Management Body of Knowledge",
      },
      {
        id: 2,
        title: "Risk Management",
        description: "Maintain a risk register and review it weekly with stakeholders.",
        source: "Agile Project Management",
      },
    ],
  },
  programs: {
    title: "Program Management",
    icon: Presentation,
    tips: [
      {
        id: 1,
        title: "Strategic Alignment",
        description: "Ensure all projects within the program align with organizational objectives.",
        source: "Program Management for Improved Business Results",
      },
      {
        id: 2,
        title: "Stakeholder Communication",
        description: "Create a structured communication plan for different stakeholder groups.",
        source: "The Standard for Program Management",
      },
    ],
  },
};
