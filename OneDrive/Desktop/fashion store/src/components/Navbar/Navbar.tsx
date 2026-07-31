import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
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

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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

  const handleUserClick = () => {
    if (user) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-4 shadow-sm border-b border-[#E5E5E5]/60 text-[#111111]'
            : isHomePage
            ? 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6 text-[#FFFFFF]'
            : 'bg-[#FFFFFF] py-5 border-b border-[#E5E5E5] text-[#111111]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] font-sans uppercase font-medium">
            <Link
              to="/"
              className={`hover:opacity-60 transition-opacity ${
                location.pathname === '/' ? 'underline underline-offset-8 decoration-1' : ''
              }`}
            >
              Home
            </Link>
            <a href="/#collection" className="hover:opacity-60 transition-opacity">
              Collection
            </a>
            <a href="/#about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <a href="/#reviews" className="hover:opacity-60 transition-opacity">
              Clientele
            </a>
          </nav>

          {/* Center Brand Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.22em] font-bold text-current">
              LÉONIE
            </span>
            <span className="text-[9px] font-sans tracking-[0.4em] uppercase opacity-80 -mt-1">
              HAUTE COUTURE
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-6">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Login/Account */}
            <div className="relative group">
              <button
                type="button"
                onClick={handleUserClick}
                className="p-1 hover:opacity-60 transition-opacity flex items-center gap-2 cursor-pointer"
                title={user ? `Signed in as ${user.name} (Click to Sign Out)` : 'Sign In'}
              >
                <User className="w-5 h-5" />
                {user && (
                  <span className="hidden lg:inline text-[11px] font-sans tracking-wider uppercase opacity-80">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Icon with Counter */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity relative cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#EADBC8] text-[#111111] text-[10px] font-bold font-sans w-5 h-5 rounded-full flex items-center justify-center border border-[#111111]">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1 hover:opacity-60 transition-opacity"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#111111] text-[#FFFFFF] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-[#333333]">
                  <span className="font-serif text-xl tracking-[0.2em] text-[#EADBC8]">
                    LÉONIE LUXE
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#FFFFFF] hover:text-[#EADBC8]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 mt-10 text-sm font-sans uppercase tracking-[0.2em]">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#EADBC8] transition-colors"
                  >
                    Home
                  </Link>
                  <a
                    href="/#collection"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#EADBC8] transition-colors"
                  >
                    Featured Collection
                  </a>
                  <a
                    href="/#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#EADBC8] transition-colors"
                  >
                    About Haute Couture
                  </a>
                  <a
                    href="/#reviews"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#EADBC8] transition-colors"
                  >
                    Client Testimonials
                  </a>
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#EADBC8] transition-colors flex items-center justify-between"
                  >
                    <span>Cart</span>
                    <span className="bg-[#EADBC8] text-[#111111] text-xs px-2 py-0.5 font-bold">
                      {totalCount}
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="pt-8 border-t border-[#333333]">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#999999]">Signed in as</p>
                      <p className="text-sm font-medium text-[#EADBC8]">{user.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="text-xs uppercase tracking-wider text-[#FFFFFF] underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-[#EADBC8] text-[#111111] py-3 text-xs uppercase tracking-widest font-semibold"
                  >
                    Client Login
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-6"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="w-full max-w-2xl bg-[#FFFFFF] p-8 relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute top-4 right-4 text-[#111111] hover:opacity-60"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl text-[#111111] mb-6">Search The Collection</h3>

              <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b-2 border-[#111111]">
                <input
                  type="text"
                  placeholder="Search by category, dress name, or fabric..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 bg-transparent text-[#111111] font-sans placeholder-[#999999] focus:outline-none text-base"
                  autoFocus
                />
                <button type="submit" className="p-2 text-[#111111] hover:opacity-70">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-sans text-[#777777]">
                <span className="uppercase tracking-widest">Popular:</span>
                {['Silk Satin', 'Evening Gown', 'Mini Dress', 'Floral', 'Velvet'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/?search=${encodeURIComponent(term)}#collection`);
                      setSearchOpen(false);
                    }}
                    className="bg-[#F8F8F8] text-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#FFFFFF] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
