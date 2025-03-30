
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message, Category } from "./types";
import { sampleResponses, categories } from "./careerCoachData";
import { supabase } from "@/integrations/supabase/client";

export const useCareerCoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm your AI Career Coach trained on 'Be Your Own Commander-in-Chief' and extensive career resources! I can provide personalized guidance based on your documents and LinkedIn profile. How can I help advance your career today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userDocuments, setUserDocuments] = useState<string[]>([]); 
  const [linkedInData, setLinkedInData] = useState<any>(null);
  const [isAiResponsePending, setIsAiResponsePending] = useState(false);
  const { toast } = useToast();

  // Load user career data (this would connect to actual user data in production)
  useEffect(() => {
    // Mock document data - in a real implementation, this would come from the database
    const mockDocuments = [
      "Resume highlighting 5 years of product management experience at tech startups. Skills include roadmap development, user research, and cross-functional leadership. Led 3 major product launches that increased revenue by 35%.",
      "Performance reviews indicating strengths in stakeholder management, strategic thinking, and team leadership. Areas for growth include technical depth and delegation skills.",
      "Cover letter emphasizing interest in director-level product roles at enterprise SaaS companies, with focus on AI/ML products."
    ];
    setUserDocuments(mockDocuments);
    
    // Mock LinkedIn data - in a real implementation, this would come from LinkedIn API
    const mockLinkedInData = {
      currentRole: "Senior Product Manager at TechCorp",
      skills: ["Product Strategy", "User Research", "Agile Methodologies", "Cross-functional Leadership", "Product Analytics"],
      connections: 580,
      recommendations: 7,
      endorsements: {
        "Product Strategy": 28,
        "User Research": 19,
        "Agile": 32
      },
      education: "MBA, Stanford University",
      recentActivity: "Shared 3 posts about product management in the last month",
      engagementRate: "low"
    };
    setLinkedInData(mockLinkedInData);
  }, []);

  const getAiResponse = useCallback(async (userQuery: string) => {
    setIsAiResponsePending(true);
    
    try {
      // Call our edge function with the user query and context
      const { data, error } = await supabase.functions.invoke('career-coach-ai', {
        body: {
          userMessage: userQuery,
          userDocuments,
          linkedInData,
          messageHistory: messages.slice(-5) // Send last 5 messages for context
        }
      });
      
      if (error) {
        console.error("Error calling AI edge function:", error);
        // Fallback to sample responses if the API call fails
        return fallbackResponse(userQuery);
      }
      
      return data.response;
    } catch (err) {
      console.error("Exception in getAiResponse:", err);
      // Fallback to sample responses in case of any exception
      return fallbackResponse(userQuery);
    } finally {
      setIsAiResponsePending(false);
    }
  }, [messages, userDocuments, linkedInData]);

  // Fallback response mechanism using the original categorization logic
  const fallbackResponse = (question: string): string => {
    console.log("Using fallback response mechanism");
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
      response += `\n\nNote: Based on your uploaded documents showing ${userDocuments[0].substring(0, 100)}..., consider how these specific experiences relate to this advice.`;
    }
    
    return response;
  };

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

  const handleSendMessage = async () => {
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
    
    try {
      // Get AI response
      const response = await getAiResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "Personalized Career Guidance",
        description: "Based on your documents, LinkedIn profile, and Commander-in-Chief principles",
        duration: 5000
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an issue generating a response. Please try again in a moment.",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "AI Response Error",
        description: "There was a problem generating your career advice.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsTyping(false);
    }
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
