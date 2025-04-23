
import React from "react";
import SimilarCasesCarousel from "@/components/SimilarCasesCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Legal Case Analyzer</h1>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Introduction section */}
          <div className="bg-white px-6 py-10 shadow-md rounded-lg mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to Legal Case Analysis</h2>
              <p className="text-xl text-gray-600 mb-6">
                Explore legal precedents and similar cases to strengthen your arguments
              </p>
              <div className="flex justify-center">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Start New Analysis
                </button>
              </div>
            </div>
          </div>
          
          {/* Similar Cases Carousel */}
          <SimilarCasesCarousel />
        </div>
      </main>
      
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2025 Legal Case Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
