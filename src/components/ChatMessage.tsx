
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type MessageType = "user" | "bot" | "system";

interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
}

export function ChatMessage({ content, type, timestamp }: ChatMessageProps) {
  // Format the timestamp to HH:MM
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  return (
    <div className={cn(
      "flex items-start gap-3 py-4",
      type === "user" && "justify-end",
      type === "system" && "justify-center"
    )}>
      {/* Show avatar only for bot messages */}
      {type === "bot" && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/assistant.png" alt="Assistant" />
          <AvatarFallback className="bg-primary text-white">CB</AvatarFallback>
        </Avatar>
      )}

      <div className={cn(
        "group flex flex-col",
        type === "user" && "items-end"
      )}>
        {/* Message content */}
        <div className={cn(
          "rounded-lg px-4 py-3 max-w-[85%]",
          type === "bot" && "bg-muted text-left",
          type === "user" && "bg-primary text-primary-foreground",
          type === "system" && "bg-secondary text-secondary-foreground text-sm"
        )}>
          {content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1">
          {formattedTime}
        </span>
      </div>
      
      {/* Show avatar only for user messages */}
      {type === "user" && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
