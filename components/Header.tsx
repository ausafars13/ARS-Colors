
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              ARS<span className="text-indigo-600">Color</span>Match
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">ARS Standards</a>
            <a href="#inquiry" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors font-semibold">Contact Expert</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
