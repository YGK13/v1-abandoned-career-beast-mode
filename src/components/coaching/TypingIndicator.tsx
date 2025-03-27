
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

const TypingIndicator: React.FC = () => {
  return (
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
  );
};

export default TypingIndicator;
