import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ThemeId } from '../types';

interface FooterProps {
  onSelectTheme: (id: ThemeId) => void;
  onOpenStory: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTheme, onOpenStory }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer
      id="main-footer"
      className="w-full min-h-screen flex items-center bg-[#1C1D1B] text-[#C7C2B6] py-16 px-6 sm:px-12 md:px-20 select-none border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Grid - Matches Screenshot 7 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Left Column: Join our community */}
          <div className="lg:col-span-5 flex flex-col items-start parallax-text-group">
            <h3
              id="footer-community-heading"
              className="font-serif-display text-2xl sm:text-3xl tracking-[0.04em] text-[#E5DFD1] font-normal mb-6 parallax-title"
            >
              Join our community
            </h3>

            <form onSubmit={handleSubmit} className="w-full max-w-md relative">
              <div className="flex items-center border-b border-[#6E6A60] focus-within:border-[#E5DFD1] transition-colors pb-2">
                <input
                  id="footer-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent text-sm font-sans-body placeholder-[#6E6A60] text-[#E5DFD1] focus:outline-none tracking-[0.05em]"
                />
                <button
                  id="btn-footer-newsletter-submit"
                  type="submit"
                  className="ml-2 text-[#C5C0B4] hover:text-white transition-colors cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubscribed ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {isSubscribed && (
                <p className="text-xs font-sans-body text-emerald-400 mt-2 font-light">
                  Thank you. You are now subscribed to the Opulence atelier dispatches.
                </p>
              )}
            </form>
          </div>

          {/* Right Navigation Columns: SHOP, COMPANY, HELP - Matches Screenshot 7 */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8">
            {/* SHOP */}
            <div className="flex flex-col">
              <h4 className="text-xs font-sans-body uppercase tracking-[0.24em] text-[#E5DFD1] mb-5 font-normal">
                SHOP
              </h4>
              <ul className="space-y-3.5 text-xs font-sans-body uppercase tracking-[0.16em] text-[#8E8A7F]">
                <li>
                  <button
                    onClick={() => onSelectTheme('nature')}
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    All Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectTheme('still-life')}
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectTheme('materials')}
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    Collections
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onSelectTheme('metal-parts')}
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    Kinetic Editions
                  </button>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col">
              <h4 className="text-xs font-sans-body uppercase tracking-[0.24em] text-[#E5DFD1] mb-5 font-normal">
                COMPANY
              </h4>
              <ul className="space-y-3.5 text-xs font-sans-body uppercase tracking-[0.16em] text-[#8E8A7F]">
                <li>
                  <button
                    onClick={onOpenStory}
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenStory}
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    Craftsmanship
                  </button>
                </li>
                <li>
                  <a
                    href="#split-editorial-section"
                    className="hover:text-[#E5DFD1] transition-colors cursor-pointer text-left"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* HELP */}
            <div className="flex flex-col">
              <h4 className="text-xs font-sans-body uppercase tracking-[0.24em] text-[#E5DFD1] mb-5 font-normal">
                HELP
              </h4>
              <ul className="space-y-3.5 text-xs font-sans-body uppercase tracking-[0.16em] text-[#8E8A7F]">
                <li>
                  <span className="hover:text-[#E5DFD1] transition-colors cursor-pointer">
                    FAQ
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#E5DFD1] transition-colors cursor-pointer">
                    Shipping
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#E5DFD1] transition-colors cursor-pointer">
                    Returns
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal - Matches Screenshot 7 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans-body text-[#736F65] tracking-[0.08em] gap-4">
          <p id="footer-copyright">2025 Opulence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#BDB8AC] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#BDB8AC] transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
