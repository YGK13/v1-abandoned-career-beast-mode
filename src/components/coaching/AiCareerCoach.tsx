
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

// Sample responses for different career question categories
const sampleResponses: Record<string, string[]> = {
  interviews: [
    "Prepare for interviews by researching the company thoroughly and understanding their products, services, and company culture.",
    "Practice the STAR method (Situation, Task, Action, Result) for answering behavioral interview questions effectively.",
    "Prepare 3-5 insightful questions to ask the interviewer that demonstrate your interest in the role and company.",
    "Always follow up with a thank-you email within 24 hours of your interview to express appreciation and reiterate your interest."
  ],
  salary: [
    "Before negotiating, research salary ranges for similar positions in your location using sites like Glassdoor, Payscale, and LinkedIn Salary.",
    "When discussing compensation, consider the total package including benefits, equity, bonuses, and work flexibility, not just the base salary.",
    "Use specific numbers rather than ranges when negotiating. For example, ask for $87,500 rather than $85,000-$90,000.",
    "Highlight your unique value and specific accomplishments when justifying your salary expectations."
  ],
  promotion: [
    "Document your accomplishments and the value you've added to the organization over time. Quantify results whenever possible.",
    "Take on high-visibility projects that demonstrate your leadership capabilities and willingness to grow.",
    "Build relationships with mentors and sponsors in your organization who can advocate for your advancement.",
    "Schedule a meeting with your manager to discuss your career path and express your interest in advancement opportunities."
  ],
  skills: [
    "Focus on developing T-shaped skills: deep expertise in one area combined with broad knowledge across related disciplines.",
    "Identify skill gaps in your current role or desired position, and create a deliberate learning plan to address them.",
    "Seek hands-on projects that allow you to apply new skills in real-world scenarios, reinforcing your learning.",
    "Consider pursuing relevant certifications or micro-credentials that are recognized in your industry."
  ],
  networking: [
    "Quality matters more than quantity in networking. Focus on building meaningful relationships rather than collecting connections.",
    "Follow the 'give first' principle: look for ways to provide value to your network before asking for favors.",
    "Schedule regular networking activities such as attending industry events or setting up coffee chats with colleagues.",
    "Maintain and nurture your network with regular check-ins, even when you don't need anything specific."
  ],
  career_change: [
    "Before making a career change, conduct informational interviews with professionals in your target field to gain realistic insights.",
    "Identify transferable skills from your current role that would be valuable in your desired field.",
    "Consider taking on side projects, volunteering, or freelancing to build experience in your new field while maintaining your current job.",
    "Develop a compelling narrative that explains your career transition in a way that emphasizes the value you bring to the new role."
  ],
  leadership: [
    "Effective leaders focus on developing their emotional intelligence to better understand and motivate their team members.",
    "Practice delegating tasks appropriately, giving team members both responsibility and authority to complete their work.",
    "Establish clear communication channels and provide regular, constructive feedback to team members.",
    "Lead by example and demonstrate the work ethic and values you expect from your team."
  ],
  general: [
    "Consider creating a personal board of directors - a small group of trusted advisors from different backgrounds who can provide diverse perspectives on career decisions.",
    "Regularly reassess your career goals and values to ensure alignment between your work and personal priorities.",
    "Invest time in building your personal brand through thought leadership, public speaking, or content creation in your area of expertise.",
    "Develop a growth mindset that embraces challenges, persists through obstacles, and views failures as opportunities to learn and improve."
  ]
};

// Categories for keyword matching
const categories: Record<string, string[]> = {
  interviews: ["interview", "hiring", "questions", "recruiter", "preparation"],
  salary: ["salary", "compensation", "negotiate", "pay", "raise", "money", "benefits"],
  promotion: ["promotion", "advance", "career path", "growth", "next level", "senior"],
  skills: ["skills", "learn", "training", "develop", "expertise", "knowledge"],
  networking: ["network", "connection", "contact", "relationship", "linkedin"],
  career_change: ["change", "transition", "pivot", "switch", "new field", "different role"],
  leadership: ["leader", "manage", "team", "supervise", "executive", "director"],
  general: ["career", "job", "work", "professional", "advice"]
};

const AiCareerCoach: React.FC = () => {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Categorize question based on keywords
  const categorizeQuestion = (question: string): string => {
    question = question.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => question.includes(keyword))) {
        return category;
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot size={20} className="text-primary" />
          </div>
          <div>
            <CardTitle>AI Career Coach</CardTitle>
            <CardDescription>Ask any career related questions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[340px] p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender === "assistant" && (
                    <Avatar className="h-8 w-8 bg-primary/20">
                      <Bot size={16} className="text-primary" />
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 bg-primary">
                      <User size={16} />
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-primary/20">
                    <Bot size={16} className="text-primary" />
                  </Avatar>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-foreground/70 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-foreground/70 animate-pulse delay-75" />
                      <div className="w-2 h-2 rounded-full bg-foreground/70 animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your career question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" disabled={isTyping || !input.trim()}>
            <Send size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiCareerCoach;
