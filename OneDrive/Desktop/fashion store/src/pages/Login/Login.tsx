import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
import { LOGIN_IMAGE } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, continueAsGuest } = useAuth();

  const [email, setEmail] = useState('patron@leonie-luxe.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

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
      {/* Left Column - Editorial Hero Image & Overlay */}
      <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen bg-[#111111] overflow-hidden flex flex-col justify-between p-8 md:p-16 text-[#FFFFFF]">
        {/* Editorial Background Image */}
        <img
          src={LOGIN_IMAGE}
          alt="Editorial Fashion Model"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-1000"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

        {/* Top Logo */}
        <div className="relative z-10">
          <span className="font-serif text-3xl md:text-4xl tracking-[0.25em] font-bold text-[#EADBC8]">
            LÉONIE
          </span>
          <span className="block text-[10px] font-sans tracking-[0.4em] uppercase text-[#CCCCCC] mt-0.5">
            HAUTE COUTURE & LUXURY BOUTIQUE
          </span>
        </div>

        {/* Bottom Campaign Text */}
        <div className="relative z-10 max-w-md my-auto md:my-0">
          <div className="inline-flex items-center gap-2 text-[#EADBC8] text-xs font-sans uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn / Winter Collection</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight mb-4 text-[#FFFFFF]">
            Elegance is not standing out, but being remembered.
          </h1>
          <p className="text-sm font-sans text-[#DDDDDD] leading-relaxed font-light">
            Welcome to the private sanctuary of fine dressmaking. Explore ten exquisite creations hand-crafted for life's most memorable moments.
          </p>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 hidden md:block text-[11px] font-sans text-[#999999] tracking-wider uppercase">
          © {new Date().getFullYear()} LÉONIE LUXE ATELIER
        </div>
      </div>

      {/* Right Column - Minimalist Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 bg-[#FFFFFF]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#777777] font-medium block mb-2">
              Exclusive Access
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111111] font-normal mb-3">
              Client Sign In
            </h2>
            <p className="text-xs text-[#666666] font-sans">
              Enter your credentials or enter immediately as a distinguished guest.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-sans font-medium text-[#111111] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-[#F8F8F8] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:bg-[#FFFFFF] focus:border-[#111111] focus:outline-none transition-colors"
                  placeholder="patron@leonie-luxe.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-sans font-medium text-[#111111] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-[#F8F8F8] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:bg-[#FFFFFF] focus:border-[#111111] focus:outline-none transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs font-sans">
              <label className="flex items-center gap-2 cursor-pointer text-[#555555]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#111111] w-4 h-4"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-[#111111] underline hover:opacity-70">
                Forgot Password?
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button fullWidth type="submit" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Enter Boutique
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

            {/* Demo Notice */}
            <div className="pt-6 text-center border-t border-[#E5E5E5]">
              <p className="text-[11px] font-sans uppercase tracking-widest text-[#888888]">
                Demo Mode — Authentication Disabled
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
