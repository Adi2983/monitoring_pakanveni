
import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const logoUrl = "https://drive.google.com/uc?id=1MBxX9s1OtNvcIGVwAjvCGTcJCSjajPvM";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img 
              src={logoUrl} 
              alt="Logo FeedCheck Pro" 
              className="h-10 w-10 object-contain rounded-full shadow-sm ring-1 ring-gray-100 dark:ring-gray-700"
              onError={(e) => {
                // Fallback jika link bermasalah
                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=CP&background=16a34a&color=fff';
              }}
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-700 to-green-500 bg-clip-text text-transparent">
            CekPakan Kasongan
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <i className={`fas ${darkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-500'} text-lg`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
