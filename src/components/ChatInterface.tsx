import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage, MessageType } from "@/components/ChatMessage";
import { OSSelector } from "@/components/OSSelector";
import { SimilarCasesDisplay } from "@/components/SimilarCasesDisplay";
import { findKnowledgeBaseMatches, findSimilarCases } from "@/utils/similarity";
import { knowledgeBase, KnowledgeBaseEntry } from "@/data/knowledgeBase";
import { previousCases, PreviousCase } from "@/data/previousCases";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showFollowUpQuestions, setShowFollowUpQuestions] = useState(false);
  const [currentKBEntry, setCurrentKBEntry] = useState<KnowledgeBaseEntry | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage = {
      id: "welcome-msg",
      content: "Hello! I'm your Case Buddy. How can I help you resolve your case today?",
      type: "bot" as MessageType,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      type: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    processMessage(content);
  };

  const handleFollowUpQuestion = (question: string) => {
    if (currentKBEntry?.followUpQuestions?.answers[question]) {
      const answer = currentKBEntry.followUpQuestions.answers[question];
      
      const responseMessage: Message = {
        id: `bot-${Date.now()}`,
        content: answer.join('\n'),
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setShowFollowUpQuestions(false);
    }
  };

  const processMessage = (message: string) => {
    const similar = findSimilarCases(message, previousCases, 5);
    setSimilarCases(similar);
    
    const typingIndicatorId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: typingIndicatorId,
      content: "Thinking...",
      type: "bot",
      timestamp: new Date()
    }]);
    
    const kbMatch = findKnowledgeBaseMatches(message, knowledgeBase);
    setCurrentKBEntry(kbMatch);
    
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicatorId));
      
      if (kbMatch) {
        const generalApproachMessage: Message = {
          id: `bot-general-${Date.now()}`,
          content: kbMatch.generalApproach.join('\n'),
          type: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, generalApproachMessage]);
        
        if (kbMatch.osSpecific) {
          setWaitingForOS({ waiting: true, entry: kbMatch });
          
          const osRequestMessage: Message = {
            id: `system-${Date.now()}`,
            content: "Please select your operating system to get specific resolution steps:",
            type: 'bot',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, osRequestMessage]);
        }
      } else {
        const responseContent = (
          "I don't have a specific solution for this issue in my knowledge base. " +
          "I've shown some similar cases below that might help. " +
          "If these don't help, please consider escalating or consulting the available documentation.\n\n" +
          "Would you like me to help with another issue?"
        );
        
        const responseMessage: Message = {
          id: `bot-${Date.now()}`,
          content: responseContent,
          type: "bot",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        setShowSimilarCases(true);
      }
      
      setShowSimilarCases(true);
    }, 1000);
  };

  const handleOSSelect = (os: string) => {
    const { entry } = waitingForOS;
    
    if (!entry) return;
    
    setWaitingForOS({ waiting: false, entry: null });
    
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
    
    const responseContent = `Here are the specific steps for ${os}:\n\n${resolutionSteps.join('\n')}`;
    
    const responseMessage: Message = {
      id: `bot-${Date.now()}`,
      content: responseContent,
      type: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, responseMessage]);
    
    if (entry.id === 'kb-001' && entry.followUpQuestions) {
      setShowFollowUpQuestions(true);
      
      const followUpMessage: Message = {
        id: `bot-followup-${Date.now()}`,
        content: "Would you like to know more about:\n\n" + 
                entry.followUpQuestions.questions.map(q => `- ${q}`).join('\n'),
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, followUpMessage]);
    }
    
    setShowSimilarCases(true);
  };

  const handleOSCancel = () => {
    setWaitingForOS({ waiting: false, entry: null });
    
    const cancelMessage: Message = {
      id: `bot-${Date.now()}`,
      content: "I need to know your operating system to provide the correct resolution steps. Please let me know which OS you're using in your next message.",
      type: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, cancelMessage]);
  };

  const generateResponse = (query: string, kbMatch: KnowledgeBaseEntry | null): string => {
    if (kbMatch) {
      const resolutionSteps = kbMatch.resolutions.default || [];
      return `Here's how to resolve "${kbMatch.title}":\n\n${resolutionSteps.join("\n")}`;
    } else {
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
        <AnimatePresence>
          <SimilarCasesDisplay 
            similarCases={similarCases} 
            isVisible={showSimilarCases}
          />
        </AnimatePresence>
        
        <ScrollArea className="flex-1 pr-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-4 space-y-3"
          >
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatMessage
                  content={message.content}
                  type={message.type}
                  timestamp={message.timestamp}
                />
              </motion.div>
            ))}
            
            {showFollowUpQuestions && currentKBEntry?.followUpQuestions && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 mt-4"
              >
                {currentKBEntry.followUpQuestions.questions.map(question => (
                  <button
                    key={question}
                    onClick={() => handleFollowUpQuestion(question)}
                    className="text-left px-4 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors border border-secondary/20 text-secondary-foreground"
                  >
                    {question}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </ScrollArea>
        
        {waitingForOS.waiting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OSSelector 
              onSelect={handleOSSelect} 
              onCancel={handleOSCancel}
            />
          </motion.div>
        )}
        
        <div className="pt-4 border-t border-border/50">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={waitingForOS.waiting}
          />
        </div>
      </div>
    </div>
  );
}
