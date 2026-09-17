import React from 'react';
import { ThemeConfig, ArtifactSpecimen } from '../types';
import { Eye } from 'lucide-react';

interface ElementsGridProps {
  theme: ThemeConfig;
  onSelectSpecimen: (specimen: ArtifactSpecimen) => void;
}

export const ElementsGrid: React.FC<ElementsGridProps> = ({
  theme,
  onSelectSpecimen
}) => {
  return (
    <section
      id="elements-grid-section"
      className="w-full py-24 sm:py-32 px-6 sm:px-12 md:px-20 bg-[#212321] text-[#E5DFD1] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading - Matches Screenshot 4 "ELEMENTS OF EARTH" */}
        <div className="mb-14 sm:mb-20">
          <h2
            id="elements-grid-title"
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl tracking-[0.06em] uppercase text-[#E5DFD1] font-normal leading-[1.0] mb-3"
          >
            {theme.elementsTitle}
          </h2>
          <p className="text-xs sm:text-sm font-sans-body uppercase tracking-[0.2em] text-[#9E9A8E] font-light">
            {theme.elementsSubtitle}
          </p>
        </div>

        {/* 3-Card Grid - Matches Screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {theme.specimens.map((item) => (
            <div
              key={item.id}
              id={`specimen-card-${item.id}`}
              onClick={() => onSelectSpecimen(item)}
              className="group cursor-pointer flex flex-col transition-transform duration-500"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full overflow-hidden bg-black/40 mb-5 shadow-lg border border-white/5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Inspect Overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 px-4 py-2 bg-black/70 border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-sans-body">
                    <Eye className="w-3.5 h-3.5 text-[#E5DFD1]" />
                    <span>Inspect Texture</span>
                  </div>
                </div>

                {/* Optional Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 border border-white/10 text-[9px] uppercase tracking-[0.2em] font-sans-body text-[#DCD6C9]">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Title & Price - Matches Screenshot 4 */}
              <div className="flex flex-col items-start">
                <h3 className="font-serif-display text-xl sm:text-2xl tracking-[0.08em] uppercase text-[#E5DFD1] font-normal group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-sans-body tracking-[0.12em] text-[#9A9588] mt-1">
                  {item.price}
                </p>
                <p className="text-xs font-sans-body text-[#78746A] line-clamp-1 mt-1 font-light">
                  {item.material}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
