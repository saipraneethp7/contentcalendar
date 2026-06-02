import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-dark-600 bg-dark-800/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">✍️</span>
          <span className="text-white font-bold text-lg tracking-tight">Craftly</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
              Dashboard
            </Link>
            <Link to="/calendar" className="text-gray-400 hover:text-white transition-colors text-sm">
              Calendar
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary text-xs font-semibold">
                  {user.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-300 text-sm">{user.full_name.split(' ')[0]}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white border border-dark-600 hover:border-gray-500 px-4 py-2 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;