import React, { useState } from 'react';
import { X, Sparkles, Check, SunMedium, Layers, ShieldCheck } from 'lucide-react';
import { ArtifactSpecimen, ThemeConfig } from '../types';

interface DetailModalProps {
  specimen: ArtifactSpecimen | null;
  theme: ThemeConfig;
  onClose: () => void;
  onAddToCart: (specimen: ArtifactSpecimen) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  specimen,
  theme,
  onClose,
  onAddToCart
}) => {
  const [lightAngle, setLightAngle] = useState(45);
  const [added, setAdded] = useState(false);

  if (!specimen) return null;

  const handleAdd = () => {
    onAddToCart(specimen);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div
      id="detail-inspection-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#181918] border border-white/15 shadow-2xl rounded-none text-[#E5DFD1] p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-detail-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#AFA99C] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Visual with Light simulation filter */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative aspect-square w-full overflow-hidden bg-black border border-white/10 shadow-xl group">
              <img
                src={specimen.imageUrl}
                alt={specimen.title}
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  filter: `contrast(${1 + (lightAngle - 45) * 0.004}) brightness(${
                    0.9 + (lightAngle - 45) * 0.003
                  })`
                }}
                referrerPolicy="no-referrer"
              />

              {/* Simulated Light Direction Indicator */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  background: `linear-gradient(${lightAngle}deg, rgba(255,255,255,0.18) 0%, transparent 60%)`
                }}
              />

              {specimen.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-white/15 text-[10px] uppercase tracking-[0.2em] font-sans-body">
                  {specimen.badge}
                </span>
              )}
            </div>

            {/* Interactive Light Angle Slider */}
            <div className="w-full mt-4 flex flex-col gap-1.5 px-1">
              <div className="flex items-center justify-between text-[11px] font-sans-body text-[#A5A094] uppercase tracking-[0.15em]">
                <span className="flex items-center gap-1">
                  <SunMedium className="w-3.5 h-3.5 text-[#E5DFD1]" />
                  <span>Light Angle Study</span>
                </span>
                <span className="font-mono-tech text-[#E5DFD1]">{lightAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={lightAngle}
                onChange={(e) => setLightAngle(Number(e.target.value))}
                className="w-full accent-[#E5DFD1] cursor-pointer bg-white/10 h-1.5 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Right Editorial Details */}
          <div className="md:col-span-6 flex flex-col items-start">
            <span className="text-xs font-sans-body uppercase tracking-[0.26em] text-[#9A9588] mb-2 font-light">
              {theme.themeCategory} · {specimen.subtitle}
            </span>

            <h3
              id="specimen-modal-title"
              className="font-serif-display text-3xl sm:text-4xl tracking-[0.06em] uppercase text-[#ECE7DC] font-normal leading-tight mb-2"
            >
              {specimen.title}
            </h3>

            <p className="text-sm font-sans-body tracking-[0.16em] text-[#C5BFB0] mb-5 font-medium">
              {specimen.price}
            </p>

            {/* Material Description */}
            <div className="w-full p-3.5 bg-black/40 border border-white/10 mb-5 space-y-2 text-xs font-sans-body">
              <div className="flex items-start gap-2">
                <Layers className="w-4 h-4 text-[#D8D2C2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#8E8A7F] uppercase tracking-[0.14em] block text-[10px]">
                    Material Composition
                  </span>
                  <span className="text-[#D8D2C2] leading-relaxed">{specimen.material}</span>
                </div>
              </div>

              {specimen.dimensions && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-[#8E8A7F] uppercase tracking-[0.14em]">Dimensions:</span>
                  <span className="font-mono-tech text-[#E5DFD1]">{specimen.dimensions}</span>
                </div>
              )}
            </div>

            {/* Lighting Behavior Notes */}
            <div className="mb-6 text-xs font-sans-body leading-relaxed text-[#B3AEA0]">
              <span className="text-[#8E8A7F] uppercase tracking-[0.18em] block text-[10px] mb-1 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E5DFD1]" />
                Light & Texture Profile:
              </span>
              <p>{specimen.lightingNotes}</p>
            </div>

            {/* Authenticity Badge */}
            <div className="flex items-center gap-2 text-[11px] font-sans-body text-[#8F8B80] mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Individually hallmarked & archived by Opulence Atelier</span>
            </div>

            {/* Action Button */}
            <button
              id="btn-modal-acquire"
              onClick={handleAdd}
              className={`w-full py-3.5 text-xs font-sans-body uppercase tracking-[0.24em] transition-all duration-300 font-medium cursor-pointer flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E5DFD1] hover:bg-white text-[#161716] shadow-lg'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Archive Bag</span>
                </>
              ) : (
                <span>Acquire Specimen ({specimen.price})</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
