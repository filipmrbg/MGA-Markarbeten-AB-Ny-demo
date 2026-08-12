export interface ServiceItem {
  slug: string;
  title: string;
  image: string;
  href: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'markarbete',
    title: 'Markarbete',
    image: '/service-markarbete.webp',
    href: '/offert',
  },
  {
    slug: 'betong',
    title: 'Grundläggning',
    image: '/service-betong.webp',
    href: '/offert',
  },
  {
    slug: 'dranering',
    title: 'Dränering',
    image: '/service-dranering.webp',
    href: '/offert',
  },
  {
    slug: 'poolbygge',
    title: 'Poolbygge',
    image: '/service-poolbygge.png',
    href: '/offert',
  },
  {
    slug: 'murararbete',
    title: 'Stödmurar',
    image: '/service-stodmur.png',
    href: '/offert',
  },
  {
    slug: 'plattsattning',
    title: 'Plattsättning',
    image: '/service-plattsattning.png',
    href: '/offert',
  },
  {
    slug: 'takbyte',
    title: 'Takbyte & Takrenovering',
    image: '/portfolio-roofing.webp',
    href: '/offert',
  },
];

export default services;
