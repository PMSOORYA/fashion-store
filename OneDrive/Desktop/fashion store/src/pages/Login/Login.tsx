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
    sessionStorage.setItem('leonie_demo_entered', 'true');
    login(email);
    navigate('/');
  };

  const handleGuestClick = () => {
    sessionStorage.setItem('leonie_demo_entered', 'true');
    continueAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FFFFFF]">
      {/* Left Column - High Fashion Editorial Campaign Photo */}
      <div className="relative w-full md:w-1/2 min-h-[45vh] md:min-h-screen bg-[#000000] overflow-hidden flex flex-col justify-between p-8 md:p-16 text-[#FFFFFF]">
        <img
          src={LOGIN_IMAGE}
          alt="Editorial Fashion Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Top Logo */}
        <div className="relative z-10">
          <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-bold text-[#FFFFFF]">
            LÉONIE
          </span>
          <span className="block text-[9px] font-sans tracking-[0.4em] uppercase text-[#CCCCCC] mt-0.5">
            HAUTE COUTURE • PARIS
          </span>
        </div>

        {/* Campaign Editorial Title */}
        <div className="relative z-10 max-w-md my-auto md:my-0">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#EADBC8] block mb-3 font-medium">
            Collection 2026
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-normal leading-[1.12] mb-3 text-[#FFFFFF]">
            Discover Timeless Fashion
          </h1>
          <p className="text-xs font-sans text-[#DDDDDD] font-light leading-relaxed tracking-wide">
            Sign in to explore our latest collection of ten masterfully draped silk creations.
          </p>
        </div>

        {/* Minimal Footer Tag */}
        <div className="relative z-10 hidden md:block text-[10px] font-sans text-[#999999] tracking-[0.25em] uppercase">
          © {new Date().getFullYear()} LÉONIE LUXE PARIS
        </div>
      </div>

      {/* Right Column - Centered Minimal Login Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-[#FFFFFF]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-8 md:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
        >
          <div className="mb-8 text-left">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#888888] font-medium block mb-2">
              Welcome
            </span>
            <h2 className="font-serif text-3xl text-[#000000] font-normal mb-2">
              Sign In
            </h2>
            <p className="text-xs text-[#666666] font-sans font-light">
              Enter your credentials to enter the boutique storefront.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#000000] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-[#EAEAEA] rounded-md text-xs font-sans text-[#000000] focus:bg-[#FFFFFF] focus:border-[#000000] focus:outline-none transition-colors"
                placeholder="patron@leonie-luxe.com"
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
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-[#EAEAEA] rounded-md text-xs font-sans text-[#000000] focus:bg-[#FFFFFF] focus:border-[#000000] focus:outline-none transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#666666]">
                <input type="checkbox" defaultChecked className="accent-[#000000] w-3.5 h-3.5" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-[#000000] underline hover:opacity-60">
                Forgot Password?
              </button>
            </div>

            <div className="space-y-3 pt-3">
              <Button fullWidth type="submit" size="lg" className="!rounded-md">
                Login
              </Button>
              <Button
                fullWidth
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGuestClick}
                className="!rounded-md"
              >
                Continue as Guest
              </Button>
            </div>

            <div className="pt-6 text-center border-t border-[#EAEAEA]">
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#888888]">
                Demo Mode — No authentication required
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
