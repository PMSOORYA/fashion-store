import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LOGIN_IMAGE } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, continueAsGuest } = useAuth();

  const [email, setEmail] = useState('patron@leonie-luxe.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  const handleGuestClick = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FFFFFF]">
      {/* Left Column - High Fashion Editorial Campaign Photo */}
      <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-[#000000] overflow-hidden flex flex-col justify-between p-8 md:p-16 text-[#FFFFFF]">
        <img
          src={LOGIN_IMAGE}
          alt="Editorial Fashion Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Top Logo */}
        <div className="relative z-10">
          <span className="font-serif text-2xl md:text-3xl tracking-[0.3em] font-bold text-[#FFFFFF]">
            LÉONIE
          </span>
          <span className="block text-[9px] font-sans tracking-[0.4em] uppercase text-[#CCCCCC] mt-0.5">
            HAUTE COUTURE • PARIS
          </span>
        </div>

        {/* Campaign Editorial Title */}
        <div className="relative z-10 max-w-md my-auto md:my-0">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#EADBC8] block mb-3">
            Collection 2026
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-normal leading-[1.15] mb-4 text-[#FFFFFF]">
            Elegance is not standing out, but being remembered.
          </h1>
          <p className="text-xs font-sans text-[#DDDDDD] font-light leading-relaxed">
            Ten masterfully draped creations crafted from pure Grade 6A Mulberry silk and Italian velvet.
          </p>
        </div>

        <div className="relative z-10 hidden md:block text-[10px] font-sans text-[#999999] tracking-[0.25em] uppercase">
          © {new Date().getFullYear()} LÉONIE PARIS
        </div>
      </div>

      {/* Right Column - Understated Minimalist Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 bg-[#FFFFFF]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-10 text-left">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#888888] font-medium block mb-2">
              Private Access
            </span>
            <h2 className="font-serif text-3xl text-[#000000] font-normal mb-2">
              Sign In
            </h2>
            <p className="text-xs text-[#666666] font-sans font-light">
              Enter your client credentials or continue as guest.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#000000] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#EAEAEA] text-xs font-sans text-[#000000] focus:bg-[#FFFFFF] focus:border-[#000000] focus:outline-none transition-colors"
                placeholder="client@leonie-luxe.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#000000] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-[#F9F8F6] border border-[#EAEAEA] text-xs font-sans text-[#000000] focus:bg-[#FFFFFF] focus:border-[#000000] focus:outline-none transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans">
              <label className="flex items-center gap-2 cursor-pointer text-[#666666]">
                <input type="checkbox" defaultChecked className="accent-[#000000] w-3.5 h-3.5" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-[#000000] underline hover:opacity-50">
                Forgot Password?
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <Button fullWidth type="submit" size="lg">
                Enter Storefront
              </Button>
              <Button
                fullWidth
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGuestClick}
              >
                Continue as Guest
              </Button>
            </div>

            <div className="pt-8 text-center border-t border-[#EAEAEA]">
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#888888]">
                Demo Mode — Authentication Disabled
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
