
import { useMemo } from "react";
import { useResumeData } from "@/hooks/useResumeData";

export interface CareerPathData {
  potentialNextStep: {
    title: string;
    timeline: string;
  };
  skillsToDevelop: {
    name: string;
    progress: number;
  }[];
  suggestedSkills: string[];
}

export const useCareerPathAnalysis = (): {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
  isLoading: boolean;
  error: string | null;
  careerPathData: CareerPathData;
} => {
  const { currentPosition, company, duration, skills, isLoading, error } = useResumeData();

  // Generate potential next steps based on current position
  const potentialNextStep = useMemo(() => {
    if (!currentPosition) return { title: "Senior Role", timeline: "2-3 years" };
    
    const position = currentPosition.toLowerCase();
    
    // Determine career level from current position
    const isExecutive = position.includes("chief") || position.includes("cxo") || 
                        position.includes("vp") || position.includes("president") || 
                        position.includes("executive");
    
    const isDirector = position.includes("director") || position.includes("head of");
    
    const isSenior = position.includes("senior") || position.includes("sr") || 
                     position.includes("lead") || position.includes("principal");
    
    const isManager = position.includes("manager") || position.includes("supervisor");
    
    const isSpecialist = position.includes("specialist") || position.includes("expert") || 
                         position.includes("sme") || position.includes("consultant");
    
    // Get the domain/function from the position
    const getDomain = () => {
      const domains = [
        "product", "marketing", "sales", "engineering", "development", 
        "design", "operations", "finance", "hr", "data", "research"
      ];
      
      for (const domain of domains) {
        if (position.includes(domain)) return domain;
      }
      
      return "professional";
    };
    
    const domain = getDomain();
    
    // Determine next career step based on level
    if (isExecutive) {
      return {
        title: `Chief ${domain.charAt(0).toUpperCase() + domain.slice(1)} Officer`,
        timeline: "0-1 years"
      };
    } else if (isDirector) {
      return {
        title: `VP of ${domain.charAt(0).toUpperCase() + domain.slice(1)}`,
        timeline: "1-2 years"
      };
    } else if (isSenior || isManager) {
      return {
        title: `Director of ${domain.charAt(0).toUpperCase() + domain.slice(1)}`,
        timeline: "2-3 years"
      };
    } else if (isSpecialist) {
      return {
        title: `Senior ${domain.charAt(0).toUpperCase() + domain.slice(1)} Specialist`,
        timeline: "1-2 years"
      };
    } else {
      return {
        title: `Senior ${currentPosition}`,
        timeline: "1-2 years"
      };
    }
  }, [currentPosition]);
  
  // Generate skills to develop based on current position and skills
  const skillsToDevelop = useMemo(() => {
    if (!currentPosition) return [];
    
    const position = currentPosition.toLowerCase();
    const currentSkills = skills.map(s => s.toLowerCase());
    
    // Define core leadership skills that are universally valuable
    const leadershipSkills = [
      { name: "Executive Leadership", progress: 40 },
      { name: "Strategic Planning", progress: 65 },
      { name: "Budget Management", progress: 35 }
    ];
    
    // Domain-specific skills based on position
    const domainSkills = {
      product: [
        { name: "Product Strategy", progress: 70 },
        { name: "Market Research", progress: 55 },
        { name: "User Experience", progress: 60 }
      ],
      engineering: [
        { name: "System Architecture", progress: 45 },
        { name: "Code Quality", progress: 75 },
        { name: "Technical Leadership", progress: 50 }
      ],
      marketing: [
        { name: "Brand Strategy", progress: 65 },
        { name: "Digital Marketing", progress: 80 },
        { name: "Analytics", progress: 45 }
      ],
      data: [
        { name: "Data Modeling", progress: 55 },
        { name: "Machine Learning", progress: 40 },
        { name: "Data Visualization", progress: 60 }
      ],
      hr: [
        { name: "Talent Development", progress: 70 },
        { name: "Organizational Design", progress: 45 },
        { name: "Conflict Resolution", progress: 60 }
      ],
      default: [
        { name: "Project Management", progress: 75 },
        { name: "Business Acumen", progress: 55 },
        { name: "Cross-functional Collaboration", progress: 65 }
      ]
    };
    
    // Determine which domain skills to use
    let relevantDomainSkills;
    if (position.includes("product")) {
      relevantDomainSkills = domainSkills.product;
    } else if (position.includes("engineer") || position.includes("developer")) {
      relevantDomainSkills = domainSkills.engineering;
    } else if (position.includes("market")) {
      relevantDomainSkills = domainSkills.marketing;
    } else if (position.includes("data") || position.includes("analyt")) {
      relevantDomainSkills = domainSkills.data;
    } else if (position.includes("hr") || position.includes("human resource")) {
      relevantDomainSkills = domainSkills.hr;
    } else {
      relevantDomainSkills = domainSkills.default;
    }
    
    // Combine leadership skills with domain-specific skills and filter out ones they already have
    const combinedSkills = [...leadershipSkills, ...relevantDomainSkills]
      .filter(skill => !currentSkills.includes(skill.name.toLowerCase()))
      .slice(0, 3); // Take only top 3 skills
    
    return combinedSkills.length > 0 ? combinedSkills : leadershipSkills;
  }, [currentPosition, skills]);
  
  // Suggested next skill badges based on career path
  const suggestedSkills = useMemo(() => {
    if (!currentPosition) return ["Business Strategy", "Executive Presence"];
    
    const position = currentPosition.toLowerCase();
    
    if (position.includes("director") || position.includes("vp") || position.includes("chief")) {
      return ["Business Strategy", "Executive Presence"];
    } else if (position.includes("manager") || position.includes("lead")) {
      return ["Team Leadership", "Strategic Planning"];
    } else if (position.includes("product")) {
      return ["Product Vision", "Market Research"];
    } else if (position.includes("engineer") || position.includes("developer")) {
      return ["System Design", "Technical Leadership"];
    } else {
      return ["Strategic Thinking", "Cross-functional Communication"];
    }
  }, [currentPosition]);

  const careerPathData = {
    potentialNextStep,
    skillsToDevelop,
    suggestedSkills
  };

  return {
    currentPosition,
    company,
    duration,
    skills,
    isLoading,
    error,
    careerPathData
  };
};
