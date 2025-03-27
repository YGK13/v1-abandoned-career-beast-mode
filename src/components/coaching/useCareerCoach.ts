
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message, Category } from "./types";
import { sampleResponses, categories } from "./careerCoachData";

export const useCareerCoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm your AI Career Coach trained on 'Be Your Own Commander-in-Chief' and extensive career resources! I can provide detailed guidance on job searching, interview preparation, salary negotiation, career transitions, LinkedIn optimization, and professional development. I also consider your uploaded documents for personalized advice. How can I help advance your career today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userDocuments, setUserDocuments] = useState<string[]>([]); // Would store document content from uploads
  const [linkedInData, setLinkedInData] = useState<any>(null); // Would store LinkedIn profile data
  const { toast } = useToast();

  // Simulate documents being loaded - in a real implementation, this would connect to actual user data
  useEffect(() => {
    // This is a placeholder for actual document loading functionality
    const mockDocuments = [
      "Resume highlighting 5 years of product management experience",
      "Performance reviews indicating strengths in stakeholder management"
    ];
    setUserDocuments(mockDocuments);
    
    // Simulated LinkedIn data
    const mockLinkedInData = {
      currentRole: "Senior Product Manager",
      skills: ["Product Strategy", "User Research", "Agile Methodologies"],
      connections: 580,
      recommendations: 7,
      engagementRate: "low"
    };
    setLinkedInData(mockLinkedInData);
  }, []);

  // More sophisticated categorization that can handle multiple topics
  const categorizeQuestion = (question: string): Category[] => {
    question = question.toLowerCase();
    const matchedCategories: Category[] = [];
    
    // Check for document analysis requests
    if (question.includes("resume") || question.includes("cv") || question.includes("document") || 
        question.includes("my background") || question.includes("my experience")) {
      matchedCategories.push("document_analysis");
    }
    
    // Check for LinkedIn related queries
    if (question.includes("linkedin") || question.includes("profile") || question.includes("online presence")) {
      matchedCategories.push("linkedin_optimization");
    }
    
    // Check for salary data requests
    if (question.includes("salary data") || question.includes("compensation report") || 
        question.includes("salary range") || question.includes("market rate") || 
        question.includes("pay scale")) {
      matchedCategories.push("salary_data");
    }
    
    // Check for all other categories
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => question.includes(keyword))) {
        if (!matchedCategories.includes(category as Category)) {
          matchedCategories.push(category as Category);
        }
      }
    }
    
    return matchedCategories.length > 0 ? matchedCategories : ["general"];
  };

  // Get contextualized AI response based on question categories and user context
  const getAiResponse = (question: string): string => {
    const matchedCategories = categorizeQuestion(question);
    let response = "";
    
    // If we need to analyze documents
    if (matchedCategories.includes("document_analysis") && userDocuments.length > 0) {
      response = sampleResponses.document_analysis[0] + "\n\n";
    }
    
    // If we need to provide LinkedIn optimization advice
    if (matchedCategories.includes("linkedin_optimization") && linkedInData) {
      // Get LinkedIn-specific advice and customize based on their profile data
      const linkedInAdvice = sampleResponses.linkedin_optimization[
        Math.floor(Math.random() * sampleResponses.linkedin_optimization.length)
      ];
      
      // Add profile-specific insights based on their LinkedIn data
      const profileInsight = `Based on your current LinkedIn profile as a ${linkedInData.currentRole} with ${linkedInData.connections} connections, I notice your engagement rate is ${linkedInData.engagementRate}. To improve visibility, consider increasing your posting frequency and engagement with industry content.\n\n`;
      
      response += profileInsight + linkedInAdvice + "\n\n";
    }
    
    // Get responses from other matched categories
    const primaryCategory = matchedCategories.find(cat => 
      cat !== "document_analysis" && cat !== "linkedin_optimization") || "general";
    
    const primaryResponse = sampleResponses[primaryCategory][
      Math.floor(Math.random() * sampleResponses[primaryCategory].length)
    ];
    
    response += primaryResponse;
    
    // Add personalization based on their documents and context
    if (userDocuments.length > 0 && !matchedCategories.includes("document_analysis")) {
      response += `\n\nNote: Based on your uploaded documents showing ${userDocuments[0]}, consider how these specific experiences relate to this advice.`;
    }
    
    return response;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking and typing with a slightly longer delay for more thoughtful responses
    setTimeout(() => {
      const response = getAiResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "Career Coaching Insights",
        description: "Detailed guidance based on 'Be Your Own Commander-in-Chief' methodology",
        duration: 5000
      });
    }, 2500);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage,
    userDocuments,
    linkedInData
  };
};

