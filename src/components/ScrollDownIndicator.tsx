import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollDownIndicatorProps {
  id?: string;
  targetId: string;
  label?: string;
  className?: string;
}

export const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
  id,
  targetId,
  label = 'Scroll to next section',
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`absolute bottom-20 sm:bottom-22 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer group select-none ${className}`}
    >
      <span className="text-[9px] font-sans-body uppercase tracking-[0.28em] font-light text-[#C5C0B3]/70 group-hover:text-[#ECE7DC] opacity-60 group-hover:opacity-100 transition-opacity">
        Scroll
      </span>
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:border-white/50 group-hover:bg-black/70 group-hover:scale-105 transition-all shadow-lg">
        <ChevronDown
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5DFD1] group-hover:text-white transition-colors animate-gentle-pulse"
          strokeWidth={1.5}
        />
      </div>
    </button>
  );
};
