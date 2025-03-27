
import { Heart, Shield, Clock, User, Users, Briefcase, BookOpen } from "lucide-react";

export interface LifeSkill {
  id: number;
  title: string;
  description: string;
  actionStep: string;
  category: string;
  icon: React.ElementType;
}

export const lifeSkills: LifeSkill[] = [
  {
    id: 1,
    title: "Active Listening",
    description: "Fully concentrating on what is being said rather than passively hearing the message of the speaker.",
    actionStep: "Today, make a conscious effort to not interrupt others when they speak and reflect back what you heard before responding.",
    category: "Communication",
    icon: Users
  },
  {
    id: 2,
    title: "Emotional Regulation",
    description: "Managing your emotions in a constructive way, especially in high-pressure situations.",
    actionStep: "When you feel stressed today, take 3 deep breaths and name the emotion you're experiencing before responding.",
    category: "Emotional Intelligence",
    icon: Heart
  },
  {
    id: 3,
    title: "Boundary Setting",
    description: "Clearly establishing what behavior you will and won't accept from others and yourself.",
    actionStep: "Identify one area where you need stronger boundaries and practice saying 'no' or setting a limit today.",
    category: "Self-Care",
    icon: Shield
  },
  {
    id: 4,
    title: "Time Blocking",
    description: "Dividing your day into blocks of time dedicated to specific tasks or activities.",
    actionStep: "Set aside three focused 90-minute work blocks tomorrow, with short breaks in between, for your most important tasks.",
    category: "Productivity",
    icon: Clock
  },
  {
    id: 5,
    title: "Growth Mindset",
    description: "Believing your talents can be developed through hard work, good strategies, and feedback.",
    actionStep: "When facing a challenge today, replace 'I can't do this' with 'I can't do this yet' and identify one small step forward.",
    category: "Mindset",
    icon: BookOpen
  },
  {
    id: 6,
    title: "Constructive Feedback",
    description: "Providing observations and suggestions to help others improve in a way that's specific and supportive.",
    actionStep: "Use the format 'I noticed X, it impacted Y, could you consider Z?' next time you need to give feedback to someone.",
    category: "Communication",
    icon: Briefcase
  },
  {
    id: 7,
    title: "Self-Compassion",
    description: "Treating yourself with the same kindness and understanding you would offer to a good friend.",
    actionStep: "When you make a mistake today, notice your self-talk and intentionally speak to yourself as you would to someone you care about.",
    category: "Self-Care",
    icon: User
  }
];
