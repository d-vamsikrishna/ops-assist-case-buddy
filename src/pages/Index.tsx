
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <header className="border-b border-zinc-800 py-4">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <span className="text-indigo-400 font-bold text-lg">OA</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                OpsAssist: Case Buddy
              </h1>
            </div>
            <p className="text-zinc-400 text-sm hidden md:block">
              Infrastructure & Cloud Services Support
            </p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl mx-auto py-6 px-4">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="border-t border-zinc-800 py-4">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-sm text-zinc-500 text-center">
            Built for Keyloop Infrastructure & Cloud Services Team
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
