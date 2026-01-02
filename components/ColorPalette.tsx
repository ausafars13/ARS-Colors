
import React from 'react';
import { AnalysisResult, ColorDetail } from '../types';

interface ColorPaletteProps {
  result: AnalysisResult | null;
  onSelectColor: (code: string) => void;
  selectedCodes: string[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ result, onSelectColor, selectedCodes }) => {
  if (!result) return null;

  return (
    <div className="mt-12 animate-fade-in">
      <div className="mb-8 text-center bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 px-4 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
          Multi-Range Match
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Custom Palette Analysis</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <div className="px-5 py-3 bg-gray-50 rounded-xl border border-gray-100 text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Detected Product</p>
            <p className="font-semibold text-gray-700 leading-none">{result.productType}</p>
          </div>
          <div className="px-5 py-3 bg-indigo-50 rounded-xl border border-indigo-100 text-left">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Primary Material Match</p>
            <p className="font-bold text-indigo-700 leading-none">{result.primaryRecommendedProduct}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-6">
          <p className="text-gray-500 text-sm leading-relaxed italic">
            "{result.summary}"
          </p>
          <p className="mt-4 text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
            Note: Names are descriptive; please refer to <span className="text-indigo-600 font-black">ARS Codes</span> for manufacturing precision.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.colors.map((color, idx) => (
          <div 
            key={idx}
            className={`bg-white rounded-xl shadow-sm border p-4 transition-all duration-300 hover:shadow-md cursor-pointer group relative ${
              selectedCodes.includes(color.arsCode) ? 'ring-2 ring-indigo-500 border-transparent bg-indigo-50/10' : 'border-gray-100'
            }`}
            onClick={() => onSelectColor(color.arsCode)}
          >
            <div className="flex items-start space-x-4">
              <div 
                className="w-24 h-24 rounded-lg shadow-inner shrink-0 ring-1 ring-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {color.percentage}%
                  </span>
                </div>
                <div className="mt-1">
                  <h3 className="text-base font-bold text-gray-900 leading-tight mb-1">{color.name}</h3>
                  <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight">{color.arsProduct}</p>
                  <p className="text-xl font-mono font-black text-gray-900 leading-none mt-0.5">{color.arsCode}</p>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-bold tracking-widest uppercase">{color.hex}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 leading-tight italic line-clamp-2 border-t border-gray-50 pt-3">
              {color.description}
            </p>
            
            <div className="mt-4 flex items-center text-xs font-bold text-indigo-600">
              {selectedCodes.includes(color.arsCode) ? (
                <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-lg w-full">
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Selected for Inquiry
                </span>
              ) : (
                <span className="flex items-center group-hover:translate-x-1 transition-transform px-3 py-1 border border-indigo-100 rounded-lg w-full justify-center">
                  Add to Palette
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
