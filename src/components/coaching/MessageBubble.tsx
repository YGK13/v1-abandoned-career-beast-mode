
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAssistant = message.sender === "assistant";
  
  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div className="flex items-start gap-2 max-w-[80%]">
        {isAssistant && (
          <Avatar className="h-8 w-8 bg-primary/20">
            <Bot size={16} className="text-primary" />
          </Avatar>
        )}
        <div
          className={`p-3 rounded-lg ${
            isAssistant
              ? "bg-muted"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        {!isAssistant && (
          <Avatar className="h-8 w-8 bg-primary">
            <User size={16} />
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
