/**
 * CENTRALIZED IMAGE CONFIGURATION
 *
 * All images used across the template are defined here.
 * To customize for a new company: replace the URLs below.
 *
 * Recommended dimensions per slot:
 *   hero.background       — 1400×800+ (wide, dark works best with overlay text)
 *   services.*            — 900×600 (landscape, subject-focused)
 *   gallery[]             — 800×800 (square crop)
 *   cta.banner            — 600×420 (portrait/square, shown in right column)
 *   cta.midSection        — 1400×600 (wide, used as background with dark overlay)
 *   about.hero            — 600×750 (portrait, team or company)
 *   about.teamMember      — 300×300 (square, headshot)
 *   whyChooseUs           — 600×auto (portrait or landscape, detail shot)
 *   ideaToResult          — 600×auto (landscape, process/progress shot)
 *   portfolio[]           — 800×600 (landscape, finished project photos)
 *   servicePages.*        — see individual slots below
 */

export interface ImageSlot {
  url: string;
  alt: string;
}

export interface SiteImages {
  logo: ImageSlot;
  hero: {
    background: ImageSlot;
  };
  services: {
    markarbete: ImageSlot;
    dranering: ImageSlot;
    betong: ImageSlot;
  };
  gallery: ImageSlot[];
  cta: {
    banner: ImageSlot;
    midSection: ImageSlot;
  };
  about: {
    hero: ImageSlot;
    teamMember: ImageSlot;
  };
  whyChooseUs: ImageSlot;
  ideaToResult: ImageSlot;
  portfolio: {
    image: ImageSlot;
    title: string;
    category: string;
  }[];
  servicePages: {
    markarbete: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
    dranering: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
    betong: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
  };
}

const images: SiteImages = {
  logo: {
    url: '/logo.png',
    alt: 'MGA Markarbeten AB',
  },

  hero: {
    background: {
      url: '/hero-main.webp',
      alt: 'Entreprenad och markarbete pågår',
    },
  },

  services: {
    markarbete: {
      url: '/service-markarbete.webp',
      alt: 'Grävmaskin som utför markarbete på tomt',
    },
    dranering: {
      url: '/service-dranering.webp',
      alt: 'Husgrund med nylagd dränering och isolering',
    },
    betong: {
      url: '/service-betong.webp',
      alt: 'Nygjuten betongplatta till husgrund med formar',
    },
  },

  gallery: [
    { url: '/gallery-external-1.webp', alt: 'MGA Markarbeten AB arbete pågår 1' },
    { url: '/gallery-external-2.webp', alt: 'MGA Markarbeten AB arbete pågår 2' },
    { url: '/gallery-external-4.webp', alt: 'MGA Markarbeten AB arbete pågår 4' },
    { url: '/gallery-external-3.webp', alt: 'MGA Markarbeten AB arbete pågår 5' },
  ],

  cta: {
    banner: {
      url: '/hero-main.webp',
      alt: 'MGA Markarbeten projekt',
    },
    midSection: {
      url: '/hero-main.webp',
      alt: 'Byggarbetsplats',
    },
  },

  about: {
    hero: {
      url: '/logo.png',
      alt: 'MGA Markarbeten AB logotyp',
    },
    teamMember: {
      url: '/logo.png',
      alt: 'Teammedlem',
    },
  },

  whyChooseUs: {
    url: '/why-choose-us.webp',
    alt: 'Noggrant hantverk i detalj',
  },

  ideaToResult: {
    url: '/idea-to-result.webp',
    alt: 'Från idé till färdigt resultat',
  },

  portfolio: [
    {
      image: { url: '/gallery-external-1.webp', alt: 'MGA Markarbeten AB projekt 1' },
      title: 'Projekt 1',
      category: '',
    },
    {
      image: { url: '/gallery-external-2.webp', alt: 'MGA Markarbeten AB projekt 2' },
      title: 'Projekt 2',
      category: '',
    },
    {
      image: { url: '/gallery-external-4.webp', alt: 'MGA Markarbeten AB projekt 4' },
      title: 'Projekt 4',
      category: '',
    },
    {
      image: { url: '/gallery-external-3.webp', alt: 'MGA Markarbeten AB projekt 5' },
      title: 'Projekt 5',
      category: '',
    },
  ],

  servicePages: {
    markarbete: {
      hero: {
        url: '/service-markarbete.webp',
        alt: 'Markarbete och schaktning',
      },
      section1: {
        url: '/service-markarbete.webp',
        alt: 'Förberedelse för tomtplanering',
      },
      section2: {
        url: '/hero-main.webp',
        alt: 'Grävmaskin på arbetsplats',
      },
    },
    dranering: {
      hero: {
        url: '/service-dranering.webp',
        alt: 'Dränering av husgrund',
      },
      section1: {
        url: '/service-dranering.webp',
        alt: 'Montering av Isodrän fuktskydd',
      },
      section2: {
        url: '/hero-main.webp',
        alt: 'Arbete med dräneringsslangar',
      },
    },
    betong: {
      hero: {
        url: '/service-betong.webp',
        alt: 'Gjutning av betongplatta',
      },
      section1: {
        url: '/service-betong.webp',
        alt: 'Stenläggning och armering',
      },
      section2: {
        url: '/hero-main.webp',
        alt: 'Färdig betonggrund',
      },
    },
  },
};

export default images;
