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

  const currentTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

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
      <HeroOverlay
        theme={currentTheme}
        onExploreClick={() => scrollToSection('secondary-video-section')}
        onInspectClick={() => setIsLightStudyOpen(true)}
      />

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
      <SecondaryVideoSection
        theme={currentTheme}
        onCtaClick={() => scrollToSection('elements-grid-section')}
      />

      {/* 6. Featured Artifact Split Showcase (Matches Screenshot 3 - "MOUNTAIN DAWN") */}
      <FeaturedArtifactSection
        theme={currentTheme}
        onViewGallery={() => scrollToSection('elements-grid-section')}
      />

      {/* 7. Elements Grid (Matches Screenshot 4 - "ELEMENTS OF EARTH") */}
      <ElementsGrid
        theme={currentTheme}
        onSelectSpecimen={(item) => setSelectedSpecimen(item)}
      />

      {/* 8. Philosophy Banner (Matches Screenshot 5 - "TRUE TO NATURE") */}
      <PhilosophyBanner
        theme={currentTheme}
        onCtaClick={() => setIsLightStudyOpen(true)}
      />

      {/* 9. Split Editorial Journey Section (Matches Screenshot 6 - "FOLLOW THE JOURNEY") */}
      <SplitEditorialSection
        theme={currentTheme}
        onFollowClick={() => scrollToSection('main-footer')}
      />

      {/* 10. Minimalist Luxury Footer (Matches Screenshot 7) */}
      <Footer
        onSelectTheme={handleSelectTheme}
        onOpenStory={() => setIsMenuOpen(true)}
      />

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
