import React, { useRef, useEffect, useState } from 'react';
import { ThemeConfig } from '../types';

interface VideoBackgroundProps {
  theme: ThemeConfig;
  isPlaying: boolean;
  textureMode: 'natural' | 'enhanced' | 'monochrome';
  videoSpeed: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  theme,
  isPlaying,
  textureMode,
  videoSpeed
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // When theme changes, reset state
  useEffect(() => {
    setIsVideoLoaded(false);
    setHasError(false);

    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsVideoLoaded(true))
        .catch(() => {
          // Autoplay policy or buffering - fallback gracefully
        });
    }
  }, [theme.videoUrl]);

  // Sync playback state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Sync speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  // Dynamic filter string according to texture study mode
  const getFilterStyle = () => {
    switch (textureMode) {
      case 'enhanced':
        // High micro-contrast and slight sharpening to reveal fiber/porosity/metal grain
        return 'contrast(1.22) brightness(0.88) saturate(1.1)';
      case 'monochrome':
        // Pure architectural light and shadow study
        return 'grayscale(1) contrast(1.25) brightness(0.85)';
      case 'natural':
      default:
        // Deep cinematic filmic grading
        return 'contrast(1.06) brightness(0.92)';
    }
  };

  return (
    <div id="video-hero-background-container" className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#0E0F0E]">
      {/* High-Resolution Poster Fallback (always rendered underneath to prevent any black flash) */}
      <img
        src={theme.posterUrl}
        alt={theme.heroTitle}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 scale-105 ${
          isVideoLoaded && !hasError ? 'opacity-30' : 'opacity-100'
        }`}
        style={{ filter: getFilterStyle() }}
        loading="eager"
        referrerPolicy="no-referrer"
      />

      {/* Main Fullscreen Video */}
      <video
        ref={videoRef}
        key={theme.videoUrl}
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        onError={() => setHasError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ filter: getFilterStyle() }}
      >
        <source src={theme.videoUrl} type="video/mp4" />
      </video>

      {/* Gradient Overlays for optimal text contrast & atmospheric depth */}
      {/* Top subtle gradient for navigation readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/75 pointer-events-none" />

      {/* Subtle radial vignette to pull focus to the center typography */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />

      {/* Subtle film grain texture overlay for organic depth */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '3px 3px'
        }}
      />

      {/* Subtle video optimization status pill (bottom right) */}
      <div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[10px] font-mono-tech uppercase tracking-[0.16em] text-[#B8B4AA] pointer-events-none select-none">
        <span className={`w-1.5 h-1.5 rounded-full ${isVideoLoaded ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
        <span>{isVideoLoaded ? 'HDR Stream · 60fps' : 'Optimizing Buffer...'}</span>
      </div>
    </div>
  );
};
