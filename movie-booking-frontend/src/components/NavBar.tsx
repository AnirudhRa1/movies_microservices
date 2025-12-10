import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Film, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../store';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAppStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-white">MovieBooking</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies..."
                className="w-full px-4 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/movies" className="text-gray-300 hover:text-white transition">
              Movies
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to={`/bookings/user/${currentUser.id}`} 
                  className="text-gray-300 hover:text-white transition"
                >
                  My Bookings
                </Link>
                {currentUser.userType === 'CINEMA_ADMIN' && (
                  <Link to="/admin/movies" className="text-gray-300 hover:text-white transition">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{currentUser.name}</span>
                  <button onClick={handleLogout} className="ml-2 text-primary-500 hover:text-primary-400">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/user/login" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for movies..."
                  className="w-full px-4 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </form>
            
            <div className="flex flex-col space-y-3">
              <Link to="/movies" className="text-gray-300 hover:text-white">
                Movies
              </Link>
              
              {currentUser ? (
                <>
                  <Link to={`/bookings/user/${currentUser.id}`} className="text-gray-300 hover:text-white">
                    My Bookings
                  </Link>
                  {currentUser.userType === 'CINEMA_ADMIN' && (
                    <Link to="/admin/movies" className="text-gray-300 hover:text-white">
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="text-gray-300">
                    <span>{currentUser.name}</span>
                    <button onClick={handleLogout} className="ml-2 text-primary-500">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/user/login" className="btn-primary inline-block text-center">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
