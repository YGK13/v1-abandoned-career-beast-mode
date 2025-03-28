
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
  BookOpen
} from "lucide-react";

const NavLinks: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <NavLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
      <NavLink to="/jobs" icon={<Briefcase size={18} />} label="Jobs" />
      <NavLink to="/skills" icon={<Award size={18} />} label="Skills" />
      <NavLink to="/career-docs" icon={<FileText size={18} />} label="Career Assets" />
      <NavLink to="/documents" icon={<FileText size={18} />} label="Documents" />
      <NavLink to="/networking" icon={<Users size={18} />} label="Networking" />
      <NavLink to="/personal-brand" icon={<Rocket size={18} />} label="Personal Brand" />
      <NavLink to="/salary-title" icon={<DollarSign size={18} />} label="Salary/Title" />
      <NavLink to="/coaching" icon={<BookOpen size={18} />} label="Coaching" />
      <NavLink to="/life-design" icon={<LifeBuoy size={18} />} label="Life Design" />
      <NavLink to="/business" icon={<Building size={18} />} label="Business" />
      <NavLink to="/monetize" icon={<DollarSign size={18} />} label="Monetize" />
      <NavLink to="/help" icon={<HelpCircle size={18} />} label="Help" />
      <NavLink to="/faq" icon={<HelpCircle size={18} />} label="FAQ & Setup" />
    </div>
  );
};

export default NavLinks;
