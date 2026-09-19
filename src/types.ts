export type ThemeId = 'nature' | 'still-life' | 'materials' | 'metal-parts';

export interface ArtifactSpecimen {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  material: string;
  lightingNotes: string;
  imageUrl: string;
  badge?: string;
  dimensions?: string;
}

export interface ThemeConfig {
  id: ThemeId;
  indexNumber: string;
  navLabel: string;
  themeCategory: string;
  brandEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  videoUrl: string;
  posterUrl: string;
  secondaryVideoUrl: string;
  secondaryPosterUrl: string;
  accentColor: string;
  accentBg: string;
  soundscapeType: 'forest-wind' | 'ceramic-bells' | 'loom-resonance' | 'chronometer-ticks';
  
  // Secondary showcase (Screenshot 2)
  secondaryHero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  
  // Featured Split section (Screenshot 3)
  featuredArtifact: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    imageUrl: string;
    specs: { label: string; value: string }[];
  };
  
  // Elements grid (Screenshot 4)
  elementsTitle: string;
  elementsSubtitle: string;
  specimens: ArtifactSpecimen[];
  
  // Philosophy banner (Screenshot 5)
  philosophy: {
    title: string;
    description: string;
    cta: string;
  };
  
  // Split journey section (Screenshot 6)
  splitStory: {
    title: string;
    description: string;
    handle: string;
    cta: string;
    imageUrl: string;
  };

  // Light and shadow study notes
  studyNotes: {
    surfaceInteraction: string;
    specularBehavior: string;
    ambientOcclusion: string;
  };
}
