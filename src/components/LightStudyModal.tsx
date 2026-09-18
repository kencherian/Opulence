import React from 'react';
import { X, Sparkles, Sliders, Sun, Eye, Layers } from 'lucide-react';
import { ThemeConfig, ThemeId } from '../types';

interface LightStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  allThemes: ThemeConfig[];
  onSelectTheme: (id: ThemeId) => void;
  textureMode: 'natural' | 'enhanced' | 'monochrome';
  onChangeTextureMode: (mode: 'natural' | 'enhanced' | 'monochrome') => void;
  videoSpeed: number;
  onToggleSpeed: () => void;
}

export const LightStudyModal: React.FC<LightStudyModalProps> = ({
  isOpen,
  onClose,
  theme,
  allThemes,
  onSelectTheme,
  textureMode,
  onChangeTextureMode,
  videoSpeed,
  onToggleSpeed
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="light-study-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="light-study-modal-card"
        className="relative w-full max-w-2xl bg-[#171817] border border-white/15 text-[#E5DFD1] p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          id="btn-close-light-study"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-[#A8A49A] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-sans-body uppercase tracking-[0.24em] text-[#C5BFB0] mb-2">
          <Sparkles className="w-4 h-4 text-[#E5DFD1]" />
          <span>Curator Tool</span>
        </div>

        <h3 className="font-serif-display text-3xl sm:text-4xl tracking-[0.05em] uppercase text-[#ECE7DC] font-normal mb-2">
          Light & Shadow Study
        </h3>
        <p className="text-xs font-sans-body text-[#9E9A8E] tracking-[0.1em] mb-6">
          Material Texture Analysis for {theme.heroTitle} ({theme.themeCategory})
        </p>

        {/* Live Filter Controls */}
        <div className="p-5 bg-black/40 border border-white/10 mb-8 space-y-4">
          <span className="text-xs font-sans-body uppercase tracking-[0.2em] text-[#D8D2C2] block font-medium">
            Live Texture Grading Engine
          </span>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'natural', label: 'Natural HDR', desc: 'True-to-life organic tones' },
              { id: 'enhanced', label: 'Texture Boost', desc: 'Pops micro-reliefs & grain' },
              { id: 'monochrome', label: 'Luminance Study', desc: 'Isolates light & shadow falloff' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => onChangeTextureMode(mode.id as 'natural' | 'enhanced' | 'monochrome')}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  textureMode === mode.id
                    ? 'border-[#E5DFD1] bg-white/10 text-white'
                    : 'border-white/10 bg-transparent text-[#9C978B] hover:text-white hover:border-white/25'
                }`}
              >
                <span className="block text-xs font-sans-body uppercase tracking-[0.14em] font-medium mb-1">
                  {mode.label}
                </span>
                <span className="block text-[10px] font-sans-body text-[#78746A] leading-tight">
                  {mode.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-sans-body text-[#A5A094]">
              Cinematic Frame Rate:
            </span>
            <button
              onClick={onToggleSpeed}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono-tech text-[#E5DFD1] transition-colors rounded-none cursor-pointer"
            >
              Playback: {videoSpeed}x {videoSpeed < 1 ? '(Slow Motion)' : '(Standard)'}
            </button>
          </div>
        </div>

        {/* Material Optics Profile */}
        <div className="space-y-4 text-xs font-sans-body text-[#C5C0B3] mb-8">
          <div className="p-3.5 bg-white/[0.02] border-l-2 border-[#E5DFD1] space-y-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#E5DFD1] flex items-center gap-1.5 font-medium">
              <Sun className="w-3.5 h-3.5 text-[#E5DFD1]" />
              Surface Interaction:
            </span>
            <p className="leading-relaxed text-[#B5B0A2]">{theme.studyNotes.surfaceInteraction}</p>
          </div>

          <div className="p-3.5 bg-white/[0.02] border-l-2 border-[#C5BFB0] space-y-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#E5DFD1] flex items-center gap-1.5 font-medium">
              <Eye className="w-3.5 h-3.5 text-[#E5DFD1]" />
              Specular Highlight Behavior:
            </span>
            <p className="leading-relaxed text-[#B5B0A2]">{theme.studyNotes.specularBehavior}</p>
          </div>

          <div className="p-3.5 bg-white/[0.02] border-l-2 border-[#A5A094] space-y-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#E5DFD1] flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-[#E5DFD1]" />
              Ambient Occlusion & Shadow Depth:
            </span>
            <p className="leading-relaxed text-[#B5B0A2]">{theme.studyNotes.ambientOcclusion}</p>
          </div>
        </div>

        {/* Switch Theme from here */}
        <div>
          <span className="text-[10px] font-sans-body uppercase tracking-[0.24em] text-[#7A766D] block mb-3">
            Compare Across Themes
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {allThemes.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTheme(t.id)}
                className={`p-2 text-center text-xs font-sans-body uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                  t.id === theme.id
                    ? 'border-[#E5DFD1] bg-white/10 text-white font-medium'
                    : 'border-white/10 text-[#8C887E] hover:text-white hover:border-white/30'
                }`}
              >
                {t.navLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
