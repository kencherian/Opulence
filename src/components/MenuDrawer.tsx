import React from 'react';
import { X, ArrowRight, Sparkles, Volume2, VolumeX, Compass } from 'lucide-react';
import { ThemeConfig, ThemeId, ArtifactSpecimen } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  themes: ThemeConfig[];
  currentTheme: ThemeConfig;
  onSelectTheme: (id: ThemeId) => void;
  cart: ArtifactSpecimen[];
  onRemoveFromCart: (id: string) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  themes,
  currentTheme,
  onSelectTheme,
  cart,
  onRemoveFromCart,
  isAudioPlaying,
  onToggleAudio
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="menu-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-start animate-fade-in"
      onClick={onClose}
    >
      <div
        id="menu-drawer-panel"
        className="w-full max-w-lg h-full bg-[#141514] border-r border-white/10 text-[#E5DFD1] p-8 sm:p-12 overflow-y-auto flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10">
            <span className="font-cinzel text-xl tracking-[0.3em] text-[#ECE7DC] font-semibold">
              OPULENCE
            </span>
            <button
              id="btn-close-menu-drawer"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#A8A49A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Directory Showcase */}
          <div className="mb-12">
            <p className="text-[11px] font-sans-body uppercase tracking-[0.28em] text-[#8C887D] mb-6 font-medium">
              Theme Showcases (04 Collections)
            </p>

            <ul className="space-y-4">
              {themes.map((theme) => {
                const isCurrent = theme.id === currentTheme.id;
                return (
                  <li key={theme.id}>
                    <button
                      id={`drawer-theme-btn-${theme.id}`}
                      onClick={() => {
                        onSelectTheme(theme.id);
                        onClose();
                      }}
                      className={`group w-full flex items-center justify-between p-3.5 transition-all text-left border ${
                        isCurrent
                          ? 'border-[#E5DFD1]/50 bg-white/5'
                          : 'border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono-tech text-xs text-[#8C887E]">
                          {theme.indexNumber}
                        </span>
                        <div>
                          <span className="font-serif-display text-xl sm:text-2xl tracking-[0.06em] uppercase block group-hover:text-white transition-colors">
                            {theme.navLabel}
                          </span>
                          <span className="text-[11px] font-sans-body tracking-[0.14em] text-[#8C887E]">
                            {theme.themeCategory}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8C887E] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Archive Bag / Selections */}
          {cart.length > 0 && (
            <div className="mb-10 p-5 bg-black/40 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans-body uppercase tracking-[0.2em] text-[#E5DFD1]">
                  Archive Bag ({cart.length})
                </span>
                <span className="text-xs font-mono-tech text-emerald-400">Reserved</span>
              </div>
              <ul className="space-y-2.5">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-xs font-sans-body py-1 border-b border-white/5"
                  >
                    <div>
                      <span className="text-[#E5DFD1] block">{item.title}</span>
                      <span className="text-[#78746A] text-[10px]">{item.price}</span>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-[#8C887E] hover:text-red-400 text-[10px] uppercase tracking-wider cursor-pointer"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Atmospheric Audio Soundscape toggle inside drawer */}
          <div className="p-4 bg-white/[0.03] border border-white/10 flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-[#E6DCBF] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#8C887E]" />
              )}
              <div>
                <span className="text-xs font-sans-body uppercase tracking-[0.16em] text-[#E5DFD1] block">
                  Atmospheric Soundscape
                </span>
                <span className="text-[10px] font-sans-body text-[#8C887E]">
                  Synthesized ambient wind & harmonic resonance
                </span>
              </div>
            </div>
            <button
              onClick={onToggleAudio}
              className="px-3 py-1 text-[11px] font-sans-body uppercase tracking-[0.15em] border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer"
            >
              {isAudioPlaying ? 'Mute' : 'Play'}
            </button>
          </div>
        </div>

        {/* Bottom Atelier Note */}
        <div className="pt-8 border-t border-white/10 text-xs font-sans-body text-[#78746A] leading-relaxed">
          <p className="flex items-center gap-1.5 text-[#B5B0A2] mb-1 font-medium">
            <Compass className="w-3.5 h-3.5 text-[#E5DFD1]" />
            <span>Atelier Manifesto</span>
          </p>
          <p>
            Opulence crafts cinematic digital hero experiences celebrating raw natural elements,
            sculpted clay, tactile hides, and kinetic micro-machining.
          </p>
        </div>
      </div>
    </div>
  );
};
