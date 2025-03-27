
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message, Category } from "./types";
import { sampleResponses, categories } from "./careerCoachData";

export const useCareerCoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm your AI Career Coach! Ask me any questions about your career development, job search, interview preparation, or professional growth. How can I help you today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Categorize question based on keywords
  const categorizeQuestion = (question: string): Category => {
    question = question.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => question.includes(keyword))) {
        return category as Category;
      }
    }
    return "general";
  };

  // Get AI response based on question category
  const getAiResponse = (question: string): string => {
    const category = categorizeQuestion(question);
    const responses = sampleResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
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
    
    // Simulate AI thinking and typing
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
        title: "New Career Advice",
        description: "The AI coach has responded to your question",
        duration: 3000
      });
    }, 1500);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage
  };
};
