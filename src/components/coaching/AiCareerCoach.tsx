
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Upload, Linkedin, FileText, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useCareerCoach } from "./useCareerCoach";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AiCareerCoach: React.FC = () => {
  const { 
    messages, 
    input, 
    setInput, 
    isTyping, 
    handleSendMessage,
    userDocuments,
    linkedInData
  } = useCareerCoach();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-2 border-primary/20 bg-soft-purple">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-vivid-purple/20 flex items-center justify-center">
            <Bot size={20} className="text-vivid-purple" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <CardTitle className="text-vivid-purple">AI Career Coach</CardTitle>
              <Badge variant="outline" className="ml-2 bg-vivid-purple/10 text-vivid-purple border-vivid-purple/30">
                <Sparkles size={12} className="mr-1" /> Enhanced
              </Badge>
            </div>
            <CardDescription className="text-secondary-purple">
              Personalized guidance based on your career documents and "Be Your Own Commander-in-Chief"
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-vivid-purple/30 hover:bg-light-purple/20">
                    <Upload size={16} className="text-vivid-purple" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload career documents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-vivid-purple/30 hover:bg-light-purple/20">
                    <Linkedin size={16} className="text-vivid-purple" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect LinkedIn profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Connected data indicators */}
        {(userDocuments.length > 0 || linkedInData) && (
          <div className="flex gap-2 mt-2">
            {userDocuments.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs bg-light-purple/20 text-secondary-purple border-secondary-purple/30">
                <FileText size={12} className="text-vivid-purple" />
                <span>{userDocuments.length} Documents Analyzed</span>
              </Badge>
            )}
            {linkedInData && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs bg-light-purple/20 text-secondary-purple border-secondary-purple/30">
                <Linkedin size={12} className="text-vivid-purple" />
                <span>LinkedIn Profile Analyzed</span>
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0 bg-soft-purple/20">
        <ScrollArea className="h-[440px] p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-3 border-t border-primary/10 bg-primary/5">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask detailed career questions for document-specific & personalized advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 focus:border-vivid-purple focus:ring-vivid-purple/30"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            disabled={isTyping || !input.trim()}
            className="bg-vivid-purple hover:bg-secondary-purple"
          >
            <Send size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiCareerCoach;
