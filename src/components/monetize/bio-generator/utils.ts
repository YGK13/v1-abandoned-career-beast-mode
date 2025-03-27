
import { LinkedInData, CareerDoc } from "./types";

// Generate bio templates based on user inputs
export const getBioTemplates = (
  firstName: string,
  lastName: string,
  headline: string,
  years: string,
  expertise: string[]
) => {
  return {
    professional: `${firstName} ${lastName} is a ${headline} with ${years} years of experience, specializing in ${expertise.join(", ")}. Known for delivering strategic solutions, ${firstName} has a proven track record of success across various projects and initiatives.`,
    
    conversational: `Hey there! I'm ${firstName} ${lastName}, a passionate ${headline} with ${years} years in the field. I love working on ${expertise.join(", ")}, and I'm always looking for new challenges to tackle. Let's connect and explore how we can collaborate!`,
    
    academic: `${firstName} ${lastName}, a ${headline} with ${years} years of experience, has developed significant expertise in ${expertise.join(", ")}. Their research and professional work have contributed to advancements in these domains, leading to effective implementations across various contexts.`
  };
};

// Mock LinkedIn data for demonstration
export const getMockLinkedInData = (): LinkedInData => {
  return {
    headline: "Senior Software Engineer",
    skills: ["JavaScript", "React", "TypeScript", "Node.js", "Cloud Architecture"],
    positions: [
      { 
        title: "Senior Software Engineer", 
        company: "Tech Solutions Inc", 
        duration: "2019 - Present" 
      },
      { 
        title: "Software Developer", 
        company: "Digital Innovations", 
        duration: "2016 - 2019" 
      }
    ]
  };
};

// Mock career documents for demonstration
export const getMockCareerDocs = (): CareerDoc[] => {
  return [
    {
      type: "Resume",
      content: "Experienced software engineer with a proven track record in developing scalable web applications..."
    },
    {
      type: "Cover Letter",
      content: "As a passionate technologist with 7+ years of experience in software development..."
    },
    {
      type: "Previous Bio",
      content: "John Doe is a senior software engineer specializing in building robust web applications..."
    }
  ];
};
