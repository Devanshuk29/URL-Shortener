import React from 'react';
import { Moon, Sun, User } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, onLoginClick }) => {
  return (
    <nav className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-blue-500">Shortly</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm">
            {darkMode ? 'Light' : 'Dark'}
          </span>
        </button>
        
        <button
          onClick={onLoginClick}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
        >
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;