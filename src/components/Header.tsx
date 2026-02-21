import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-primary">
          N-Squre<span className="text-text-primary"> Engineering</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-text-secondary'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-black/10">
              <div className="flex items-center gap-2 text-primary font-bold">
                <User size={18} />
                <span className="text-sm">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary py-2 px-6 text-sm">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-text-secondary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-b border-black/5 py-4 px-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'font-medium py-2 transition-colors',
                  isActive ? 'text-primary' : 'text-text-secondary'
                )
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-black/5">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <User size={18} />
                  <span>{user.name}</span>
                </div>
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="flex items-center gap-2 text-red-500 font-bold"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
