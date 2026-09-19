import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  accentColor?: string;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  accentColor = '#E5DFD1'
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalScrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, (scrollY / totalScrollableHeight) * 100)
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="reading-progress-track"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading Progress"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-white/[0.07] pointer-events-none"
    >
      <div
        id="reading-progress-bar"
        className="h-full transition-[width] duration-150 ease-out will-change-[width] relative"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: accentColor,
          boxShadow: '0 0 10px rgba(229, 223, 209, 0.45)'
        }}
      >
        {/* Subtle luminous leading spark */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-[5px] rounded-full bg-white blur-[1px] opacity-80" />
        )}
      </div>
    </div>
  );
};
