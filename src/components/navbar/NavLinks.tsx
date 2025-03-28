
import React from "react";
import NavLink from "./NavLink";
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  FileText, 
  Users, 
  Rocket, 
  DollarSign,
  HelpCircle,
  LifeBuoy,
  Building,
  BookOpen,
  BarChart3
} from "lucide-react";

const NavLinks: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <NavLink to="/" icon={LayoutDashboard} label="Dashboard" />
      <NavLink to="/jobs" icon={Briefcase} label="Jobs" />
      <NavLink to="/skills" icon={Award} label="Skills" />
      <NavLink to="/career-docs" icon={FileText} label="Career Assets" />
      <NavLink to="/documents" icon={FileText} label="Documents" />
      <NavLink to="/networking" icon={Users} label="Networking" />
      <NavLink to="/personal-brand" icon={Rocket} label="Personal Brand" />
      <NavLink to="/salary-title" icon={DollarSign} label="Salary/Title" />
      <NavLink to="/coaching" icon={BookOpen} label="Coaching" />
      <NavLink to="/life-design" icon={LifeBuoy} label="Life Design" />
      <NavLink to="/business" icon={Building} label="Business" />
      <NavLink to="/monetize" icon={DollarSign} label="Monetize" />
      <NavLink to="/career-tracking" icon={BarChart3} label="Track Progress" />
      <NavLink to="/help" icon={HelpCircle} label="Help" />
      <NavLink to="/faq" icon={HelpCircle} label="FAQ & Setup" />
    </div>
  );
};

export default NavLinks;
