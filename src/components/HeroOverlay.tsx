import React from 'react';
import { ThemeConfig } from '../types';
import { Sparkles } from 'lucide-react';

interface HeroOverlayProps {
  theme: ThemeConfig;
  onExploreClick: () => void;
  onInspectClick: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  theme,
  onExploreClick,
  onInspectClick,
}) => {
  return (
    <section
      id="hero-fullscreen-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 select-none"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center parallax-text-group">
        {/* Sub-eyebrow - Matches Screenshot 1 "FORGED FROM NATURE" */}
        <div className="stagger-eyebrow">
          <p
            id="hero-eyebrow"
            className="text-xs sm:text-sm font-sans-body uppercase tracking-[0.3em] text-[#C9C4B8] mb-4 sm:mb-6 drop-shadow-sm font-light parallax-text"
          >
            {theme.brandEyebrow}
          </p>
        </div>

        {/* Hero Title - Matches Screenshot 1 "WILD & UNTAMED" */}
        <div className="stagger-title w-full flex justify-center">
          <h1
            id="hero-title"
            className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.08em] uppercase text-[#ECE7DC] font-normal leading-[0.95] mb-6 sm:mb-8 drop-shadow-md max-w-4xl parallax-title text-center"
          >
            {theme.heroTitle}
          </h1>
        </div>

        {/* Description - Matches Screenshot 1 */}
        <div className="stagger-desc w-full flex justify-center">
          <p
            id="hero-description"
            className="text-sm sm:text-base md:text-lg font-sans-body text-[#D5D0C5] max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 text-balance drop-shadow parallax-desc text-center"
          >
            {theme.heroSubtitle}
          </p>
        </div>

        {/* Action Buttons - Matches Screenshot 1 */}
        <div className="stagger-actions flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <button
            id="hero-cta-primary"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#E5DFD1] hover:bg-white text-[#161716] text-xs font-sans-body font-medium uppercase tracking-[0.22em] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            {theme.ctaPrimary}
          </button>

          <button
            id="hero-cta-secondary"
            onClick={onInspectClick}
            className="w-full sm:w-auto px-7 py-3.5 bg-black/30 hover:bg-black/50 border border-white/25 hover:border-white/60 text-[#ECE7DC] hover:text-white text-xs font-sans-body uppercase tracking-[0.22em] transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5DFD1]" />
            <span>{theme.ctaSecondary}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
