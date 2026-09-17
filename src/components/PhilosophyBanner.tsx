import React from 'react';
import { ThemeConfig } from '../types';

interface PhilosophyBannerProps {
  theme: ThemeConfig;
  onCtaClick: () => void;
}

export const PhilosophyBanner: React.FC<PhilosophyBannerProps> = ({
  theme,
  onCtaClick
}) => {
  return (
    <section
      id="philosophy-banner-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-12 py-24 select-none overflow-hidden bg-[#161716]"
    >
      {/* Background Image / Texture with dark gradient overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={theme.posterUrl}
          alt={theme.philosophy.title}
          className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.45] scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content - Matches Screenshot 5 */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center parallax-text-group">
        {/* Title: "TRUE TO NATURE" */}
        <h2
          id="philosophy-title"
          className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] uppercase text-[#E5DFD1] font-normal leading-[1.0] mb-6 drop-shadow-md parallax-title"
        >
          {theme.philosophy.title}
        </h2>

        {/* Narrative */}
        <p
          id="philosophy-desc"
          className="text-sm sm:text-base md:text-lg font-sans-body text-[#C9C4B8] max-w-2xl font-light leading-relaxed mb-10 drop-shadow text-balance parallax-desc"
        >
          {theme.philosophy.description}
        </p>

        {/* Button: "OUR PHILOSOPHY" */}
        <button
          id="philosophy-cta"
          onClick={onCtaClick}
          className="px-8 py-3.5 bg-black/40 hover:bg-white/15 border border-white/40 hover:border-white text-[#E5DFD1] hover:text-white text-xs font-sans-body uppercase tracking-[0.24em] transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
        >
          {theme.philosophy.cta}
        </button>
      </div>
    </section>
  );
};
