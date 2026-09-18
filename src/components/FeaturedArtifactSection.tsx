import React from 'react';
import { ThemeConfig } from '../types';

interface FeaturedArtifactSectionProps {
  theme: ThemeConfig;
  onViewGallery: () => void;
}

export const FeaturedArtifactSection: React.FC<FeaturedArtifactSectionProps> = ({
  theme,
  onViewGallery
}) => {
  const artifact = theme.featuredArtifact;

  return (
    <section
      id="featured-artifact-section"
      className="relative w-full min-h-screen flex items-center py-20 px-6 sm:px-12 md:px-20 bg-[#282927] text-[#E5DFD1] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Visual Frame - Matches Screenshot 3 */}
        <div className="lg:col-span-6 relative group overflow-hidden shadow-2xl bg-black/40">
          <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
            <img
              src={artifact.imageUrl}
              alt={artifact.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Framing border */}
          <div className="absolute inset-0 border border-white/10 pointer-events-none" />
        </div>

        {/* Right Editorial Text - Matches Screenshot 3 */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center parallax-text-group">
          {/* Eyebrow - e.g. "FEATURED LANDSCAPE" */}
          <p
            id="featured-artifact-eyebrow"
            className="text-xs font-sans-body uppercase tracking-[0.28em] text-[#AFA99B] mb-3 sm:mb-4 font-light parallax-text"
          >
            {artifact.eyebrow}
          </p>

          {/* Title - e.g. "MOUNTAIN DAWN" */}
          <h2
            id="featured-artifact-title"
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl tracking-[0.06em] uppercase text-[#ECE7DC] font-normal leading-[1.05] mb-6 drop-shadow-sm parallax-title"
          >
            {artifact.title}
          </h2>

          {/* Paragraph */}
          <p
            id="featured-artifact-desc"
            className="text-sm sm:text-base font-sans-body text-[#BDB8AC] font-light leading-relaxed mb-8 max-w-xl parallax-desc"
          >
            {artifact.description}
          </p>

          {/* Technical Specs Tags */}
          <div className="w-full grid grid-cols-3 gap-4 mb-8 pt-4 border-t border-white/10">
            {artifact.specs.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-sans-body uppercase tracking-[0.16em] text-[#8C887E]">
                  {s.label}
                </span>
                <span className="text-xs sm:text-sm font-serif-display text-[#E5DFD1] font-medium mt-0.5">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Outlined Button - Matches Screenshot 3 "VIEW GALLERY" */}
          <button
            id="featured-artifact-cta"
            onClick={onViewGallery}
            className="px-8 py-3.5 bg-transparent hover:bg-white/10 border border-white/35 hover:border-white text-[#E5DFD1] hover:text-white text-xs font-sans-body uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer"
          >
            {artifact.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
