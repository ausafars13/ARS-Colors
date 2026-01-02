
import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ColorPalette from './components/ColorPalette';
import InquiryForm from './components/InquiryForm';
import { analyzeProductImage } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const handleImageSelected = async (base64: string, mimeType: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedCodes([]);
    try {
      const result = await analyzeProductImage(base64, mimeType);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setSelectedCodes([]);
  };

  const toggleColorSelection = (code: string) => {
    setSelectedCodes(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code) 
        : [...prev, code]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-indigo-100">
            Professional Color Matching
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
            Textile Color <span className="text-indigo-600">Precision</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed">
            Extract exact ARS codes from any image and match them across our entire 7-range catalog for high-end carpets and interiors.
          </p>
        </div>

        <section className="space-y-16">
          <div className="relative">
            {analysis && !isLoading && (
              <div className="flex justify-center mb-6">
                <button 
                  onClick={handleReset}
                  className="flex items-center space-x-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full transition-all border border-indigo-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New Color Analysis</span>
                </button>
              </div>
            )}
            <ImageUploader 
              onImageSelected={handleImageSelected} 
              onClear={handleReset}
              isLoading={isLoading} 
            />
          </div>
          
          {error && (
            <div className="max-w-md mx-auto bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl text-sm text-center shadow-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {analysis && (
            <ColorPalette 
              result={analysis} 
              onSelectColor={toggleColorSelection}
              selectedCodes={selectedCodes}
            />
          )}

          <InquiryForm 
            selectedColors={selectedCodes} 
            suggestedProduct={analysis?.primaryRecommendedProduct}
          />
        </section>

        <section className="mt-40 border-t border-gray-100 pt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Product Ranges</h2>
            <p className="text-gray-500 mt-4">Precision manufacturing across wool and viscose textiles.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "ARS 320 Viscose", type: "Silk-like sheen" },
              { name: "ARS 600S Wool", type: "Standard durability" },
              { name: "ARS 600R Wool", type: "Enhanced Resilience" },
              { name: "ARS 700 Viscose", type: "Premium lustre" },
              { name: "ARS 1000 Viscose", type: "High density Viscose" },
              { name: "ARS 1200 Wool", type: "Luxury Commercial" },
              { name: "ARS 1400 Wool", type: "Ultra-Premium heavy" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-all">
                <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-400 mt-1">{item.type}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-40 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-xs font-bold text-white">ARS</div>
            <span className="text-xl font-bold text-gray-900">Color Match Pro</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            The industry standard for matching textile color codes in interior design and luxury carpet manufacturing.
          </p>
          <div className="mt-10 flex justify-center space-x-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Global Offices</a>
          </div>
          <p className="mt-10 text-[10px] text-gray-300">© 2025 A. Ross & Sons Textile Group. All ARS color standards are property of ARS.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
