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

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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

  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[64px] flex items-center transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent text-[#FFFFFF]'
            : 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#EAEAEA] text-[#000000] shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl tracking-[0.2em] font-bold text-current">
              LÉONIE
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-wide">
            <a
              href="/#collection"
              className="relative py-1 hover:opacity-60 transition-opacity"
            >
              New Arrivals
            </a>
            <a
              href="/#collection"
              className="relative py-1 hover:opacity-60 transition-opacity"
            >
              Collection
            </a>
            <a
              href="/#about"
              className="relative py-1 hover:opacity-60 transition-opacity"
            >
              About
            </a>
          </nav>

          {/* Right: Search, Cart, Profile */}
          <div className="flex items-center gap-6">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity relative cursor-pointer flex items-center gap-1.5"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalCount > 0 && (
                <span
                  className={`text-xs font-sans font-semibold px-1.5 py-0.2 rounded-full ${
                    isTransparent ? 'bg-[#FFFFFF] text-[#000000]' : 'bg-[#000000] text-[#FFFFFF]'
                  }`}
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              type="button"
              onClick={() => (user ? logout() : navigate('/login'))}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden sm:flex items-center gap-2"
              title={user ? `Signed in as ${user.name} (Click to Sign Out)` : 'Sign In'}
            >
              <User className="w-5 h-5 stroke-[1.75]" />
              {user && (
                <span className="text-xs font-sans font-medium tracking-wide">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1 hover:opacity-60 transition-opacity"
              aria-label="Open Mobile Navigation"
            >
              <Menu className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#FFFFFF] text-[#000000] p-8 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EAEAEA]">
                  <span className="font-serif text-xl tracking-[0.2em] font-bold">
                    LÉONIE
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#000000] hover:opacity-60"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 mt-8 text-base font-medium font-sans">
                  <a
                    href="/#collection"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:opacity-60 transition-opacity"
                  >
                    New Arrivals
                  </a>
                  <a
                    href="/#collection"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:opacity-60 transition-opacity"
                  >
                    Collection
                  </a>
                  <a
                    href="/#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:opacity-60 transition-opacity"
                  >
                    About
                  </a>
                  <Link
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:opacity-60 transition-opacity flex items-center justify-between"
                  >
                    <span>Shopping Bag</span>
                    <span className="bg-[#000000] text-[#FFFFFF] text-xs px-2 py-0.5 font-bold">
                      {totalCount}
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-[#EAEAEA]">
                {user ? (
                  <div className="flex items-center justify-between text-xs font-sans">
                    <div>
                      <p className="text-[#888888]">Signed in as</p>
                      <p className="font-semibold text-[#000000]">{user.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="underline text-[#000000]"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-[#000000] text-[#FFFFFF] py-3 text-xs uppercase tracking-widest font-semibold"
                  >
                    Client Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Popover Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-6"
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
                <X className="w-5 h-5" />
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
