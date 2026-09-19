import React, { useRef, useState } from 'react';
import { ThemeConfig } from '../types';
import { Play, Pause } from 'lucide-react';

interface SecondaryVideoSectionProps {
  theme: ThemeConfig;
  onCtaClick: () => void;
}

export const SecondaryVideoSection: React.FC<SecondaryVideoSectionProps> = ({
  theme,
  onCtaClick
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="secondary-video-section"
      className="relative w-full min-h-screen flex items-center justify-start overflow-hidden px-6 sm:px-16 md:px-24 py-20 select-none bg-[#111211]"
    >
      {/* Secondary Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={theme.secondaryPosterUrl}
          alt={theme.secondaryHero.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover brightness-[0.78] contrast-[1.08]"
        >
          <source src={theme.secondaryVideoUrl} type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Content Block - Left aligned matching Screenshot 2 */}
      <div className="relative z-10 max-w-2xl text-left parallax-text-group">
        {/* Eyebrow - e.g. "OCEAN VISTAS" */}
        <div className="stagger-eyebrow">
          <p
            id="secondary-hero-eyebrow"
            className="text-xs sm:text-sm font-sans-body uppercase tracking-[0.26em] text-[#B5B0A2] mb-3 sm:mb-4 drop-shadow-sm font-light parallax-text"
          >
            {theme.secondaryHero.eyebrow}
          </p>
        </div>

        {/* Big Serif Heading - e.g. "COASTAL SERENITY" */}
        <div className="stagger-title">
          <h2
            id="secondary-hero-title"
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.06em] uppercase text-[#E5DFD1] font-normal leading-[1.0] mb-4 sm:mb-6 drop-shadow-md parallax-title"
          >
            {theme.secondaryHero.title}
          </h2>
        </div>

        {/* Subtitle - e.g. "Experience the rhythm of the tides" */}
        <div className="stagger-desc">
          <p
            id="secondary-hero-desc"
            className="text-sm sm:text-base md:text-lg font-sans-body text-[#C5C0B3] font-light leading-relaxed mb-8 drop-shadow max-w-lg parallax-desc"
          >
            {theme.secondaryHero.description}
          </p>
        </div>

        {/* Ghost Outline Button - Matches Screenshot 2 */}
        <div className="stagger-actions flex items-center gap-4">
          <button
            id="secondary-hero-cta"
            onClick={onCtaClick}
            className="px-8 py-3.5 bg-black/40 hover:bg-white/15 border border-white/40 hover:border-white text-[#E5DFD1] hover:text-white text-xs font-sans-body uppercase tracking-[0.24em] transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg"
          >
            {theme.secondaryHero.cta}
          </button>

          {/* Quick Play/Pause Control for secondary frame */}
          <button
            id="btn-secondary-video-play"
            onClick={togglePlay}
            className="p-3.5 rounded-full border border-white/20 bg-black/40 hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause section video' : 'Play section video'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};
