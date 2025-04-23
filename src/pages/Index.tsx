
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">OpsAssist: Case Buddy</h1>
            <p className="text-muted-foreground">
              Infrastructure & Cloud Services Support
            </p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-6">
        <ChatInterface />
      </main>
      
      <footer className="border-t py-4">
        <div className="container">
          <div className="text-sm text-muted-foreground text-center">
            Built for Keyloop Infrastructure & Cloud Services Team
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
