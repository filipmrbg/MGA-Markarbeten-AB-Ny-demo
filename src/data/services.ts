export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceSection {
  heading: string;
  text?: string;
  bullets?: string[];
  image?: string;
  subsections?: { subheading: string; text: string }[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  heroText: string;
  detailedDescription: string;
  heroImage: string;
  image: string;
  href: string;
  tag?: string;
  badge?: string;
  highlights?: string[];
  sections: ServiceSection[];
  faq: FAQItem[];
}

export const services: ServiceItem[] = [
  {
    slug: 'anlaggning',
    title: 'Anläggning',
    shortDescription: 'Vi erbjuder kompletta anläggningslösningar för din fastighet. Från murar och plattytor till gräsmattor och planteringar.',
    heroText: 'Förverkliga dina drömmar för utemiljön med professionell stensättning, stödmurar och komplett tomtplanering i Habo och Jönköping.',
    detailedDescription: `Förverkliga dina drömmar med en ny stensättning. En stödmur för att jämna av nivåerna i din trädgård, marksten på din garageuppfart, eller kanske planteringslådor i mursten att fylla med sommarens alla blomster. Idéerna kommer från dig, vi ser till att de förverkligas!`,
    heroImage: 'https://i.imgur.com/H0iDPl1.png',
    image: 'https://i.imgur.com/H0iDPl1.png',
    href: '/tjanster#anlaggning',
    tag: 'Utemiljö',
    badge: 'Populärt',
    highlights: ['Stensättning & murar', 'Tomtplanering', 'Planteringslådor'],
    sections: [
      {
        heading: 'Stensättning & marksten',
        text: 'Vi lägger marksten för uppfarter, patior och trädgårdsytor med noggrann attention till detaljer. Från underarbete till färdig yta.',
        bullets: [
          'Garageuppfarter – hållbar och slitagetålig yta',
          'Patio & uteplatser – skräddarsydd design',
          'Trädgårdsgångar – eleganta stigar i natursten',
        ],
        image: '/service-markarbete.webp',
      },
      {
        heading: 'Stödmurar & nivåutjämning',
        text: 'Vi bygger stödmurar för att jämna ut nivåer i din trädgård, skapa terrasser och ge struktur åt utemiljön.',
        bullets: [
          'Terrassering – skapa plana ytor i sluttande tomter',
          'Planteringslådor – mursten i flera nivåer',
          'Trappor – anslutande stentrappor',
        ],
        image: '/service-stodmur.png',
      },
      {
        heading: 'Komplett tomtplanering',
        text: 'Från idé till färdig tomt hjälper vi dig att planera och genomföra hela utemiljön.',
        bullets: [
          'Gräsmattor – sådd och färdiggräs',
          'Planteringar – buskar, träd och perenner',
          'Belysning – utomhusbelysning och markstråk',
        ],
        subsections: [
          { subheading: 'Gräsmattor', text: 'Vi etablerar gräsmattor med sådd eller färdiggräs för en grön och jämn yta.' },
          { subheading: 'Plantering', text: 'Rätt växt på rätt plats – vi hjälper dig välja och plantera buskar, träd och perenner.' },
        ],
      },
    ],
    faq: [
      {
        question: 'Hur lång tid tar en stensättning?',
        answer: 'Det beror på ytan storlek men de flesta projekt är klara inom 1–2 veckor efter underarbetet.',
      },
      {
        question: 'Vilken typ av sten kan jag välja?',
        answer: 'Vi arbetar med natursten, betongsten och marksten i flera mönster och färger. Vi hjälper dig välja rätt material.',
      },
      {
        question: 'Ger ni garanti på arbetet?',
        answer: 'Ja, vi lämnar skriftlig garanti på allt utfört arbete enligt gällande branschstandard.',
      },
    ],
  },
  {
    slug: 'bygg',
    title: 'Bygg',
    shortDescription: 'Kanske skulle man ta tag i det där uterummet? Eller varför inte bygga ett nytt trädäck med tillhörande utekök?',
    heroText: 'Kommande somrars favoritplats. Vi bygger måttanpassade trädäck, uterum, utekök, staket och altaner för ditt hem i Habo och Jönköping.',
    detailedDescription: `Vi erbjuder kompletta bygglösningar för din utomhusmiljö. Från idé till färdigt resultat står vi vid din sida och säkerställer att ditt byggprojekt blir precis som du tänkt dig. Vår erfarenhet omfattar allt från enkla projekt som trädäck till mer komplexa konstruktioner som uterum och utekök.`,
    heroImage: 'https://i.imgur.com/Bwm2Klw.png',
    image: 'https://i.imgur.com/Bwm2Klw.png',
    href: '/tjanster#bygg',
    tag: 'Utomhusbygg',
    highlights: ['Trädäck & altaner', 'Uterum & utekök', 'Staket & räcken'],
    sections: [
      {
        heading: 'Trädäck & altaner',
        text: 'Vi bygger måttanpassade trädäck och altaner som passar din husstil och dina behov.',
        bullets: [
          'Tryckimpregnerat trä – hållbart och klassiskt',
          'Komposit – underhållsfritt och modernt',
          'Trall runt pool – skräddarsydd lösning',
        ],
        image: '/gallery-deck.webp',
      },
      {
        heading: 'Uterum & utekök',
        text: 'Skapa kommande somrars favoritplats med ett skräddarsytt uterum eller utekök.',
        bullets: [
          'Uterum i glas – ljus och luftig plats',
          'Utekök – grill, förvaring och bänkskiva',
          'Pergola & markis – skugga och tak',
        ],
        image: '/service-renovering-kitchen.webp',
      },
      {
        heading: 'Staket & räcken',
        text: 'Vi bygger staket och räcken som ger både insynsskydd och en snygg inramning av din tomt.',
        bullets: [
          'Insynsskydd – trä, komposit eller metall',
          'Räcken – trappor och altaner',
          'Grindar – måttanpassade lösningar',
        ],
      },
    ],
    faq: [
      {
        question: 'Vilket material rekommenderar ni för trädäck?',
        answer: 'Vi rekommenderar tryckimpregnerat trä för klassisk känsla eller komposit för underhållsfri yta. Valet beror på din budget och stil.',
      },
      {
        question: 'Kan ni bygga utekök med vatten och avlopp?',
        answer: 'Ja, vi kan anlägga utekök med vatten- och avloppsanslutning för en fullt funktionell utomhusmiljö.',
      },
      {
        question: 'Behöver jag bygglov för uterum?',
        answer: 'I många fall krävs bygglov för uterum. Vi hjälper dig att förstå vad som gäller för din fastighet.',
      },
    ],
  },
  {
    slug: 'dranering-va',
    title: 'Dränering & V/A',
    shortDescription: 'En källarvägg utsätts för fuktangrepp året runt. Vi förebygger eller tar bort fukt med moderna dräneringssystem.',
    heroText: 'Skydda ditt hus mot fukt och skador. Komplett husdränering, isolering och V/A-installationer utförda med högsta precision.',
    detailedDescription: `En källarvägg utsätts för fuktangrepp året om på många olika sätt t.ex förhöjda grundvattennivåer, regn eller smältvatten. Detta är angrepp som kan orsaka både fuktskador och dålig lukt, i värsta fall hälsoproblem. En fuktig källarvägg har dessutom en försämrad värmeisolerande effekt. Förebygg eller ta bort fukt i väggarna med en säker fuktspärr. Vill du ha en kontroll av din källarvägg är du välkommen att höra av dig för en fuktmätning. Vi hjälper dig till en trivsam källarmiljö.`,
    heroImage: 'https://i.imgur.com/cjzgGp3.png',
    image: 'https://i.imgur.com/cjzgGp3.png',
    href: '/tjanster#dranering-va',
    tag: 'Fuktskydd',
    badge: 'ROT-avdrag',
    highlights: ['Husdränering', 'Fuktspärr & isolering', 'V/A-installation'],
    sections: [
      {
        heading: 'Komplett husdränering',
        text: 'Vi gräver upp runt grunden och installerar ett komplett dräneringssystem med fuktspärr och isolering.',
        bullets: [
          'Schaktning runt grunden – noggrann uppgrävning',
          'Dräneringsmatta – leder bort vatten från källarvägg',
          'Fuktspärr – hindrar fukt att tränga in',
        ],
        image: '/service-dranering.webp',
      },
      {
        heading: 'Isolering & fuktspärr',
        text: 'Vi installerar isolering och fuktspärr som skyddar din källarvägg mot fukt och kyla.',
        bullets: [
          'Isodrän-skiva – isolering och dränering i ett',
          'Fuktspärr i polymerbitumen – säker tätning',
          'Efterisolering – förbättrar energiprestanda',
        ],
      },
      {
        heading: 'Vatten & Avlopp (V/A)',
        text: 'Vi installerar och ansluter vatten- och avloppsledningar för både nybygge och renovering.',
        bullets: [
          'VA-anslutning – ny anslutning till kommunalt nät',
          'Infiltrationsanläggning – för avlopp utanför nät',
          'Brunn & pump – installation och service',
        ],
        subsections: [
          { subheading: 'Kommunalt VA', text: 'Vi ansluter din fastighet till det kommunala vatten- och avloppsnätet.' },
          { subheading: 'Infiltration', text: 'För fastigheter utan kommunalt nät bygger vi infiltrationsanläggningar.' },
        ],
      },
    ],
    faq: [
      {
        question: 'Hur vet jag om min källare behöver dränering?',
        answer: 'Tecken på fuktproblem är fuktfläckar, mögellukt eller dålig innemiljö. Vi erbjuder fuktmätning för att bedöma behovet.',
      },
      {
        question: 'Ger dräneringsarbete rätt till ROT-avdrag?',
        answer: 'Ja, dränering i anslutning till befintlig bostad berättigar till ROT-avdrag. Vi drar av direkt på fakturan.',
      },
      {
        question: 'Hur lång tid tar en husdränering?',
        answer: 'En komplett husdränering tar normalt 1–2 veckor beroende på husets storlek och markförhållanden.',
      },
    ],
  },
  {
    slug: 'skog',
    title: 'Skog',
    shortDescription: 'Vi har kompetensen för röjning, gallring och tomtvård. Med över 40 års erfarenhet i skog och mark.',
    heroText: 'Professionella skogstjänster, gallring och tomtvård i Habo och Jönköping med över 40 års samlad skogserfarenhet.',
    detailedDescription: `Vi pysslar inte bara med mark och bygg, vi har även kompetensen för skog, röjning och skotning. Med över 40 års erfarenhet i skog och mark tillhandahåller vi stor expertis av såväl gallring, röjning som allmän skogsvård. Vi hjälper er att öppna upp ytor och ta hand om skog och mark på bästa sätt.`,
    heroImage: 'https://i.imgur.com/eUStLab.png',
    image: 'https://i.imgur.com/eUStLab.png',
    href: '/tjanster#skog',
    tag: 'Skog',
    highlights: ['Gallring & röjning', 'Skotning', 'Skogsvård'],
    sections: [
      {
        heading: 'Trädfällning',
        text: 'Vi fäller träd på ett säkert och kontrollerat sätt, oavsett storlek eller placering.',
        bullets: [
          'Fällning nära byggnader – säker teknik',
          'Kronbeskärning – ta bort döda grenar',
          'Nödträd – snabb hantering av farliga träd',
        ],
      },
      {
        heading: 'Gallring & röjning',
        text: 'Vi gallrar och röjer din skog eller tomt för bättre ljusinsläpp och trivsel.',
        bullets: [
          'Tomtgallring – mer ljus och luft',
          'Skogsröjning – framkomlighet och skötsel',
          'Skotning – transport av virke',
        ],
      },
      {
        heading: 'Stubbfräsning',
        text: 'Vi fräser bort stubbar så att ytan blir plan och redo för ny användning.',
        bullets: [
          'Stubbfräsning – tar bort stubben under marknivå',
          'Rotröjning – tar bort rötter',
          'Ytanläggning – planteringsyta efter fräsning',
        ],
      },
    ],
    faq: [
      {
        question: 'Tar ni hand om virket efter fällning?',
        answer: 'Ja, vi kan skota virket och antingen transportera bort det eller lägga upp det för ved på din fastighet.',
      },
      {
        question: 'Behöver jag tillstånd för att fälla träd?',
        answer: 'För träd inom detaljplan eller skyddade träd krävs ibland tillstånd. Vi hjälper dig att kontrollera vad som gäller.',
      },
      {
        question: 'Hur djupt fräser ni ner stubben?',
        answer: 'Vi fräser normalt 20–30 cm under marknivå så att ytan kan planteras eller bebyggas.',
      },
    ],
  },
];

export default services;
