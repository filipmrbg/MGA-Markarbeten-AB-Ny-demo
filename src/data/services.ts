export interface FAQItem {
  question: string;
  answer: string;
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
  },
  {
    slug: 'skog',
    title: 'Skog',
    shortDescription: 'Vi har kompetensen för trädfällning, röjning och stubbfräsning. Med över 40 års erfarenhet i skog och mark.',
    heroText: 'Säker trädfällning, tomtgallring och stubbfräsning i Habo och Jönköping med över 40 års samlad skogserfarenhet.',
    detailedDescription: `Vi pysslar inte bara med mark och bygg, vi har även kompetensen för trädfällning, röjning och skotning. Med över 40 års erfarenhet i skog och mark tillhandahåller vi stor expertis av såväl trädfällning, gallring och röjning. Vi hjälper er att fälla trädet som har blivit alldeles för stort på baksidan och tar bort kvällssolen, så ni kan njuta av sommarkvällen igen.`,
    heroImage: 'https://i.imgur.com/eUStLab.png',
    image: 'https://i.imgur.com/eUStLab.png',
    href: '/tjanster#skog',
  },
];

export default services;
