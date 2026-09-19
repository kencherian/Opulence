import React from 'react';
import { ShoppingBag, Menu, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ThemeConfig, ThemeId } from '../types';

interface NavigationProps {
  currentTheme: ThemeConfig;
  allThemes: ThemeConfig[];
  onSelectTheme: (id: ThemeId) => void;
  onOpenMenu: () => void;
  onOpenLightStudy: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  cartCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTheme,
  allThemes,
  onSelectTheme,
  onOpenMenu,
  onOpenLightStudy,
  isAudioPlaying,
  onToggleAudio,
  cartCount = 0
}) => {
  return (
    <header
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-gradient-to-b from-black/70 via-black/30 to-transparent backdrop-blur-[2px] px-6 sm:px-12 py-5 flex items-center justify-between text-[#E8E6DF]"
    >
      {/* Left Menu Button */}
      <div className="flex items-center gap-4">
        <button
          id="btn-open-menu-drawer"
          onClick={onOpenMenu}
          className="group flex items-center gap-2 text-sm tracking-[0.18em] uppercase hover:text-white transition-colors duration-300 cursor-pointer"
          aria-label="Open Archive Menu"
        >
          <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="hidden md:inline text-xs font-light tracking-[0.2em] text-[#C5C2BA]">Menu</span>
        </button>

        {/* Texture / Light Study Trigger */}
        <button
          id="btn-nav-light-study"
          onClick={onOpenLightStudy}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[11px] tracking-[0.15em] uppercase text-[#D2CEC5] transition-all"
          title="Light & Shadow Study"
        >
          <Sparkles className="w-3 h-3 text-[#E6DCBF]" />
          <span>Texture Study</span>
        </button>
      </div>

      {/* Brand Centered - Matches Screenshot 1 "OPULENCE" */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
        <button
          id="brand-logo-button"
          onClick={() => onSelectTheme('nature')}
          className="font-cinzel text-xl sm:text-2xl md:text-3xl tracking-[0.35em] text-[#ECE7DC] hover:text-white transition-colors cursor-pointer block drop-shadow-sm font-semibold"
        >
          OPULENCE
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Quick Switcher Pills for Desktop */}
        <div className="hidden xl:flex items-center gap-1 bg-black/40 border border-white/15 rounded-full p-1 backdrop-blur-md">
          {allThemes.map((theme) => {
            const isActive = theme.id === currentTheme.id;
            return (
              <button
                key={theme.id}
                id={`btn-nav-theme-${theme.id}`}
                onClick={() => onSelectTheme(theme.id)}
                className={`px-3 py-1 text-[11px] uppercase tracking-[0.18em] transition-all rounded-full cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#E5DFD1] text-[#161716] font-medium shadow-sm'
                    : 'text-[#B8B4AA] hover:text-white hover:bg-white/10'
                }`}
              >
                {theme.navLabel}
              </button>
            );
          })}
        </div>

        {/* Ambient Soundscape Toggle */}
        <button
          id="btn-toggle-soundscape"
          onClick={onToggleAudio}
          className={`p-2.5 rounded-full border transition-all cursor-pointer ${
            isAudioPlaying
              ? 'border-[#E6DCBF] bg-[#E6DCBF]/20 text-[#FFF7E3]'
              : 'border-white/20 bg-black/20 text-[#A8A49C] hover:text-white hover:border-white/40'
          }`}
          aria-label={isAudioPlaying ? 'Mute ambient soundscape' : 'Play atmospheric ambient soundscape'}
          title={isAudioPlaying ? 'Mute soundscape' : 'Listen to atmospheric soundscape'}
        >
          {isAudioPlaying ? (
            <div className="flex items-center gap-1">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline text-[10px] tracking-[0.1em] font-mono-tech uppercase">Live</span>
            </div>
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Cart / Bag Icon - Matches Screenshot 1 */}
        <button
          id="btn-shopping-bag"
          onClick={onOpenMenu}
          className="relative p-2.5 rounded-full hover:bg-white/10 transition-colors text-[#ECE7DC] hover:text-white cursor-pointer"
          aria-label="View Archive Bag"
        >
          <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E5DFD1] text-[#141514] text-[10px] flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
