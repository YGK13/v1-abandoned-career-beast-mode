
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Upload, Linkedin, FileText } from "lucide-react";
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
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>AI Career Coach</CardTitle>
            <CardDescription>Expert advice based on "Be Your Own Commander-in-Chief"</CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Upload size={16} />
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
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Linkedin size={16} />
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
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <FileText size={12} />
                <span>{userDocuments.length} Documents</span>
              </Badge>
            )}
            {linkedInData && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <Linkedin size={12} />
                <span>LinkedIn Connected</span>
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
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
      <CardFooter className="pt-3 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask detailed career questions or get document-specific advice..."
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

