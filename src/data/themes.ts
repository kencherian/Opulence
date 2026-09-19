import { ThemeConfig } from '../types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'nature',
    indexNumber: '01',
    navLabel: 'Nature',
    themeCategory: 'Forest & Ocean',
    brandEyebrow: 'FORGED FROM NATURE',
    heroTitle: 'WILD & UNTAMED',
    heroSubtitle: 'Discover the raw beauty of untouched wilderness. From ancient forests to vast ocean horizons, immerse yourself in nature\'s grandeur.',
    ctaPrimary: 'EXPLORE NATURE',
    ctaSecondary: 'INSPECT SPECIMENS',
    videoUrl: 'https://assets.mixkit.co/videos/42031/42031-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop',
    secondaryVideoUrl: 'https://assets.mixkit.co/videos/42824/42824-720.mp4',
    secondaryPosterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    accentColor: '#DCD4BE',
    accentBg: 'rgba(32, 38, 33, 0.85)',
    soundscapeType: 'forest-wind',
    
    secondaryHero: {
      eyebrow: 'OCEAN VISTAS',
      title: 'COASTAL SERENITY',
      description: 'Experience the rhythm of the tides',
      cta: 'DISCOVER MORE'
    },
    
    featuredArtifact: {
      eyebrow: 'FEATURED LANDSCAPE',
      title: 'MOUNTAIN DAWN',
      description: 'Witness the first light breaking over mist-covered peaks. Our nature collection captures these ephemeral moments of transcendent beauty, preserved for those who seek the extraordinary.',
      cta: 'VIEW GALLERY',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      specs: [
        { label: 'Atmosphere', value: 'Morning Alpine Mist' },
        { label: 'Elevation', value: '2,400 m' },
        { label: 'Color Temperature', value: '4200K Golden Dawn' }
      ]
    },
    
    elementsTitle: 'ELEMENTS OF EARTH',
    elementsSubtitle: 'Specimens harvested and preserved from pristine ecosystems',
    specimens: [
      {
        id: 'forest-whisper',
        title: 'FOREST WHISPER',
        subtitle: 'Ancient Old-Growth Bark',
        price: 'From $120',
        material: 'Old-growth cedar, velvety moss, fractured sunlight',
        lightingNotes: 'Deep ambient occlusion inside trunk crevices; soft dappled specular highlights on wet moss pads.',
        imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop',
        badge: 'Rare Harvest',
        dimensions: 'H 42cm × W 28cm'
      },
      {
        id: 'oceans-edge',
        title: 'OCEAN\'S EDGE',
        subtitle: 'Crashing Basalt Coast',
        price: 'From $150',
        material: 'Black volcanic basalt, crystalline brine, ocean foam',
        lightingNotes: 'Grazing sunset backlighting throws razor rim-highlights along foaming crests and wet dark stone.',
        imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&auto=format&fit=crop',
        badge: 'Limited',
        dimensions: 'H 50cm × W 35cm'
      },
      {
        id: 'alpine-mirror',
        title: 'ALPINE MIRROR',
        subtitle: 'Glacial Reflection Pool',
        price: 'From $180',
        material: 'Mineral-rich glacial meltwater, sub-zero frost, granite peak',
        lightingNotes: 'Mirror symmetry with calm diffuse skylight; specular pink tint on snow-covered summits.',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
        badge: 'Signature',
        dimensions: 'H 60cm × W 45cm'
      }
    ],
    
    philosophy: {
      title: 'TRUE TO NATURE',
      description: 'We venture into the wild to capture moments that words cannot describe. Each frame is a testament to the enduring power and delicate beauty of the natural world.',
      cta: 'OUR PHILOSOPHY'
    },
    
    splitStory: {
      title: 'FOLLOW THE JOURNEY',
      description: 'Join our community of nature enthusiasts and explorers.',
      handle: '@OPULENCE_NATURE',
      cta: 'FOLLOW US',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop'
    },

    studyNotes: {
      surfaceInteraction: 'Subsurface scattering on pine needles and wet moss foliage; high dynamic range from deep canopy shadows to bright dawn sunbeams.',
      specularBehavior: 'Micro-droplets on wet sea rocks create thousands of twinkling pin-point specular highlights in late afternoon sun.',
      ambientOcclusion: 'Volumetric mist softens harsh cast shadows, creating deep atmospheric perspective.'
    }
  },
  {
    id: 'still-life',
    indexNumber: '02',
    navLabel: 'Still Life',
    themeCategory: 'Ceramics & Glassware',
    brandEyebrow: 'MEDITATIVE STUDIO STILL LIFE',
    heroTitle: 'FORM & RADIANCE',
    heroSubtitle: 'Sculptural geometries born of clay, water, and kiln fire. Mouth-blown glassware and hand-thrown stoneware suspended in timeless architectural stillness.',
    ctaPrimary: 'EXPLORE CERAMICS',
    ctaSecondary: 'STUDY REFRACTIONS',
    videoUrl: 'https://assets.mixkit.co/videos/41662/41662-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=2070&auto=format&fit=crop',
    secondaryVideoUrl: 'https://assets.mixkit.co/videos/41926/41926-720.mp4',
    secondaryPosterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=2070&auto=format&fit=crop',
    accentColor: '#E6DDD4',
    accentBg: 'rgba(38, 34, 31, 0.85)',
    soundscapeType: 'ceramic-bells',
    
    secondaryHero: {
      eyebrow: 'VESSELS OF LIGHT',
      title: 'MOLTEN ALABASTER',
      description: 'Sculptural clarity caught in afternoon sunbeams and shadow transitions',
      cta: 'DISCOVER GLASSWARE'
    },
    
    featuredArtifact: {
      eyebrow: 'STUDIO KILN 07',
      title: 'UNGLAZED STONEWARE VESSEL',
      description: 'Thrown on a slow-turning manual wheel from grogged stoneware clay. Each tactile ridge captures the thumb pressure of the master artisan, finished in a 72-hour wood-ash reduction firing.',
      cta: 'VIEW CRAFT PROCESS',
      imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop',
      specs: [
        { label: 'Clay Body', value: 'High-fire rough stoneware' },
        { label: 'Firing Cycle', value: 'Cone 10 Wood Kiln (1,300°C)' },
        { label: 'Surface Finish', value: 'Natural wood-ash celadon' }
      ]
    },
    
    elementsTitle: 'FORMS OF SILENCE',
    elementsSubtitle: 'Individual tactile vessels sculpted for light capture and contemplation',
    specimens: [
      {
        id: 'terracotta-urn',
        title: 'TERRACOTTA CHALICE',
        subtitle: 'Porous Iron Oxide Clay',
        price: 'From $165',
        material: 'Wild Etruscan terracotta, raw burnished lip, unglazed belly',
        lightingNotes: 'Soft directional window illumination highlights the matte porous clay granules without glare.',
        imageUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=800&auto=format&fit=crop',
        badge: 'Wheel Thrown',
        dimensions: 'H 32cm × Ø 18cm'
      },
      {
        id: 'fluted-carafe',
        title: 'PRISMATIC CARAFE',
        subtitle: 'Mouth-Blown Borosilicate',
        price: 'From $220',
        material: 'Ultra-clear borosilicate glass, optical fluting, hand-sheared rim',
        lightingNotes: 'Caustic light refractions cast rippling luminous lace patterns across light-oak table surfaces.',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
        badge: 'Artisan Glass',
        dimensions: 'H 26cm × Ø 11cm'
      },
      {
        id: 'smoked-porcelain',
        title: 'SMOKED RAKU BOWL',
        subtitle: 'Thermal Shock Craquele',
        price: 'From $195',
        material: 'Kaolin porcelain slip, sawdust smoking chamber, copper reduction',
        lightingNotes: 'Iridescent metallic flash over microscopic crazing lines that trap charcoal carbon.',
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop',
        badge: 'One of a Kind',
        dimensions: 'H 14cm × Ø 22cm'
      }
    ],
    
    philosophy: {
      title: 'TRUE TO CLAY',
      description: 'Every vessel begins as formless mud, patiently centered and elevated until light discovers its curvature. We honor the unpredictable alchemy of kiln flame, minerals, and human breath.',
      cta: 'READ MANIFESTO'
    },
    
    splitStory: {
      title: 'ATELIER SANCTUARY',
      description: 'Step inside our sunlit ceramic sanctuary where time slows down.',
      handle: '@OPULENCE_CERAMICS',
      cta: 'EXPLORE THE STUDIO',
      imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1200&auto=format&fit=crop'
    },

    studyNotes: {
      surfaceInteraction: 'Rough grogged clay absorbs 90% of incident light, yielding velvety falloff. Glass reflects and transmits light simultaneously via Fresnel physics.',
      specularBehavior: 'Glassware creates intense focal caustic spots where curved walls converge ambient rays.',
      ambientOcclusion: 'Deep soft drop shadows under foot-rings ground the vessels firmly onto stone pedestals.'
    }
  },
  {
    id: 'materials',
    indexNumber: '03',
    navLabel: 'Materials',
    themeCategory: 'Leather & Fabric Textures',
    brandEyebrow: 'HERITAGE TACTILE ARCHIVE',
    heroTitle: 'GRAIN & PATINA',
    heroSubtitle: 'Vegetable-tanned saddle hides and raw mulberry silk woven on slow shuttle looms. Micro-textures that develop richness through touch, friction, and the passage of time.',
    ctaPrimary: 'EXPLORE MATERIALS',
    ctaSecondary: 'MACRO WEAVE INSPECTOR',
    videoUrl: 'https://assets.mixkit.co/videos/48590/48590-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop',
    secondaryVideoUrl: 'https://assets.mixkit.co/videos/42837/42837-720.mp4',
    secondaryPosterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2074&auto=format&fit=crop',
    accentColor: '#DFCFBE',
    accentBg: 'rgba(38, 30, 24, 0.85)',
    soundscapeType: 'loom-resonance',
    
    secondaryHero: {
      eyebrow: 'FIBRE & LOOM',
      title: 'WOVEN HORIZON',
      description: 'Interlaced warps and wefts floating in weightless harmonic waves',
      cta: 'VIEW TEXTILES'
    },
    
    featuredArtifact: {
      eyebrow: 'HERITAGE TANNERY',
      title: 'BRIDLE LEATHER ARCHIVE',
      description: 'Slowly cured in Tuscan chestnut and mimosa liquor pits for sixty days. Finished with hot-stuffed beef tallow and organic beeswax, creating an iconic pull-up patina that remembers every fold.',
      cta: 'EXAMINE GRAIN',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      specs: [
        { label: 'Origin', value: 'Full-Grain French Bull' },
        { label: 'Tannage', value: 'Traditional Pit Oak-Bark' },
        { label: 'Stitch Gauge', value: '7 SPI French Waxed Linen' }
      ]
    },
    
    elementsTitle: 'TACTILE ARCHIVE',
    elementsSubtitle: 'Hand-graded hides and heirloom woven botanicals',
    specimens: [
      {
        id: 'saddle-folio',
        title: 'SADDLE COGNAC FOLIO',
        subtitle: 'Vegetable-Tanned Cowhide',
        price: 'From $290',
        material: 'Uncorrected aniline grain, hand-burnished tragacanth edge',
        lightingNotes: 'Low-angle raking light reveals epidermal micro-pores and gentle natural growth marks.',
        imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
        badge: 'Hand Stitched',
        dimensions: '34cm × 25cm × 3cm'
      },
      {
        id: 'raw-mulberry-silk',
        title: 'RAW MULBERRY SILK',
        subtitle: 'Hand-Spun Wild Slub',
        price: 'From $240',
        material: '100% Peace silk warp, uneven wild tussar weft, herbal dye',
        lightingNotes: 'Sheen shifts dramatically with viewing angle due to triangular prism cross-section of silk protein fibers.',
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
        badge: 'Organic Wild',
        dimensions: '200cm × 140cm'
      },
      {
        id: 'belgian-linen',
        title: 'BELGIAN HEAVY LINEN',
        subtitle: 'Stone-Washed Flax Canvas',
        price: 'From $160',
        material: 'Flemish long-staple flax fiber, enzyme washed, 450 gsm',
        lightingNotes: 'Subtle cross-hatch shadow matrix formed by thick structural slub fibers.',
        imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
        badge: 'Masters of Linen',
        dimensions: '180cm × 130cm'
      }
    ],
    
    philosophy: {
      title: 'TRUE TO MATERIAL',
      description: 'We reject synthetic coatings in favor of raw material honesty. Natural fibers and hides do not deteriorate with honest use; they soften, deepen in color, and gain an irreplaceable dignity.',
      cta: 'OUR TACTILE CODE'
    },
    
    splitStory: {
      title: 'THE CRAFTSMAN’S TABLE',
      description: 'Tracing ancestral leatherworking traditions from Florence to Kyoto.',
      handle: '@OPULENCE_MATERIALS',
      cta: 'ENTER THE ARCHIVE',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'
    },

    studyNotes: {
      surfaceInteraction: 'Leather absorbs oils over decades, creating anisotropic amber gloss. Woven textiles produce complex micro self-shadowing between warp and weft.',
      specularBehavior: 'Silk micro-fibers act as microscopic cylindrical lenses that generate flowing satin streaks of bright specular highlights.',
      ambientOcclusion: 'Inter-thread crevices trap shadows, giving deep three-dimensional texture to even flat weaves.'
    }
  },
  {
    id: 'metal-parts',
    indexNumber: '04',
    navLabel: 'Metal Parts',
    themeCategory: 'Mechanical Gears & Horology',
    brandEyebrow: 'CHRONOMETRIC ARCHITECTURE',
    heroTitle: 'KINETIC PRECISION',
    heroSubtitle: 'Micron-calibrated horology gears, brushed titanium escapements, and cold-milled steel. Meshing involute teeth transferring kinetic energy in hypnotic equilibrium.',
    ctaPrimary: 'ENGINEERING SPECS',
    ctaSecondary: 'INSPECT GEAR TRAIN',
    videoUrl: 'https://assets.mixkit.co/videos/41872/41872-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=2070&auto=format&fit=crop',
    secondaryVideoUrl: 'https://assets.mixkit.co/videos/31109/31109-720.mp4',
    secondaryPosterUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070&auto=format&fit=crop',
    accentColor: '#DCE4E8',
    accentBg: 'rgba(23, 27, 31, 0.85)',
    soundscapeType: 'chronometer-ticks',
    
    secondaryHero: {
      eyebrow: 'MICRON TOLERANCE',
      title: 'THE ESCAPEMENT',
      description: 'Harmonic balance oscillation beating at 28,800 vibrations per hour',
      cta: 'EXPLORE CALIBER'
    },
    
    featuredArtifact: {
      eyebrow: 'PRECISION HOROLOGY',
      title: 'CALIBER 9000 GEAR TRAIN',
      description: 'Machined from solid Grade 5 Titanium and Glucydur bronze with an uncompromising tolerance of ±0.002mm. Every tooth is hand-chamfered and black-polished to eradicate micro-frictional drag.',
      cta: 'VIEW BLUEPRINT',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      specs: [
        { label: 'Metrology', value: 'Tolerance ±0.002 mm' },
        { label: 'Finishing', value: 'Hand Anglage & Black Polish' },
        { label: 'Frequency', value: '4 Hz / 28,800 VPH' }
      ]
    },
    
    elementsTitle: 'KINETIC SPECIMENS',
    elementsSubtitle: 'High-rigidity components milled for chronometric balance and aerospace tolerances',
    specimens: [
      {
        id: 'escapement-wheel',
        title: 'TITANIUM ESCAPEMENT WHEEL',
        subtitle: 'Involute Tooth Profile',
        price: 'From $420',
        material: 'Ti-6Al-4V titanium alloy, synthetic ruby impulse jewels',
        lightingNotes: 'Radial brushed circular grain reflects light in rotating cross-bow arcs (anisotropic reflections).',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
        badge: '±0.001mm',
        dimensions: 'Ø 7.2mm × T 0.18mm'
      },
      {
        id: 'sunburst-rotor',
        title: 'TUNGSTEN OSCILLATING WEIGHT',
        subtitle: 'High-Density Winding Rotor',
        price: 'From $380',
        material: 'Pure 19.3g/cm³ tungsten carbide, ceramic ball bearings, 24K gold inlay',
        lightingNotes: 'Deep chamfered 45° polished mirror bevels bounce high-contrast white light against dark graphite grooves.',
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=800&auto=format&fit=crop',
        badge: 'High Inertia',
        dimensions: 'Ø 28.5mm × T 1.4mm'
      },
      {
        id: 'planetary-pinion',
        title: 'CENTRAL CHRONO PINION',
        subtitle: 'Tempered Carbon Steel',
        price: 'From $290',
        material: 'Sandvik 20AP steel, burnished cone pivots, olive jewel setting',
        lightingNotes: 'Hardened steel mirror polish produces true black reflection (Spiegelpolitur) under diffuse lighting.',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
        badge: 'Black Polished',
        dimensions: 'L 5.4mm × Ø 1.2mm'
      }
    ],
    
    philosophy: {
      title: 'TRUE TO PRECISION',
      description: 'In an era of disposable digital circuits, pure mechanical kinetic art remains forever sovereign. Every gear interlock represents a timeless pact between human mathematics and eternal physical laws.',
      cta: 'CHRONO MANIFESTO'
    },
    
    splitStory: {
      title: 'THE PRECISION LAB',
      description: 'Where micron tolerances become perpetual kinetic poetry.',
      handle: '@OPULENCE_PRECISION',
      cta: 'ENTER THE METROLOGY LAB',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'
    },

    studyNotes: {
      surfaceInteraction: 'Zero diffuse scattering; light is entirely governed by specular reflection, fresnel reflection coefficients, and anisotropic micro-groove scattering.',
      specularBehavior: 'Circular brushing produces stunning starburst anisotropic highlights rotating with observer angle.',
      ambientOcclusion: 'Between gear teeth, deep black valleys contrast sharply against razor-sharp mirror chamfers.'
    }
  }
];
