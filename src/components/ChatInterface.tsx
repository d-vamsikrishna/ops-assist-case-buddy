
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage, MessageType } from "@/components/ChatMessage";
import { OSSelector } from "@/components/OSSelector";
import { SimilarCasesDisplay } from "@/components/SimilarCasesDisplay";
import { findKnowledgeBaseMatches, findSimilarCases } from "@/utils/similarity";
import { knowledgeBase, KnowledgeBaseEntry } from "@/data/knowledgeBase";
import { previousCases, PreviousCase } from "@/data/previousCases";

interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

interface WaitingForOS {
  waiting: boolean;
  entry: KnowledgeBaseEntry | null;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [waitingForOS, setWaitingForOS] = useState<WaitingForOS>({ waiting: false, entry: null });
  const [similarCases, setSimilarCases] = useState<PreviousCase[]>([]);
  const [showSimilarCases, setShowSimilarCases] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: "welcome-msg",
      content: "Hello! I'm your Case Buddy. How can I help you resolve your case today?",
      type: "bot" as MessageType,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Handle user sending a new message
  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      type: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Process the message to find a response
    processMessage(content);
  };

  // Process user message and generate response
  const processMessage = (message: string) => {
    // Find similar cases
    const similar = findSimilarCases(message, previousCases, 5);
    setSimilarCases(similar);
    
    // Add typing indicator
    const typingIndicatorId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: typingIndicatorId,
      content: "Thinking...",
      type: "bot",
      timestamp: new Date()
    }]);
    
    // Find knowledge base match
    const kbMatch = findKnowledgeBaseMatches(message, knowledgeBase);
    
    // Short delay to simulate thinking
    setTimeout(() => {
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicatorId));
      
      if (kbMatch && kbMatch.osSpecific && !waitingForOS.waiting) {
        // Need to ask for OS before giving response
        setWaitingForOS({ waiting: true, entry: kbMatch });
        
        // Add system message asking for OS
        const osRequestMessage: Message = {
          id: `system-${Date.now()}`,
          content: "This solution depends on your operating system. Please select your OS below.",
          type: "bot",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, osRequestMessage]);
      } else {
        // Generate and add response message
        const responseContent = generateResponse(message, kbMatch);
        
        const responseMessage: Message = {
          id: `bot-${Date.now()}`,
          content: responseContent,
          type: "bot",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        setShowSimilarCases(true);
      }
    }, 1000);
  };

  // Handle OS selection
  const handleOSSelect = (os: string) => {
    const { entry } = waitingForOS;
    
    if (!entry) return;
    
    // Clear the waiting state
    setWaitingForOS({ waiting: false, entry: null });
    
    // Get OS-specific resolution steps
    let resolutionSteps: string[];
    
    if (os === "windows" && entry.resolutions.windows) {
      resolutionSteps = entry.resolutions.windows;
    } else if (os === "linux" && entry.resolutions.linux) {
      resolutionSteps = entry.resolutions.linux;
    } else if (os === "mac" && entry.resolutions.mac) {
      resolutionSteps = entry.resolutions.mac;
    } else if (entry.resolutions.default) {
      resolutionSteps = entry.resolutions.default;
    } else {
      resolutionSteps = ["No specific resolution steps available for this OS."];
    }
    
    // Generate response with resolution steps
    const responseContent = `Here's how to resolve "${entry.title}" on ${os.charAt(0).toUpperCase() + os.slice(1)}:\n\n${resolutionSteps.join("\n")}`;
    
    // Add bot response
    const responseMessage: Message = {
      id: `bot-${Date.now()}`,
      content: responseContent,
      type: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setShowSimilarCases(true);
  };

  // Handle OS selection cancellation
  const handleOSCancel = () => {
    setWaitingForOS({ waiting: false, entry: null });
    
    // Add message explaining we need OS info
    const cancelMessage: Message = {
      id: `bot-${Date.now()}`,
      content: "I need to know your operating system to provide the correct resolution steps. Please let me know which OS you're using in your next message.",
      type: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, cancelMessage]);
  };

  // Generate response based on user query
  const generateResponse = (query: string, kbMatch: KnowledgeBaseEntry | null): string => {
    if (kbMatch) {
      // If we have a knowledge base match, return its resolution steps
      const resolutionSteps = kbMatch.resolutions.default || [];
      return `Here's how to resolve "${kbMatch.title}":\n\n${resolutionSteps.join("\n")}`;
    } else {
      // Fallback response with generic assistance
      return (
        "I don't have a specific solution for this issue in my knowledge base. " +
        "I've shown some similar cases below that might help. " +
        "If these don't help, please consider escalating or consulting the available documentation.\n\n" +
        "Would you like me to help with another issue?"
      );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl w-full mx-auto">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Similar cases display */}
        <SimilarCasesDisplay 
          similarCases={similarCases} 
          isVisible={showSimilarCases}
        />
        
        {/* Chat messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="py-4 space-y-2">
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                content={message.content}
                type={message.type}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </ScrollArea>
        
        {/* OS selector (conditionally rendered) */}
        {waitingForOS.waiting && (
          <OSSelector 
            onSelect={handleOSSelect} 
            onCancel={handleOSCancel}
          />
        )}
        
        {/* Chat input */}
        <div className="pt-4">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={waitingForOS.waiting}
          />
        </div>
      </div>
    </div>
  );
}
