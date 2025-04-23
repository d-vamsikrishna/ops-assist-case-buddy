
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
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  return (
    <div className={cn(
      "flex items-start gap-3 py-4 px-4",
      type === "user" && "justify-end",
      type === "system" && "justify-center"
    )}>
      {type === "bot" && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/assistant.png" alt="Assistant" />
          <AvatarFallback className="bg-indigo-500/20 text-indigo-400">CB</AvatarFallback>
        </Avatar>
      )}

      <div className={cn(
        "group flex flex-col max-w-[80%] lg:max-w-[70%]",
        type === "user" && "items-end"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-lg transition-colors",
          type === "bot" && "bg-zinc-800/50 text-zinc-100",
          type === "user" && "bg-indigo-500/20 text-indigo-100",
          type === "system" && "bg-zinc-800/30 text-zinc-300 text-sm"
        )}>
          {content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        <span className="text-xs text-zinc-500 mt-1 px-1">
          {formattedTime}
        </span>
      </div>
      
      {type === "user" && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-zinc-700/50 text-zinc-300">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
