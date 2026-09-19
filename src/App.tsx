/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { THEMES } from './data/themes';
import { ThemeId, ArtifactSpecimen } from './types';
import { Navigation } from './components/Navigation';
import { VideoBackground } from './components/VideoBackground';
import { HeroOverlay } from './components/HeroOverlay';
import { HeroControls } from './components/HeroControls';
import { SecondaryVideoSection } from './components/SecondaryVideoSection';
import { FeaturedArtifactSection } from './components/FeaturedArtifactSection';
import { ElementsGrid } from './components/ElementsGrid';
import { PhilosophyBanner } from './components/PhilosophyBanner';
import { SplitEditorialSection } from './components/SplitEditorialSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { MenuDrawer } from './components/MenuDrawer';
import { LightStudyModal } from './components/LightStudyModal';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { ScrollDownIndicator } from './components/ScrollDownIndicator';
import { soundscape } from './utils/soundscape';

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('nature');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [textureMode, setTextureMode] = useState<'natural' | 'enhanced' | 'monochrome'>('natural');
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState<ArtifactSpecimen | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightStudyOpen, setIsLightStudyOpen] = useState(false);
  const [cart, setCart] = useState<ArtifactSpecimen[]>([]);
  const [heroMounted, setHeroMounted] = useState(false);

  const currentTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  // Trigger smooth staggered entrance on hero section upon initial mount and theme changes
  useEffect(() => {
    setHeroMounted(false);
    const timer = setTimeout(() => {
      setHeroMounted(true);
    }, 60);
    return () => clearTimeout(timer);
  }, [currentThemeId]);

  // Preload upcoming theme video buffers for instantaneous switching
  useEffect(() => {
    THEMES.forEach((theme) => {
      if (theme.id !== currentThemeId) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = theme.videoUrl;
        document.head.appendChild(link);
      }
    });
  }, [currentThemeId]);

  // Sync ambient soundscape when theme changes
  useEffect(() => {
    if (isAudioPlaying) {
      soundscape.play(currentTheme.soundscapeType);
    }
  }, [currentThemeId, isAudioPlaying, currentTheme.soundscapeType]);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      soundscape.stop();
      setIsAudioPlaying(false);
    } else {
      soundscape.play(currentTheme.soundscapeType);
      setIsAudioPlaying(true);
    }
  };

  const handleSelectTheme = (id: ThemeId) => {
    setCurrentThemeId(id);
    // Smoothly scroll back to hero if user is deep in the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleSpeed = () => {
    setVideoSpeed((prev) => (prev === 1.0 ? 0.75 : 1.0));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (specimen: ArtifactSpecimen) => {
    setCart((prev) => [...prev, specimen]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Intersection Observer to add 'fade-in' class to section components on viewport entry
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          // Also add to any child section/footer element
          const innerSection = entry.target.querySelector('section, footer');
          if (innerSection) {
            innerSection.classList.add('fade-in');
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    });

    const targets = document.querySelectorAll('.editorial-section');
    targets.forEach((target, index) => {
      if (index > 0) {
        target.classList.remove('fade-in');
        const innerSection = target.querySelector('section, footer');
        if (innerSection) {
          innerSection.classList.remove('fade-in');
        }
      }
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentThemeId]);

  // Viscous dampening curve & frame-by-frame lerp parallax engine for high-end text depth & dynamic velocity blur
  useEffect(() => {
    let animationFrameId: number | null = null;
    let isRunning = false;

    // Velocity & Gaussian blur tracking
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let targetBlur = 0;
    let currentBlur = 0;
    const MAX_BLUR = 3.5; // Max subtle Gaussian blur in pixels
    const BLUR_SCALE = 1.6; // Velocity-to-blur multiplier
    const BLUR_LERP_FACTOR = 0.12; // Viscous decay for blur transition

    // Horizontal mouse perspective-origin tracking
    let targetPerspectiveOriginX = 50; // Default 50%
    let currentPerspectiveOriginX = 50;
    const PERSPECTIVE_LERP_FACTOR = 0.08; // Viscous response for mouse movement

    // Stores the current interpolated position, target scroll position, and macro-lens scale & focus per section
    interface SectionMotionState {
      currentY: number;
      targetY: number;
      currentScale: number;
      targetScale: number;
      currentFocus: number;
      targetFocus: number;
    }

    const stateMap = new Map<HTMLElement, SectionMotionState>();
    const LERP_FACTOR = 0.07; // Viscous dampening curve: lower values yield richer, silk-like deceleration

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const calculateTargets = () => {
      const sections = document.querySelectorAll<HTMLElement>('.editorial-section');
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      sections.forEach((section) => {
        let state = stateMap.get(section);
        if (!state) {
          state = {
            currentY: 0,
            targetY: 0,
            currentScale: 1,
            targetScale: 1,
            currentFocus: 0,
            targetFocus: 0,
          };
          stateMap.set(section, state);
        }

        const rect = section.getBoundingClientRect();
        // Calculate targets only for elements within or closely approaching the viewport
        if (rect.bottom > -200 && rect.top < viewportHeight + 200) {
          const sectionCenter = rect.top + rect.height / 2;
          const distanceFromCenter = sectionCenter - viewportCenter;
          // Negative factor ensures text moves slightly slower than background video during scroll
          const rawOffset = distanceFromCenter * -0.085;
          state.targetY = Math.max(-42, Math.min(42, rawOffset));

          // Macro-lens focus: smooth cosine bell-curve peaking when section is exactly at vertical viewport center
          const focalZone = viewportHeight * 0.48;
          const normalizedDist = Math.min(1, Math.abs(distanceFromCenter) / focalZone);
          const focusFactor = Math.max(0, Math.cos((normalizedDist * Math.PI) / 2));

          // Secondary scale transform expands up to 1.055x at exact vertical center
          state.targetScale = 1 + focusFactor * 0.055;
          state.targetFocus = focusFactor;
        } else {
          state.targetY = 0;
          state.targetScale = 1;
          state.targetFocus = 0;
        }
      });
    };

    const tick = () => {
      let isSettled = true;
      const now = performance.now();

      // Decay blur target once scroll event stream halts
      if (now - lastScrollTime > 45) {
        targetBlur = 0;
      }

      // Smoothly interpolate dynamic Gaussian blur
      const blurDelta = targetBlur - currentBlur;
      if (Math.abs(blurDelta) > 0.02) {
        currentBlur = lerp(currentBlur, targetBlur, BLUR_LERP_FACTOR);
        document.documentElement.style.setProperty('--scroll-blur', `${currentBlur.toFixed(2)}px`);
        isSettled = false;
      } else if (currentBlur !== targetBlur) {
        currentBlur = targetBlur;
        document.documentElement.style.setProperty('--scroll-blur', `${targetBlur.toFixed(2)}px`);
      }

      // Smoothly interpolate horizontal perspective-origin shift based on mouse X position
      const perspectiveDelta = targetPerspectiveOriginX - currentPerspectiveOriginX;
      if (Math.abs(perspectiveDelta) > 0.04) {
        currentPerspectiveOriginX = lerp(currentPerspectiveOriginX, targetPerspectiveOriginX, PERSPECTIVE_LERP_FACTOR);
        document.documentElement.style.setProperty('--perspective-origin-x', `${currentPerspectiveOriginX.toFixed(2)}%`);
        isSettled = false;
      } else if (currentPerspectiveOriginX !== targetPerspectiveOriginX) {
        currentPerspectiveOriginX = targetPerspectiveOriginX;
        document.documentElement.style.setProperty('--perspective-origin-x', `${targetPerspectiveOriginX.toFixed(2)}%`);
      }

      stateMap.forEach((state, section) => {
        // 1. Interpolate parallax Y offset
        const deltaY = state.targetY - state.currentY;
        if (Math.abs(deltaY) > 0.04) {
          state.currentY = lerp(state.currentY, state.targetY, LERP_FACTOR);
          section.style.setProperty('--parallax-y', `${state.currentY.toFixed(2)}px`);
          isSettled = false;
        } else if (state.currentY !== state.targetY) {
          state.currentY = state.targetY;
          section.style.setProperty('--parallax-y', `${state.targetY.toFixed(2)}px`);
        }

        // 2. Interpolate macro-lens scale transform
        const deltaScale = state.targetScale - state.currentScale;
        if (Math.abs(deltaScale) > 0.0006) {
          state.currentScale = lerp(state.currentScale, state.targetScale, LERP_FACTOR);
          section.style.setProperty('--macro-scale', state.currentScale.toFixed(4));
          isSettled = false;
        } else if (state.currentScale !== state.targetScale) {
          state.currentScale = state.targetScale;
          section.style.setProperty('--macro-scale', state.targetScale.toFixed(4));
        }

        // 3. Interpolate macro-lens optical focus factor
        const deltaFocus = state.targetFocus - state.currentFocus;
        if (Math.abs(deltaFocus) > 0.006) {
          state.currentFocus = lerp(state.currentFocus, state.targetFocus, LERP_FACTOR);
          section.style.setProperty('--macro-focus', state.currentFocus.toFixed(3));
          isSettled = false;
        } else if (state.currentFocus !== state.targetFocus) {
          state.currentFocus = state.targetFocus;
          section.style.setProperty('--macro-focus', state.targetFocus.toFixed(3));
        }
      });

      if (!isSettled) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
        animationFrameId = null;
      }
    };

    const wakeLoop = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = Math.max(1, now - lastScrollTime);
      const instantVelocity = deltaY / deltaTime; // px per millisecond

      if (instantVelocity > 0.05) {
        targetBlur = Math.min(MAX_BLUR, instantVelocity * BLUR_SCALE);
      }

      lastScrollY = currentScrollY;
      lastScrollTime = now;

      calculateTargets();
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const ratioX = (e.clientX - centerX) / (centerX || 1);
      const clampedRatioX = Math.max(-1, Math.min(1, ratioX));
      // Subtle shift: ±14% from 50% center (smoothly ranging between 36% and 64%)
      targetPerspectiveOriginX = 50 + clampedRatioX * 14;

      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const handleMouseLeave = () => {
      // Gently return perspective-origin to center when cursor leaves viewport
      targetPerspectiveOriginX = 50;
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', wakeLoop, { passive: true });
    window.addEventListener('resize', wakeLoop, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Initial activation
    wakeLoop();

    return () => {
      window.removeEventListener('scroll', wakeLoop);
      window.removeEventListener('resize', wakeLoop);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      document.documentElement.style.removeProperty('--scroll-blur');
      document.documentElement.style.removeProperty('--perspective-origin-x');
      stateMap.forEach((_, section) => {
        section.style.removeProperty('--parallax-y');
        section.style.removeProperty('--macro-scale');
        section.style.removeProperty('--macro-focus');
      });
      stateMap.clear();
    };
  }, [currentThemeId]);

  // Keyboard accessibility shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        setSelectedSpecimen(null);
        setIsMenuOpen(false);
        setIsLightStudyOpen(false);
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsVideoPlaying((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        const idx = THEMES.findIndex((t) => t.id === currentThemeId);
        const next = THEMES[(idx + 1) % THEMES.length];
        handleSelectTheme(next.id);
      } else if (e.key === 'ArrowLeft') {
        const idx = THEMES.findIndex((t) => t.id === currentThemeId);
        const prev = THEMES[(idx - 1 + THEMES.length) % THEMES.length];
        handleSelectTheme(prev.id);
      } else if (e.key.toLowerCase() === 'm') {
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentThemeId, isAudioPlaying]);

  return (
    <div id="video-hero-app-root" className="relative min-h-screen bg-[#111211] text-[#E5DFD1]">
      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* 1. Fullscreen Looping Video Hero Background */}
      <VideoBackground
        theme={currentTheme}
        isPlaying={isVideoPlaying}
        textureMode={textureMode}
        videoSpeed={videoSpeed}
      />

      {/* 2. Top Navigation Bar (Matches Screenshot 1) */}
      <Navigation
        currentTheme={currentTheme}
        allThemes={THEMES}
        onSelectTheme={handleSelectTheme}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenLightStudy={() => setIsLightStudyOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        cartCount={cart.length}
      />

      {/* 3. Hero Overlay (Matches Screenshot 1) */}
      <div className={`editorial-section relative ${heroMounted ? 'fade-in' : ''}`}>
        <HeroOverlay
          theme={currentTheme}
          onExploreClick={() => scrollToSection('secondary-video-section')}
          onInspectClick={() => setIsLightStudyOpen(true)}
        />
        <ScrollDownIndicator
          id="scroll-indicator-hero"
          targetId="secondary-video-section"
          label="Scroll to Coastal Serenity"
        />
      </div>

      {/* 4. Bottom Immersion Toolbar (Theme Selector, Play/Pause, Speed, Light Filter) */}
      <HeroControls
        currentTheme={currentTheme}
        allThemes={THEMES}
        onSelectTheme={handleSelectTheme}
        isPlaying={isVideoPlaying}
        onTogglePlay={() => setIsVideoPlaying((prev) => !prev)}
        textureMode={textureMode}
        onChangeTextureMode={setTextureMode}
        videoSpeed={videoSpeed}
        onToggleSpeed={toggleSpeed}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* 5. Secondary Video Section (Matches Screenshot 2 - "COASTAL SERENITY") */}
      <div className="editorial-section relative">
        <SecondaryVideoSection
          theme={currentTheme}
          onCtaClick={() => scrollToSection('featured-artifact-section')}
        />
        <ScrollDownIndicator
          id="scroll-indicator-secondary"
          targetId="featured-artifact-section"
          label="Scroll to Featured Artifact"
        />
      </div>

      {/* 6. Featured Artifact Split Showcase (Matches Screenshot 3 - "MOUNTAIN DAWN") */}
      <div className="editorial-section relative">
        <FeaturedArtifactSection
          theme={currentTheme}
          onViewGallery={() => scrollToSection('elements-grid-section')}
        />
        <ScrollDownIndicator
          id="scroll-indicator-featured"
          targetId="elements-grid-section"
          label="Scroll to Earth Elements"
        />
      </div>

      {/* 7. Elements Grid (Matches Screenshot 4 - "ELEMENTS OF EARTH") */}
      <div className="editorial-section relative">
        <ElementsGrid
          theme={currentTheme}
          onSelectSpecimen={(item) => setSelectedSpecimen(item)}
        />
        <ScrollDownIndicator
          id="scroll-indicator-elements"
          targetId="philosophy-banner-section"
          label="Scroll to Philosophy"
        />
      </div>

      {/* 8. Philosophy Banner (Matches Screenshot 5 - "TRUE TO NATURE") */}
      <div className="editorial-section relative">
        <PhilosophyBanner
          theme={currentTheme}
          onCtaClick={() => setIsLightStudyOpen(true)}
        />
        <ScrollDownIndicator
          id="scroll-indicator-philosophy"
          targetId="split-editorial-section"
          label="Scroll to Editorial Journey"
        />
      </div>

      {/* 9. Split Editorial Journey Section (Matches Screenshot 6 - "FOLLOW THE JOURNEY") */}
      <div className="editorial-section relative">
        <SplitEditorialSection
          theme={currentTheme}
          onFollowClick={() => scrollToSection('main-footer')}
        />
        <ScrollDownIndicator
          id="scroll-indicator-split"
          targetId="main-footer"
          label="Scroll to Community & Atelier"
        />
      </div>

      {/* 10. Minimalist Luxury Footer (Matches Screenshot 7) */}
      <div className="editorial-section relative">
        <Footer
          onSelectTheme={handleSelectTheme}
          onOpenStory={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Interactive Light & Shadow / Specimen Modal */}
      <DetailModal
        specimen={selectedSpecimen}
        theme={currentTheme}
        onClose={() => setSelectedSpecimen(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Atelier Directory Menu */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        themes={THEMES}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      {/* Light & Shadow Study Curator Modal */}
      <LightStudyModal
        isOpen={isLightStudyOpen}
        onClose={() => setIsLightStudyOpen(false)}
        theme={currentTheme}
        allThemes={THEMES}
        onSelectTheme={handleSelectTheme}
        textureMode={textureMode}
        onChangeTextureMode={setTextureMode}
        videoSpeed={videoSpeed}
        onToggleSpeed={toggleSpeed}
      />
    </div>
  );
}
