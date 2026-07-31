import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FFFFFF] pt-20 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#262626]">
          {/* Brand Vision Column */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl tracking-[0.25em] font-bold text-[#EADBC8]">
                LÉONIE
              </span>
              <span className="block text-[10px] font-sans tracking-[0.4em] uppercase text-[#999999]">
                HAUTE COUTURE & BOUTIQUE
              </span>
            </Link>
            <p className="text-xs text-[#AAAAAA] font-sans leading-relaxed pr-6">
              An independent atelier dedicated to timeless luxury dressmaking. Every piece is cut from the world’s finest silks, velvets, and organic linens with hand-crafted precision.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#EADBC8] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs text-[#CCCCCC] font-sans">
              <li>
                <Link to="/" className="hover:text-[#EADBC8] transition-colors">
                  Storefront
                </Link>
              </li>
              <li>
                <a href="/#collection" className="hover:text-[#EADBC8] transition-colors">
                  Featured 10 Dresses
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-[#EADBC8] transition-colors">
                  Atelier Philosophy
                </a>
              </li>
              <li>
                <a href="/#reviews" className="hover:text-[#EADBC8] transition-colors">
                  Patron Reviews
                </a>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#EADBC8] transition-colors">
                  View Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Assistance */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#EADBC8] mb-6">
              Client Concierge
            </h4>
            <ul className="space-y-3.5 text-xs text-[#CCCCCC] font-sans">
              <li>Complimentary Express Worldwide Shipping</li>
              <li>30-Day Bespoke Returns</li>
              <li>Private Fitting Appointments</li>
              <li>concierge@leonie-luxe.com</li>
              <li>+1 (800) 948-LEONIE</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#EADBC8] mb-4">
              Private Gazette
            </h4>
            <p className="text-xs text-[#AAAAAA] font-sans mb-4">
              Subscribe for private collection debuts and VIP runway invitations.
            </p>

            {subscribed ? (
              <div className="bg-[#222222] border border-[#EADBC8] text-[#EADBC8] p-3 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are now subscribed to the Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-[#555555] focus-within:border-[#EADBC8]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-3 bg-transparent text-xs text-[#FFFFFF] placeholder-[#777777] focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 text-[#EADBC8] hover:text-[#FFFFFF] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#777777] font-sans">
          <p>© {new Date().getFullYear()} LÉONIE LUXE BOUTIQUE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#FFFFFF] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#FFFFFF] cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
