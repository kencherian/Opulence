import React from 'react';
import { Play, Pause, Maximize, Sliders, Gauge } from 'lucide-react';
import { ThemeConfig, ThemeId } from '../types';

interface HeroControlsProps {
  currentTheme: ThemeConfig;
  allThemes: ThemeConfig[];
  onSelectTheme: (id: ThemeId) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  textureMode: 'natural' | 'enhanced' | 'monochrome';
  onChangeTextureMode: (mode: 'natural' | 'enhanced' | 'monochrome') => void;
  videoSpeed: number;
  onToggleSpeed: () => void;
  onToggleFullscreen: () => void;
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  currentTheme,
  allThemes,
  onSelectTheme,
  isPlaying,
  onTogglePlay,
  textureMode,
  onChangeTextureMode,
  videoSpeed,
  onToggleSpeed,
  onToggleFullscreen
}) => {
  return (
    <div
      id="hero-immersion-toolbar"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] sm:w-auto px-4 sm:px-6 py-2.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl flex items-center justify-between sm:justify-center gap-3 sm:gap-6 text-[#D5D0C5] shadow-2xl transition-all"
    >
      {/* Play / Pause Toggle */}
      <button
        id="btn-ctrl-play-pause"
        onClick={onTogglePlay}
        className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        title={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Vertical Divider */}
      <div className="w-[1px] h-4 bg-white/15 hidden sm:block" />

      {/* 4 Theme Switchers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {allThemes.map((t) => {
          const isActive = t.id === currentTheme.id;
          return (
            <button
              key={t.id}
              id={`btn-ctrl-theme-${t.id}`}
              onClick={() => onSelectTheme(t.id)}
              className={`relative px-2.5 sm:px-3 py-1 text-xs font-sans-body uppercase tracking-[0.18em] transition-all cursor-pointer rounded-full ${
                isActive
                  ? 'text-white font-medium'
                  : 'text-[#9C988E] hover:text-[#E2DDD2]'
              }`}
            >
              <span className="font-mono-tech mr-1 text-[10px] opacity-70">{t.indexNumber}</span>
              <span className="hidden md:inline">{t.navLabel}</span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#E5DFD1] rounded-full animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>

      {/* Vertical Divider */}
      <div className="w-[1px] h-4 bg-white/15 hidden sm:block" />

      {/* Texture Study Filter Toggle */}
      <div className="hidden sm:flex items-center gap-1">
        <button
          id="btn-ctrl-texture-mode"
          onClick={() => {
            const nextMode =
              textureMode === 'natural'
                ? 'enhanced'
                : textureMode === 'enhanced'
                ? 'monochrome'
                : 'natural';
            onChangeTextureMode(nextMode);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans-body uppercase tracking-[0.15em] hover:bg-white/10 text-[#C7C2B6] hover:text-white transition-colors cursor-pointer"
          title={`Cycle Light & Shadow mode: Current: ${textureMode}`}
        >
          <Sliders className="w-3.5 h-3.5 text-[#E5DFD1]" />
          <span className="capitalize">{textureMode}</span>
        </button>

        {/* Cinematic Speed Toggle (0.75x slow motion / 1.0x normal) */}
        <button
          id="btn-ctrl-speed"
          onClick={onToggleSpeed}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono-tech hover:bg-white/10 text-[#C7C2B6] hover:text-white transition-colors cursor-pointer"
          title="Toggle Cinematic Speed"
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>{videoSpeed}x</span>
        </button>
      </div>

      {/* Fullscreen Toggle */}
      <button
        id="btn-ctrl-fullscreen"
        onClick={onToggleFullscreen}
        className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        aria-label="Toggle Fullscreen"
        title="Toggle Fullscreen"
      >
        <Maximize className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
