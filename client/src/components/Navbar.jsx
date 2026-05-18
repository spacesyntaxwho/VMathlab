import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, FunctionSquare, LayoutDashboard, BrainCircuit, Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Learn', path: '/learn', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Solve', path: '/solver', icon: <FunctionSquare className="w-4 h-4" /> },
    { name: 'Examples', path: '/examples', icon: <Activity className="w-4 h-4" /> },
    { name: 'Visualize', path: '/visualize', icon: <BrainCircuit className="w-4 h-4" /> },
    { name: 'Quiz', path: '/quiz', icon: <BrainCircuit className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300">
                <span className="text-white font-bold text-lg font-serif italic">∫∫</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">
                VMathLab
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group"
                  >
                    <span className={`flex items-center space-x-1.5 z-10 relative ${isActive ? 'text-cyan-400' : 'text-slate-300 group-hover:text-white'}`}>
                      {link.icon}
                      <span>{link.name}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 rounded-md z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-slate-900/95 border-b border-white/10"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => {
             const isActive = location.pathname === link.path;
             return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                  isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
             )
          })}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
