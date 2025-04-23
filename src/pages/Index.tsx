
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b border-border/50 py-4 backdrop-blur-sm shadow-sm">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">OA</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">OpsAssist: Case Buddy</h1>
            </div>
            <p className="text-muted-foreground text-sm hidden md:block">
              Infrastructure & Cloud Services Support
            </p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl mx-auto py-6 px-4">
        <div className="bg-background/80 backdrop-blur-lg border border-border/50 rounded-2xl shadow-xl overflow-hidden">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="border-t border-border/50 py-4 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto">
          <div className="text-sm text-muted-foreground text-center">
            Built for Keyloop Infrastructure & Cloud Services Team
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
