import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}#collection`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#EAEAEA] ${
          scrolled ? 'py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] tracking-[0.3em] font-sans uppercase font-medium text-[#000000]">
            <Link to="/" className="hover:opacity-50 transition-opacity">
              Collection
            </Link>
            <a href="/#about" className="hover:opacity-50 transition-opacity">
              Atelier
            </a>
            <a href="/#reviews" className="hover:opacity-50 transition-opacity">
              Editorial
            </a>
          </nav>

          {/* Center Brand Mark */}
          <Link to="/" className="flex flex-col items-center">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-bold text-[#000000]">
              LÉONIE
            </span>
            <span className="text-[8px] font-sans tracking-[0.4em] uppercase text-[#888888] -mt-1">
              PARIS
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-7 text-[#000000]">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hover:opacity-50 transition-opacity cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={() => (user ? logout() : navigate('/login'))}
              className="hover:opacity-50 transition-opacity hidden sm:flex items-center gap-1.5 cursor-pointer"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <User className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hover:opacity-50 transition-opacity relative cursor-pointer flex items-center gap-1.5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span className="text-[10px] font-sans tracking-widest font-semibold">
                ({totalCount})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden hover:opacity-50 transition-opacity"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Popover Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-28 px-6"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-xl bg-[#FFFFFF] p-8 border border-[#EAEAEA] relative"
            >
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute top-4 right-4 text-[#000000] hover:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-xl text-[#000000] mb-4 font-normal">
                Search Lookbook
              </h3>

              <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-[#000000]">
                <input
                  type="text"
                  placeholder="Silk, Maxi, Velvet, Evening..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 bg-transparent text-sm font-sans text-[#000000] placeholder-[#999999] focus:outline-none"
                  autoFocus
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
