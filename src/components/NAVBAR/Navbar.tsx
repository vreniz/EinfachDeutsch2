import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../../Context/UserContext';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    toast.success('Successfully signed out. See you soon!');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img 
                src="https://flagcdn.com/w320/de.png" 
                alt="German flag" 
                className="w-8 h-6 rounded object-cover shadow-sm"
              />
            </div>
            <div className="text-xl font-semibold">
              <span className="text-blue-600">EINFACH</span>
              <span className="text-red-500">DEUTSCH</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/home" 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/practice" 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Practice
            </Link>
            <Link 
              to="/progress" 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              Progress
            </Link>
            
            {/* User Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {user?.first_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span>{user?.first_name || 'User'}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </button>

                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            <Link 
              to="/home" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/practice" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Practice
            </Link>
            <Link 
              to="/progress" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Progress
            </Link>
            
            <hr className="my-2 border-gray-100" />
            
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {user?.first_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="font-medium text-gray-900">{user?.first_name || 'User'}</span>
              </div>
              
              <div className="space-y-1 ml-2">
                <button
                  onClick={() => { setMenuOpen(false); navigate('/profile'); }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  Profile
                </button>

                <button
                  onClick={() => { setMenuOpen(false); handleSignOut(); }}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
