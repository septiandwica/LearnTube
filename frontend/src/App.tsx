import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Header } from './components/Dashboard/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { GraduationCap, BookOpen, Users, TrendingUp } from 'lucide-react';
import VerifyEmail from "./components/Auth/VerifyEmail"; // Import the VerifyEmail component


const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background Pattern - matching Dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-teal-100 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">LearnTube</h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Organize your learning journey with curated YouTube video playlists. 
              Create roadmaps, track progress, and master new skills efficiently.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Learning</h3>
              <p className="text-gray-600 leading-relaxed">Create organized learning paths with curated video content and track your educational journey</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Monitor your learning progress with detailed analytics and stay motivated throughout your journey</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">Share and discover learning playlists from a community of passionate learners worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="relative z-10 max-w-md mx-auto px-4 pb-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-200">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const isEmailVerificationPage = window.location.pathname.startsWith("/verify/");

  if (isEmailVerificationPage) {
    return <VerifyEmail />; 
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-100 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-lg"></div>
              <p className="text-gray-600 font-medium text-lg">Loading your learning platform...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
