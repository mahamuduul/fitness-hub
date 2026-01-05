import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FaHeartbeat, FaDumbbell, FaUserMd, FaAppleAlt, FaBrain, FaCalculator, FaInfoCircle, FaEnvelope, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaUserShield, FaBars, FaTimes, FaUser, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const { auth, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully!', 'success');
    navigate('/');
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Get short name (first name or first 2 letters)
  const getShortName = (fullName) => {
    if (!fullName) return 'User';
    const firstName = fullName.split(' ')[0];
    return firstName.length > 10 ? firstName.substring(0, 10) + '...' : firstName;
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="px-[100px]">
        <nav className="flex items-center justify-between gap-2 py-4">
          <Link to="/" className="flex items-center gap-3 font-black text-xl text-white hover:text-gray-300 transition-colors">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FaHeartbeat className="text-2xl text-gray-900" />
            </div>
            <span className="hidden sm:inline">Health & Fitness Hub</span>
            <span className="sm:hidden">HFH</span>
          </Link>
          
          <button 
            className="md:hidden inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            <span className="font-semibold">{isMenuOpen ? 'Close' : 'Menu'}</span>
          </button>

          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-1 list-none flex-col md:flex-row w-full md:w-auto mt-2 md:mt-0 bg-gray-900 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none absolute md:relative top-16 md:top-0 left-0 right-0 mx-4 md:mx-0 border border-gray-700 md:border-0`}>
            <li><Link to="/gym" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaDumbbell />Gyms</Link></li>
            <li><Link to="/medical" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaUserMd />Medical</Link></li>
            <li><Link to="/nutrition" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaAppleAlt />Nutrition</Link></li>
            <li><Link to="/mind" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaBrain />Mind</Link></li>
            
            {!auth ? (
              <>
                <li><Link to="/diet" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaCalculator />Diet</Link></li>
                <li><Link to="/about" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaInfoCircle />About</Link></li>
                <li><Link to="/contact" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"><FaEnvelope />Contact</Link></li>
                <li>
                  <Link to="/register" className="flex items-center gap-2 px-3 py-2 rounded-lg no-underline text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium" title="Register">
                    <FaUserPlus className="text-xl" />
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg no-underline bg-white text-gray-900 hover:bg-gray-100 transition-colors font-bold shadow-lg" title="Login">
                    <FaSignInAlt className="text-xl" />
                  </Link>
                </li>
              </>
            ) : (
              <li className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors font-medium"
                >
                  {auth.photoURL ? (
                    <img src={auth.photoURL} alt={auth.displayName} className="w-8 h-8 rounded-full border-2 border-gray-600" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-600 text-white text-xs font-bold">
                      {getInitials(auth.displayName)}
                    </div>
                  )}
                  <span className="hidden lg:inline">{getShortName(auth.displayName)}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 bg-gray-900 border-b border-gray-700">
                      <p className="text-white font-bold text-sm">{auth.displayName}</p>
                      <p className="text-gray-400 text-xs truncate">{auth.email}</p>
                      {auth.isAdmin && (
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          Administrator
                        </span>
                      )}
                    </div>
                    <ul className="py-2">
                      <li><Link to="/diet" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors no-underline"><FaCalculator />Diet Calculator</Link></li>
                      <li><Link to="/about" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors no-underline"><FaInfoCircle />About Us</Link></li>
                      <li><Link to="/contact" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors no-underline"><FaEnvelope />Contact</Link></li>
                      {auth.isAdmin && (
                        <li><Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors no-underline"><FaUserShield />Admin Panel</Link></li>
                      )}
                      <li className="border-t border-gray-700 mt-2 pt-2">
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors w-full text-left"
                        >
                          <FaSignOutAlt />Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
