import React from 'react';
import { ThemeConfig } from '../types';

interface SplitEditorialSectionProps {
  theme: ThemeConfig;
  onFollowClick: () => void;
}

export const SplitEditorialSection: React.FC<SplitEditorialSectionProps> = ({
  theme,
  onFollowClick
}) => {
  const story = theme.splitStory;

  return (
    <section
      id="split-editorial-section"
      className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 select-none overflow-hidden"
    >
      {/* Left Visual Half - Matches Screenshot 6 */}
      <div className="relative w-full h-[360px] sm:h-[450px] lg:h-auto overflow-hidden bg-black">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-1000 hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* Right Warm Beige Container - Matches Screenshot 6 */}
      <div className="w-full bg-[#DCD4BE] text-[#1E201E] px-8 sm:px-16 md:px-20 py-16 sm:py-24 flex flex-col items-start justify-center parallax-text-group">
        {/* Title: "FOLLOW THE JOURNEY" */}
        <h2
          id="split-editorial-title"
          className="font-serif-display text-4xl sm:text-5xl md:text-6xl tracking-[0.05em] uppercase text-[#1E201E] font-normal leading-[1.05] mb-5 parallax-title"
        >
          {story.title}
        </h2>

        {/* Narrative */}
        <p
          id="split-editorial-desc"
          className="text-sm sm:text-base font-sans-body text-[#3B3D3A] font-light leading-relaxed mb-6 max-w-md parallax-desc"
        >
          {story.description}
        </p>

        {/* Social Handle */}
        <p
          id="split-editorial-handle"
          className="text-xs font-sans-body uppercase tracking-[0.24em] text-[#4A4D48] mb-8 font-medium parallax-text"
        >
          {story.handle}
        </p>

        {/* Dark Button: "FOLLOW US" */}
        <button
          id="split-editorial-cta"
          onClick={onFollowClick}
          className="px-8 py-3.5 bg-[#313330] hover:bg-[#1E201E] text-[#ECE7DC] text-xs font-sans-body uppercase tracking-[0.24em] transition-all duration-300 cursor-pointer shadow-md"
        >
          {story.cta}
        </button>
      </div>
    </section>
  );
};
