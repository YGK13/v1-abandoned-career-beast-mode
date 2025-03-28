
import React from "react";
import { 
  Home, 
  FileText, 
  Briefcase, 
  Award,
  HelpCircle,
  GraduationCap,
  Target,
  CreditCard,
  Building,
  Sprout,
  Factory,
  User,
  Landmark,
  Mailbox,
  Link,
  Users,
  DollarSign,
  Linkedin,
  Network,
  FileSpreadsheet
} from "lucide-react";
import GrowthChartIcon from "./icons/GrowthChartIcon";
import { NavItem } from "./NavLink";

export const navLinks: NavItem[] = [
  { path: "/", label: "Home", icon: Home },
  { 
    path: "/build", 
    label: "Build", 
    icon: Building,
    children: [
      { path: "/career-docs", label: "Career Assets", icon: FileText }, 
      { path: "/linkedin", label: "LinkedIn", icon: Linkedin },
      { path: "/manage-everything", label: "Manage Everything", icon: Users },
      { path: "/build-business", label: "Start Your Biz", icon: Factory },
      { path: "/bio-generator", label: "Bio Generator", icon: FileSpreadsheet }
    ]
  },
  { 
    path: "/grow", 
    label: "Grow", 
    icon: Sprout,
    children: [
      { path: "/salary-title", label: "Salary + Title", icon: Target },
      { path: "/skills", label: "Pro Skills", icon: Award },
      { path: "/coaching", label: "Coaching", icon: GraduationCap },
      { path: "/networking", label: "Networking", icon: Network },
      { path: "/personal-brand", label: "Personal Brand", icon: User },
    ]
  },
  { 
    path: "/scale", 
    label: "Scale", 
    icon: GrowthChartIcon,
    children: [
      { path: "/lifedesign", label: "Life Design", icon: Target },
      { path: "/scale-your-biz", label: "Scale Your Biz", icon: Factory },
      { path: "/monetize-expertise", label: "Monetize Expertise", icon: DollarSign },
      { path: "/mental-models", label: "Mental Models", icon: Target },
      { path: "/life-skills", label: "Life Skills", icon: Award }
    ]
  },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/pricing", label: "Pricing", icon: CreditCard },
  { path: "/help", label: "Help", icon: HelpCircle },
];
