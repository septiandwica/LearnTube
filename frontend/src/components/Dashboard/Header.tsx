import React, { useState, useEffect } from 'react';
import { LogOut, User, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Ambil data user dari localStorage setelah refresh
  const [storedUser, setStoredUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setStoredUser(JSON.parse(savedUser));
    }
  }, []);
  
  const currentUser = storedUser || user;

  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100/30 rounded-full blur-xl"></div>
        <div className="absolute -top-2 right-10 w-16 h-16 bg-purple-100/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 left-1/3 w-20 h-20 bg-teal-100/30 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                LearnTube
              </h1>
              <div className="hidden sm:block w-full h-0.5 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-gray-800">
                  {currentUser?.name || 'User'}
                </span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </header>
  );
};
